import e from "express";
import {
  handleMemoPassword,
  renderMemoForm,
  show,
} from "../../controller/memories/5memories.js";
const memoRouter = e.Router();

memoRouter.route("/").get(renderMemoForm).post(handleMemoPassword);

memoRouter.get("/auth", show);
export default memoRouter;
