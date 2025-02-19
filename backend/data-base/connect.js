const { Pool } = require('pg');
require('dotenv').config();


const pool = new Pool({
    user: 'postgres',      
    host: 'localhost',        
    database: 'FootballDataTHM',    
    password: process.env.DB_PASS,    
    port: 5432,               
});

module.exports = pool;
