import e from "express";
import { handleMemoPassword, renderMemoForm } from "../../controller/memories/5memories.js";
const memoRouter = e.Router();

memoRouter.route("/")
 .get(renderMemoForm)
 .post(handleMemoPassword)

export default memoRouter;