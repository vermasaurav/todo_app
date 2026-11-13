import express from "express";
import {
  createTask,
  getTasks,
  getWeeklyOverview,
  getTaskById,
  updateTask,
  toggleTaskStatus,
  deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.get("/weekly-overview", getWeeklyOverview);
router.route("/").get(getTasks).post(createTask);
router.route("/:id").get(getTaskById).put(updateTask).delete(deleteTask);
router.patch("/:id/toggle", toggleTaskStatus);

export default router;

