import e from "express";
import { addMood, deleteMood } from "../../../controller/user/mood/userMood.js";
const moodRouter = e.Router();

moodRouter.route("/")
  .post(addMood)
  .delete(deleteMood)
//   .patch();

export default moodRouter;