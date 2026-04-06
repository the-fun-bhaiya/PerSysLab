import pool from "../../../db/connect/connectDb.js";
import custFunc from "../../../utils/custFunc/custFunc.js";

export const addMood = async (req, res) => {
  console.log("goat the req")
  const username = req.session.username;
  let {mood, note} = req.body;
  [, mood, note] = custFunc.sanit(null, mood, note);
  const query = `INSERT INTO history (user_id, mood, note, date)
                 SELECT id, ?, ?, NOW()
                 FROM users
                 WHERE username = ?`
  const values = [mood, note, username];
  console.log(values)
  console.log("running the query")
  const [rows] = await pool.execute(query, values);
  console.log(rows)
  if (rows.length <= 0)
    return res.status(501).json({
      msg: "Sorry The Storage Locker Jammed, Lemme go and bring some oil...",
    });
  res.json({msg: "cool"});
}

export const deleteMood = async (req, res) => {
  let {moodId} = req.body;
  [, moodId] = custFunc.sanit(null, moodId)
  const query = `DELETE FROM history
                  WHERE id = ?;`;
  const values = [moodId];
  try {const [rows] = await pool.execute(query, values);
  rows.affectedRows > 0 ? res.json({msg: `Done. Swept into the Dustbin`, msgType: "success"}) : res.json({msg: "weird, I couldn't sweep anything", msgType: "error"});}
  catch {
    res.status(503).json({msg: "I'm Sorry. I am sick today, Please try in a bit. Thanks"})
  }
}