import { NextResponse } from 'next/server';
import { executeQuery, switchDatabase } from '@/lib/database';

export async function GET() {
  try {
    const summary = {
      householdInterview: {},
      householdRoster: {},
      individualInterview: {},
      surveyDataHub: {},
      locations: []
    };

    // Get household interview data
    try {
      const connection = await switchDatabase('ug_hh_int');
      
      // Check if table exists first
      const [tables] = await connection.execute("SHOW TABLES LIKE 'surveyhhint_hh_qnr'") as any;
      if (tables.length > 0) {
        const [hhCount] = await connection.execute('SELECT COUNT(*) as count FROM surveyhhint_hh_qnr') as any;
        
        // Check if level-1 table exists
        const [levelTables] = await connection.execute("SHOW TABLES LIKE 'level-1'") as any;
        let locationData = [];
        if (levelTables.length > 0) {
          // Get the actual column names from level-1 table
          const [columns] = await connection.execute("SHOW COLUMNS FROM \`level-1\`") as any;
          console.log('Level-1 table columns:', columns);
          
          // Try to find the correct column name for location data
          let locationColumn = null;
          for (const col of columns) {
            if (col.Field && (col.Field.includes('district') || col.Field.includes('location') || col.Field.includes('data'))) {
              locationColumn = col.Field;
              break;
            }
          }
          
          // Use the correct column names from level-1 table
          const [locationResult] = await connection.execute(`
            SELECT 
              hhi_district_code as district,
              hhi_subcounty_code as subcounty,
              COUNT(*) as count
            FROM \`level-1\`
            WHERE hhi_district_code IS NOT NULL AND hhi_district_code != ''
            GROUP BY hhi_district_code, hhi_subcounty_code
            ORDER BY count DESC
            LIMIT 10
          `) as any;
          locationData = locationResult;
        }
        
        summary.householdInterview = {
          totalRecords: hhCount[0]?.count || 0,
          locations: locationData
        };
      } else {
        summary.householdInterview = {
          totalRecords: 0,
          locations: []
        };
      }
      await connection.end();
    } catch (error) {
      console.error('Error fetching household interview data:', error);
      summary.householdInterview = {
        totalRecords: 0,
        locations: []
      };
    }

    // Get household roster data
    try {
      const connection = await switchDatabase('ug_hh_rstr');
      
      // Check if table exists first
      const [tables] = await connection.execute("SHOW TABLES LIKE 'surveyhhrstr'") as any;
      if (tables.length > 0) {
        const [rosterCount] = await connection.execute('SELECT COUNT(*) as count FROM surveyhhrstr') as any;
        summary.householdRoster = {
          totalRecords: rosterCount[0]?.count || 0
        };
      } else {
        summary.householdRoster = {
          totalRecords: 0
        };
      }
      await connection.end();
    } catch (error) {
      console.error('Error fetching household roster data:', error);
      summary.householdRoster = {
        totalRecords: 0
      };
    }

    // Get individual interview data
    try {
      const connection = await switchDatabase('ug_ind_int');
      
      // Check if table exists first
      const [tables] = await connection.execute("SHOW TABLES") as any;
      console.log('Available tables in ug_ind_int:', tables);
      
      // Try to find the correct table name
      let tableName = null;
      for (const table of tables) {
        const tableKey = Object.keys(table)[0];
        if (table[tableKey] && table[tableKey].includes('survey')) {
          tableName = table[tableKey];
          break;
        }
      }
      
      if (tableName) {
        const [indCount] = await connection.execute(`SELECT COUNT(*) as count FROM \`${tableName}\``) as any;
        summary.individualInterview = {
          totalRecords: indCount[0]?.count || 0
        };
      } else {
        summary.individualInterview = {
          totalRecords: 0
        };
      }
      await connection.end();
    } catch (error) {
      console.error('Error fetching individual interview data:', error);
      summary.individualInterview = {
        totalRecords: 0
      };
    }

    // Get survey data hub data
    try {
      const connection = await switchDatabase('ug_surv_data_hub');
      
      // Check if table exists first
      const [tables] = await connection.execute("SHOW TABLES") as any;
      console.log('Available tables in ug_surv_data_hub:', tables);
      
      // Try to find the correct table name
      let tableName = null;
      for (const table of tables) {
        const tableKey = Object.keys(table)[0];
        if (table[tableKey] && table[tableKey].includes('survey')) {
          tableName = table[tableKey];
          break;
        }
      }
      
      if (tableName) {
        const [hubCount] = await connection.execute(`SELECT COUNT(*) as count FROM \`${tableName}\``) as any;
        summary.surveyDataHub = {
          totalRecords: hubCount[0]?.count || 0
        };
      } else {
        summary.surveyDataHub = {
          totalRecords: 0
        };
      }
      await connection.end();
    } catch (error) {
      console.error('Error fetching survey data hub data:', error);
      summary.surveyDataHub = {
        totalRecords: 0
      };
    }

    return NextResponse.json(summary);
  } catch (error) {
    console.error('Dashboard API error:', error);
    return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 });
  }
} 