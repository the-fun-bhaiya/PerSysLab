import custErr from "../customError/custErr.js"

export const checkSession = (req, res, next) => {
    console.log("season checked");
    if (!req.session || !req.session.username) new custErr(402, "Sorry, but for security reasons, you have to login in every 24 hours", "/user/login", "Let's get to the Lab");
    next();
}