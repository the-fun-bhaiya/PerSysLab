import { configDotenv } from "dotenv";
import expressSession from "express-session";
import connectMySql from "express-mysql-session";
import pool from "../../db/connect/connectDb.js";

configDotenv();
const MySQLStore = connectMySql(expressSession);

const store = new MySQLStore({}, pool);

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
        secure: false,
    }
});

export default session;