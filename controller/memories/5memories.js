import { compareSync } from "bcrypt";
import passwordFunc from "../../utils/bcrypt/bcrypt.js";

const hash = "$2b$10$vcgqp6m3CxI5BjX0xZVtu.MIXhSY38H8S2PWDTAqtGEeTQYnQHDsK";

export const renderMemoForm = (req, res) => {
  console.log(4);
  try {
    return res.render("memoForm/memoForm");
  } catch (err) {
    console.error("renderMemoForm error:", err);
    return res.status(500).send("Server error");
  }
};

export const handleMemoPassword = async (req, res) => {
  try {
    console.log("hmm here");
    const password = req.body.password;
    console.log(password);

    const match = await passwordFunc("compare", password, hash);
    if (match === true) {
      console.log("rendering");
      req.session.memoryAccess =
        "$2b$10$rqZv9klSQdzH5qKvK.bJpuANJ2xJLQiqX7FMIiOCDDSdfOxTP9dme";
      res.json({ success: true });
    } else {
      return res.json({
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

export const show = (req, res) => {
  console.log("showing");
  try {
    const letEnter = compareSync(haanji, req.session.memoryAccess);
    if (!letEnter) {
      return res.redirect("/memories");
    }
    const images = [];
    for (let n = 1; n < 7; n++) {
      console.log("pushed");
      images.push(`/assets/memo/${n}.jpg`);
    }
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
  } catch (err) {
    console.error("renderMemoForm error:", err);
    return res.status(500).send("Server error");
  }
};
