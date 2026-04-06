import e from "express";
import { logout } from "../../../controller/user/login/logoutController.js";

const logoutRouter = e.Router();

logoutRouter.post("/", logout)


export default logoutRouter