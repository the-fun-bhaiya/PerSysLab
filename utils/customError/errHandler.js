import dotenv from  "dotenv";
import path, {dirname} from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: path.join(__dirname, "..", "..", "src", ".env") });

export const globalErr = (err, req, res, next) => {
  const def = {
    msg: "We tried our best to keep up this flight. but sorry... we crashed. :(",
    link: "/",
    btn: "Home",
  };
  const isProduction = process.env.NODE_ENV === "production"
  if (!isProduction) {
    console.log(err.stack);
    const msgObj = {
      msg: def.msg,
      btnLink: def.link,
      btnName: def.btn,
      title: "Uh..Ohhh",
      css: `err/errPage`,
    };
    res.render("errPage/errPage", msgObj);
    return;
  }
  const msgObj = {
    msg: err.msg,
    btnLink: err.btnLink,
    btnName: err.btnName,
    title: "Uh..Ohhh",
    css: `err/errPage`
  };
  res.render("errPage/errPage", msgObj);
};
