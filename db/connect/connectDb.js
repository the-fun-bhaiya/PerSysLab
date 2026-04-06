import dotenv from  "dotenv";
import path, {dirname} from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: path.join(__dirname, "..", "..", "src",".env") });
import mysql from "mysql2/promise";
import custErr from "../../utils/customError/custErr.js";


const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT,

  ssl: {
    rejectUnauthorized: false,
  },

  waitForConnections: true,
  queueLimit: 0,
});

try {
  const connection = await pool.getConnection();
  console.log("connection successful!!!");
  connection.release();
} catch (err) {
  console.log("connection error:", err);
  new custErr(500, "something is terribly wrong")
}

export default pool;