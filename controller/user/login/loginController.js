import pool from "../../../db/connect/connectDb.js";
import passwordFunc from "../../../utils/bcrypt/bcrypt.js";
import custFunc from "../../../utils/custFunc/custFunc.js";
import { loginSchema } from "../../../utils/validation/validation.js";

export const registerPost = async (req, res) => {
  let { username, password } = req.body;
  [password, username] = custFunc.sanit(password, username);
  const { error, value } = loginSchema.validate({ username, password });
  console.log(error, value);
  if (error) {
    return res.json({ msg: error.details[0].message, msgType: "error" });
  }
  const selectQuery = `SELECT username FROM USERS WHERE username = ?`;
  const [found] = await pool.execute(selectQuery, [username]);
  console.log(found);
  if (found.length > 0) {
    return res.json({
      msg: "Good thing:) We Know you, let's login.",
      msgType: "info",
    });
  }
  const hashedPassword = await passwordFunc("hash", password);
  console.log(hashedPassword);
  const saveQuery = `INSERT INTO users (username, password)
                        VALUES (?, ?)`;
  const values = [username, hashedPassword];
  try {
    const check = await pool.execute(saveQuery, values);
    console.log(check);
    req.session.username = username;
    req.flash("success", "Persy's happy to see you! make yourself at home");
    console.log(req.session + "  thisss");
    res.json({ redirectedUrl: `/user/home/${username}` });
  } catch (err) {
    console.log("got err while doing query " + err);
    res.json({
      msg: "Ouch!! Sorry I slipped let's try again in a bit",
      msgType: "error",
    });
  }
};

export const registerGet = (req, res) =>
  res.render("user/login/loginForm", {
    endpoint: "register",
    title: `Sign Up | PerSysLab`,
    css: `form/form`,
    js: [`form/form`],
  });

export const loginGet = (req, res) =>
  res.render("user/login/loginForm", {
    endpoint: "login",
    login: true,
    title: `Login | PerSysLab`,
    css: `form/form`,
    js: [`form/form`],
  });

export const loginPost = async (req, res) => {
  let { username, password } = req.body;
  [password, username] = custFunc.sanit(password, username);
  const { error, value } = loginSchema.validate({ username, password });
  console.log(error, value);
  if (error) {
    return res.json({ msg: error.details[0].message, msgType: "error" });
  }
  try {
    const selectQuery = `SELECT password FROM USERS WHERE username = ?`;
    const [found] = await pool.execute(selectQuery, [username]);
    if (found.length <= 0) {
      return res.json({
        msg: "I searched the whole city :( could't find your lab. Check Username Please OR Create an Account",
        msgType: "error",
      });
    }
    const haveAccess = await passwordFunc(
      "compare",
      password,
      found[0].password,
    );
    if (!haveAccess)
      return res.json({
        msg: "Oops! did you got a typo in your password? Please check again",
        msgType: "error",
      });
  } catch (err) {
    return res.json({
      msg: "owww! Sorry, I got a sprain, let's try that in a bit",
      msgType: "error",
    });
  }
  try {
    req.session.username = username;
    req.flash("success", `Welcome Home :D ${username}`);
    res.json({ redirectedUrl: `/user/home/${username}` });
  } catch (err) {
    console.log("got err while doing query " + err);
    res.json({
      msg: "Ouch!! Sorry I slipped let's try again in a bit",
      msgType: "error",
    });
  }
};
