import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from "../controller/categoryController.js";

const categoryRouter = Router();

// /api/categories
categoryRouter
  .route("/")
  .get(getAllCategories)
  .post(createCategory);

// /api/categories/:id
categoryRouter
  .route("/:id")
  .get(getCategoryById)
  .put(updateCategory)
  .delete(deleteCategory);

export default categoryRouter;
