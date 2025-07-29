import { NextRequest, NextResponse } from 'next/server';
import { switchDatabase } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const gender = searchParams.get('gender');
    const ageGroup = searchParams.get('ageGroup');
    const relationship = searchParams.get('relationship');
    
    // Filter out "all" values
    const actualGender = gender && gender !== 'all' ? gender : null;
    const actualAgeGroup = ageGroup && ageGroup !== 'all' ? ageGroup : null;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = (page - 1) * limit;

    const connection = await switchDatabase('ug_hh_rstr');
    
    // Get all tables to find roster data
    const [tables] = await connection.execute("SHOW TABLES") as any;
    console.log('Available tables in ug_hh_rstr:', tables);
    
    // Find the main roster table
    let rosterTableName = null;
    for (const table of tables) {
      const tableKey = Object.keys(table)[0];
      const tableName = table[tableKey];
      if (tableName && tableName.includes('survey')) {
        rosterTableName = tableName;
        break;
      }
    }
    
    if (!rosterTableName) {
      await connection.end();
      return NextResponse.json({
        data: [],
        pagination: {
          total: 0,
          page,
          limit,
          totalPages: 0
        },
        analytics: {
          totalRecords: 0,
          byGender: [],
          byAgeGroup: [],
          byRelationship: []
        }
      });
    }
    
    // Get total count
    const [countResult] = await connection.execute(`SELECT COUNT(*) as total FROM \`${rosterTableName}\``) as any;
    const totalRecords = countResult[0]?.total || 0;
    
    // Get sample data for analytics with proper column mapping
    const [sampleData] = await connection.execute(`
      SELECT 
        sex as gender,
        age as age,
        relattohh as relationship
      FROM \`${rosterTableName}\` 
      LIMIT 100
    `) as any;
    
    // Calculate analytics from actual data
    const genderCounts = sampleData.reduce((acc: any, record: any) => {
      const gender = record.gender || 'Unknown';
      acc[gender] = (acc[gender] || 0) + 1;
      return acc;
    }, {});
    
    const byGender = Object.entries(genderCounts).map(([name, count]) => ({
      name,
      count: count as number
    }));
    
    // Calculate age groups
    const ageGroups = sampleData.reduce((acc: any, record: any) => {
      const age = parseInt(record.age) || 0;
      let ageGroup = 'Unknown';
      if (age >= 0 && age <= 4) ageGroup = '0-4';
      else if (age >= 5 && age <= 14) ageGroup = '5-14';
      else if (age >= 15 && age <= 24) ageGroup = '15-24';
      else if (age >= 25 && age <= 34) ageGroup = '25-34';
      else if (age >= 35 && age <= 44) ageGroup = '35-44';
      else if (age >= 45) ageGroup = '45+';
      
      acc[ageGroup] = (acc[ageGroup] || 0) + 1;
      return acc;
    }, {});
    
    const byAgeGroup = Object.entries(ageGroups).map(([ageGroup, count]) => ({
      ageGroup,
      count: count as number
    }));
    
    // Calculate relationships
    const relationshipCounts = sampleData.reduce((acc: any, record: any) => {
      const relationship = record.relationship || 'Unknown';
      acc[relationship] = (acc[relationship] || 0) + 1;
      return acc;
    }, {});
    
    const byRelationship = Object.entries(relationshipCounts).map(([relationship, count]) => ({
      relationship,
      count: count as number
    }));
    
    // Get paginated data with proper column mapping
    const [rows] = await connection.execute(`
      SELECT 
        \`surveyhhrstr-id\` as id,
        hhrname as name,
        sex as gender,
        age as age,
        relattohh as relationship,
        education as education,
        occupation as occupation,
        maritalstatus as marital_status
      FROM \`${rosterTableName}\` 
      LIMIT ? OFFSET ?
    `, [limit, offset]) as any;
    
    console.log('Household roster data sample:', rows.slice(0, 3));
    console.log('Analytics - byGender:', byGender);
    console.log('Analytics - byAgeGroup:', byAgeGroup);
    console.log('Analytics - byRelationship:', byRelationship);
    
    await connection.end();

    return NextResponse.json({
      data: rows,
      pagination: {
        total: totalRecords,
        page,
        limit,
        totalPages: Math.ceil(totalRecords / limit)
      },
      analytics: {
        totalRecords,
        byGender,
        byAgeGroup,
        byRelationship
      }
    });
  } catch (error) {
    console.error('Household roster API error:', error);
    return NextResponse.json({ error: 'Failed to fetch household roster data' }, { status: 500 });
  }
} 