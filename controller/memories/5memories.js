import passwordFunc from "../../utils/bcrypt/bcrypt.js";

const hash = "$2b$10$vcgqp6m3CxI5BjX0xZVtu.MIXhSY38H8S2PWDTAqtGEeTQYnQHDsK";

export const renderMemoForm = (req, res) => {
  try {
    return res.render("memoForm/memoForm");
  } catch (err) {
    console.error("renderMemoForm error:", err);
    return res.status(500).send("Server error");
  }
};

export const handleMemoPassword = async (req, res) => {
  try {
    const password = req.body?.password;
    if (!password) {
      return res.render("memoForm/memoForm", { error: true });
    }

    const match = await passwordFunc("compare", password, hash);
    const images = [];
    for (let n = 1; n < 7; n++) {
      images.push(`/assets/memo/${n}.jpg`);
    }
    if (match === true) {
      return res.render("memories/memories", {
        images,
        voteData: {
          projector: {
            yes: 9,
            no: 0,
            maybe: 1,
          },
          buzzer: {
            yes: 7,
            no: 0,
            maybe: 3,
          },
        },
      });
    } else {
      return res.render("memoForm/memoForm", {
        error: "पासवर्ड गलत है — फिर कोशिश करो!",
      });
    }
  } catch (err) {
    console.error("handleMemoPassword error:", err);
    return res.render("memoForm/memoForm", {
      error: "कुछ गड़बड़ हो गया, बाद में आज़माओ",
    });
  }
};
