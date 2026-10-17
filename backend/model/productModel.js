import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import Category from "./categoryModel.js";

const Product = sequelize.define("Product", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  // เก็บ URL ลิงก์รูปภาพเป็น String (เช่น https://example.com/image.jpg)
  // กำหนด allowNull: true คือไม่ต้องใส่รูปภาพก็ได้
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  // รหัสหมวดหมู่สินค้า เชื่อมกับ Category model
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

// ความสัมพันธ์ 1 หมวดหมู่มีได้หลายสินค้า (1:N)
Category.hasMany(Product, { foreignKey: "categoryId", onDelete: "SET NULL" });
Product.belongsTo(Category, { foreignKey: "categoryId", as: "category" });

export default Product;
