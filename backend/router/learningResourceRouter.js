import express from "express";
import {
  getAllLearningResources,
  getLearningResourceById,
  createLearningResource,
  updateLearningResource,
  deleteLearningResource,
} from "../controller/learningResourceController.js";

const router = express.Router();

// RESTful API endpoints for Learning Resources
router.get("/", getAllLearningResources);
router.get("/:id", getLearningResourceById);
router.post("/", createLearningResource);
router.put("/:id", updateLearningResource);
router.delete("/:id", deleteLearningResource);

export default router;
