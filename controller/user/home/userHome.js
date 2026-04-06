import { askFeeling } from "../../../apis/greetlingLines/greetingApi.js";
import { moods } from "../../../db/data/localdb.js";
import pool from "../../../db/connect/connectDb.js";
import custErr from "../../../utils/customError/custErr.js";

export const userHome = async (req, res) => {
  const username = req.session.username;
  console.log(username !== req.params.username);
  if (username !== req.params.username) throw new custErr(403, "Please login again, just ocassionally check-ins.", "/user/login", "Login");
  const [msg] = req.flash("success");
  const query = `SELECT h.mood, h.note, h.date, h.id
                 FROM history h
                 JOIN users u ON h.user_id = u.id
                 WHERE u.username = ?;`
  const values = [username];
  const [rows] = await pool.execute(query, values);
  const options = { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric', 
    hour: 'numeric', 
    minute: 'numeric', 
    hour12: true 
  };
  const history = [];
  rows.forEach(h => {
    h.date = Intl.DateTimeFormat("en-GB", options).format(new Date(h.date))
    history.push(h)
  });
  const tmplt = {
    history,
    msg,
    username,
    askFeeling,
    moods,
    csrfToken: req.csrfToken(),
    title: `${username}'s Home | PerSysLab`,
    css: `userHome/userHome`,
    js: [`userHome/userHomeFN`]
  }
  
  res.render("user/home/userHome", tmplt);
};
