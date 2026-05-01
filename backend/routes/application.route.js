import express from "express";
import cors from "cors";
import {applyJob, getApplicants, getAppliedJobs, updateStatus} from "../controllers/application.controllers.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
const router = express.Router();

router.options("/apply/:id", cors());
router.route("/apply/:id").post(isAuthenticated,applyJob);
router.route("/get").get(isAuthenticated,getAppliedJobs);
router.route("/:id/applicants").get(isAuthenticated,getApplicants);
router.route("/status/:id/update").post(isAuthenticated,updateStatus);

router.get("/test", (req, res) => {
  return res.status(200).json({ message: "Application route is live", success: true });
});

export default router;