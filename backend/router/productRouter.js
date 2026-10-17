import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getProductById,
  updateProduct,
} from "../controller/productController.js";

const productRouter = Router();

// เส้นทางสำหรับ /api/products (ดึงสินค้าทั้งหมด และเพิ่มสินค้าใหม่)
productRouter
  .route("/")
  .get(getAllProduct)
  .post(createProduct);

// เส้นทางสำหรับ /api/products/:id (ดึงรายชิ้น, แก้ไข, ลบ ตาม ID)
productRouter
  .route("/:id")
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);

export default productRouter;
