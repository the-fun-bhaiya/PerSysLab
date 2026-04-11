import pool from "../../db/connect/connectDb.js";

export const survey = async (req, res) => {
  const { projector_vote, buzzer_vote, direct_message } = req.body;

  try {
    // 1. 'survey' टेबल में मैसेज स्टोर करना
    if (direct_message && direct_message.trim() !== "") {
      const insertMsgQuery = `INSERT INTO survey (message) VALUES (?)`;
      await pool.execute(insertMsgQuery, [direct_message]);
    }

    // 2. 'vote' टेबल में काउंट्स अपडेट करना
    // यह फंक्शन चेक करेगा कि कौन सा बटन दबाया गया है और सही कॉलम में +1 करेगा
    const updateVoteCount = async (voteTarget, voteValue) => {
      if (!voteValue) return;

      // 'dont_know' को डेटाबेस के 'maybe' कॉलम से मैप करना
      const columnName = voteValue === "dont_know" ? "maybe" : voteValue;

      // सफ़ेद लिस्टिंग (White-listing) ताकि SQL Injection न हो
      const allowedColumns = ["yes", "no", "maybe"];
      if (!allowedColumns.includes(columnName)) return;

      const updateQuery = `
                UPDATE vote 
                SET ${columnName} = ${columnName} + 1 
                WHERE name = ?
            `;
      await pool.execute(updateQuery, [voteTarget]);
    };

    // दोनों सवालों के लिए अपडेट चलाएं
    await updateVoteCount("projector", projector_vote);
    await updateVoteCount("buzzer", buzzer_vote);

    res.redirect("/memories");
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).send("कुछ तकनीकी समस्या आ गई है।");
  }
};
