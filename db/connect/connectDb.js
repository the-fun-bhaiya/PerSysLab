import dotenv from  "dotenv";
dotenv.config();
import mysql from "mysql2/promise";

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.PORT,
    waitForConnections: true,
    queueLimit: 0
});

await pool.getConnection((err, connection) => {
    if(err) {console.log("connectiomn error: " + err); return}
    console.log("connection successful!!!");
    connection.release();
});

export default pool;