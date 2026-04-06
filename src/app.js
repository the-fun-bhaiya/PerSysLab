import { configDotenv } from "dotenv";
import path, {dirname} from "path"
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
configDotenv({ path: path.join(__dirname, ".env") });
import express from "express";
import { fileURLToPath } from "url";
import ejsMate from "ejs-mate"
import {homeRouter} from "../routes/home/homeRoute.js";
import session from "../utils/session/session.js";
import { loginRouter } from "../routes/user/login/loginRoute.js";
import { globalErr } from "../utils/customError/errHandler.js";
import { checkSession } from "../utils/session/sessionChecker.js";
import flash from "connect-flash";
import { userHomeRouter } from "../routes/user/home/userHomeRoute.js";
import moodRouter from "../routes/user/mood/mood.js";
import logoutRouter from "../routes/user/login/logoutRoute.js";
import csurf from "csurf";

const app = express();
const csurfProtection = csurf()


app.engine("ejs", ejsMate)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}))
app.use(express.json());
const isProduction = process.env.NODE_ENV === "production";
if (isProduction) {
    app.set("trust proxy", 1)
}

app.use(session);
app.use(flash());

app.use((req, res, next) => {
    console.log(req.session, req.session.flash)
    res.locals.css = "";
    res.locals.js = [];
    res.locals.title = "PerSysLab";
    next();
});

app.use((req, res, next) => {
  res.set({
    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    Pragma: "no-cache",
    Expires: "0",
    "Surrogate-Control": "no-store",
  });
  next();
});

app.use("/", homeRouter);
app.use("/user", loginRouter);
app.use("/user/home", csurfProtection, checkSession, userHomeRouter);
app.use("/user/mood", csurfProtection, moodRouter);
app.use("/user/logout", csurfProtection, logoutRouter);

app.use((req, res) => {
    const msgObj = {
        msg: "looks like you have lost, let's get you home", 
        btnLink: "/", 
        btnName: "Home. Sweet Home.",
        title: "Uh..Ohhh",
        css: `err/errPage`
    };
    res.render("errPage/errPage", msgObj);
})

app.use(globalErr);

app.listen(8080, ()=>{
    console.log("yeah radio is on, right here on http://localhost:8080");
})