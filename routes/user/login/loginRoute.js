import e from "express";
import * as login from "../../../controller/user/login/loginController.js";
const router = e.Router();


router.route("/register")
 .get(login.registerGet)
 .post(login.registerPost);

router.route("/login")
 .get(login.loginGet)
 .post(login.loginPost)

export {router as loginRouter};