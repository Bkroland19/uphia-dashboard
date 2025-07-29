import mysql from 'mysql2/promise';

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ug_hh_int', // default database
};

export async function getConnection() {
  return await mysql.createConnection(dbConfig);
}

export async function executeQuery(query: string, params: any[] = []) {
  const connection = await getConnection();
  try {
    const [rows] = await connection.execute(query, params);
    return rows;
  } finally {
    await connection.end();
  }
}

export async function switchDatabase(database: string) {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: database,
  });
  return connection;
}

export const databases = {
  'ug_hh_int': 'Household Interview',
  'ug_hh_rstr': 'Household Roster',
  'ug_hh_rstr_min': 'Household Roster Minimal',
  'ug_ind_int': 'Individual Interview',
  'ug_surv_data_hub': 'Survey Data Hub'
}; 