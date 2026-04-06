import e from "express"
const router = e.Router(); 
import {home} from "../../controller/home/homeController.js"

router.get("/", home);

export {router as homeRouter};