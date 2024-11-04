import dotenv from 'dotenv';
dotenv.config(); 

import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'FootballDataTHM',
    password: process.env.DB_PASS,
    port: 5432,
});

export default pool;
