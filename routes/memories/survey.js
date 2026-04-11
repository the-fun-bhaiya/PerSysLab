import e from "express";
import { survey } from "../../controller/memories/survey.js";
const suRouter = e.Router();

suRouter.post("/", survey);

export default suRouter;
