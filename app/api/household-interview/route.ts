import { NextRequest, NextResponse } from 'next/server';
import { switchDatabase } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const district = searchParams.get('district');
    const subcounty = searchParams.get('subcounty');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = (page - 1) * limit;

    const connection = await switchDatabase('ug_hh_int');
    
    // Check if tables exist
    const [tables] = await connection.execute("SHOW TABLES") as any;
    console.log('Available tables in ug_hh_int:', tables);
    
    // Check if required tables exist
    const hasSurveyTable = tables.some((table: any) => {
      const tableKey = Object.keys(table)[0];
      return table[tableKey] && table[tableKey].includes('surveyhhint_hh_qnr');
    });
    
    const hasLevelTable = tables.some((table: any) => {
      const tableKey = Object.keys(table)[0];
      return table[tableKey] && table[tableKey].includes('level-1');
    });
    
    if (!hasSurveyTable) {
      await connection.end();
      return NextResponse.json({
        data: [],
        pagination: {
          total: 0,
          page,
          limit,
          totalPages: 0
        }
      });
    }
    
    let whereClause = '';
    const params: any[] = [];
    
    if (district) {
      whereClause += ' AND JSON_EXTRACT(level_1_data, "$.district") = ?';
      params.push(district);
    }
    
    if (subcounty) {
      whereClause += ' AND JSON_EXTRACT(level_1_data, "$.subcounty") = ?';
      params.push(subcounty);
    }

    let query = '';
    let countQuery = '';
    
    if (hasLevelTable) {
      query = `
        SELECT 
          h.*,
          l.hhi_district_code as district,
          l.hhi_subcounty_code as subcounty,
          l.hhi_parish_code as parish,
          l.hhi_village_code as village
        FROM surveyhhint_hh_qnr h
        JOIN \`level-1\` l ON h.\`level-1-id\` = l.\`level-1-id\`
        WHERE 1=1 ${whereClause}
        ORDER BY h.\`surveyhhint_hh_qnr-id\` DESC
        LIMIT ? OFFSET ?
      `;
      
      countQuery = `
        SELECT COUNT(*) as total
        FROM surveyhhint_hh_qnr h
        JOIN \`level-1\` l ON h.\`level-1-id\` = l.\`level-1-id\`
        WHERE 1=1 ${whereClause}
      `;
    } else {
      query = `
        SELECT h.*
        FROM surveyhhint_hh_qnr h
        WHERE 1=1 ${whereClause}
        ORDER BY h.\`surveyhhint_hh_qnr-id\` DESC
        LIMIT ? OFFSET ?
      `;
      
      countQuery = `
        SELECT COUNT(*) as total
        FROM surveyhhint_hh_qnr h
        WHERE 1=1 ${whereClause}
      `;
    }

    const [rows] = await connection.execute(query, [...params, limit, offset]) as any;
    const [countResult] = await connection.execute(countQuery, params) as any;

    await connection.end();

    return NextResponse.json({
      data: rows,
      pagination: {
        total: countResult[0]?.total || 0,
        page,
        limit,
        totalPages: Math.ceil((countResult[0]?.total || 0) / limit)
      }
    });
  } catch (error) {
    console.error('Household interview API error:', error);
    return NextResponse.json({ error: 'Failed to fetch household interview data' }, { status: 500 });
  }
} 