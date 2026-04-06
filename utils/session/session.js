import { configDotenv } from "dotenv";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import expressSession from "express-session";
import connectMySql from "express-mysql-session";
import pool from "../../db/connect/connectDb.js";

configDotenv({ path: path.join(__dirname, "..", "..", "src", ".env") });
const MySQLStore = connectMySql(expressSession);

const store = new MySQLStore({}, pool);

const isProduction = process.env.NODE_ENV === "production"

const session = expressSession({
    name: "cookiebi",
    path: "/user",
    secret: process.env.SECRET,
    store,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 3600 * 1000,
        httpOnly: true,
        secure: isProduction,
    }
});

export default session;