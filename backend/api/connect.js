import pkg from 'pg'; 
const { Pool } = pkg;

const pool = new Pool({
    user: 'postgres',      
    host: 'localhost',        
    database: 'FootballData',    
    password: 'nogueira2016',    
    port: 5432,               
});

export default pool;