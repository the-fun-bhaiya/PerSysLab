import e from "express";
import { userHome } from "../../../controller/user/home/userHome.js";
const router = e.Router();

router.get("/:username", userHome);


export {router as userHomeRouter};