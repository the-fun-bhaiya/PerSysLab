import passwordFunc from "../../utils/bcrypt/bcrypt.js";

const hash = "$2b$10$SncMo5nDEKBX95EQfuvfyu5H.gS3Ou3biPsZlLx7IrRcuwc4vaxGC";

export const renderMemoForm = (req, res) => {
  try {
    return res.render('memoForm/memoForm');
  } catch (err) {
    console.error('renderMemoForm error:', err);
    return res.status(500).send('Server error');
  }
};

export const handleMemoPassword = async (req, res) => {
  try {
    const password = req.body?.password;
    if (!password) {
      return res.render('memoForm/memoForm', { error: true });
    }

    const match = await passwordFunc('compare', password, hash);

    if (match === true) {
      return res.render('memories/memories', {images: ["/assets/memo/one.jpg", "/assets/memo/two.jpg"]});
    } else {
      return res.render('memoForm/memoForm', { error: 'पासवर्ड गलत है — फिर कोशिश करो!' });
    }
  } catch (err) {
    console.error('handleMemoPassword error:', err);
    return res.render('memoForm/memoForm', { error: 'कुछ गड़बड़ हो गया, बाद में आज़माओ' });
  }
};
