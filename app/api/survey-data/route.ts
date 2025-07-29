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

    const connection = await switchDatabase('ug_surv_data_hub');
    
    // Check if tables exist
    const [tables] = await connection.execute("SHOW TABLES") as any;
    console.log('Available tables in ug_surv_data_hub:', tables);
    
    // Find the survey table
    let surveyTableName = null;
    for (const table of tables) {
      const tableKey = Object.keys(table)[0];
      if (table[tableKey] && table[tableKey].includes('survey')) {
        surveyTableName = table[tableKey];
        break;
      }
    }
    
    if (!surveyTableName) {
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
    
    // Check if level-1 table exists
    const hasLevelTable = tables.some((table: any) => {
      const tableKey = Object.keys(table)[0];
      return table[tableKey] && table[tableKey].includes('level-1');
    });
    
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
          s.*,
          l.hhi_district_code as district,
          l.hhi_subcounty_code as subcounty,
          l.hhi_parish_code as parish,
          l.hhi_village_code as village
        FROM \`${surveyTableName}\` s
        JOIN \`level-1\` l ON s.\`level-1-id\` = l.\`level-1-id\`
        WHERE 1=1 ${whereClause}
        ORDER BY s.\`${surveyTableName}-id\` DESC
        LIMIT ? OFFSET ?
      `;
      
      countQuery = `
        SELECT COUNT(*) as total
        FROM \`${surveyTableName}\` s
        JOIN \`level-1\` l ON s.\`level-1-id\` = l.\`level-1-id\`
        WHERE 1=1 ${whereClause}
      `;
    } else {
      query = `
        SELECT s.*
        FROM \`${surveyTableName}\` s
        WHERE 1=1 ${whereClause}
        ORDER BY s.\`${surveyTableName}-id\` DESC
        LIMIT ? OFFSET ?
      `;
      
      countQuery = `
        SELECT COUNT(*) as total
        FROM \`${surveyTableName}\` s
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
    console.error('Survey data API error:', error);
    return NextResponse.json({ error: 'Failed to fetch survey data' }, { status: 500 });
  }
} 