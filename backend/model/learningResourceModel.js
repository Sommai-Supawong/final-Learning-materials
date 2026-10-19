import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

// หมวดหมู่ที่อนุญาตสำหรับชุดที่ 5 สื่อการเรียนรู้ (ชุด E): บทความ, วิดีโอ, แบบฝึกหัด
export const ALLOWED_CATEGORIES = ["บทความ", "วิดีโอ", "แบบฝึกหัด"];

export const LearningResource = sequelize.define(
  "LearningResource",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "กรุณาระบุชื่อสื่อการเรียนรู้ (title)",
        },
        len: {
          args: [1, 150],
          msg: "ชื่อสื่อการเรียนรู้ต้องมีความยาว 1-150 ตัวอักษร",
        },
        notOnlyWhitespace(value) {
          if (!value || typeof value !== "string" || value.trim().length === 0) {
            throw new Error("ชื่อสื่อการเรียนรู้ต้องไม่เป็นช่องว่างล้วน");
          }
        },
      },
    },
    creator: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "กรุณาระบุชื่อผู้สร้าง/ผู้รับผิดชอบ (creator)",
        },
        len: {
          args: [1, 100],
          msg: "ชื่อผู้สร้างต้องมีความยาว 1-100 ตัวอักษร",
        },
        notOnlyWhitespace(value) {
          if (!value || typeof value !== "string" || value.trim().length === 0) {
            throw new Error("ชื่อผู้สร้างต้องไม่เป็นช่องว่างล้วน");
          }
        },
      },
    },
    category: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        isIn: {
          args: [ALLOWED_CATEGORIES],
          msg: `หมวดหมู่ต้องเป็นหนึ่งใน: ${ALLOWED_CATEGORIES.join(", ")}`,
        },
      },
    },
    publishedDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: {
          msg: "รูปแบบวันที่ไม่ถูกต้อง ต้องเป็น YYYY-MM-DD",
        },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "กรุณาระบุรายละเอียดสื่อการเรียนรู้ (description)",
        },
        len: {
          args: [1, 2000],
          msg: "รายละเอียดต้องมีความยาว 1-2,000 ตัวอักษร",
        },
        notOnlyWhitespace(value) {
          if (!value || typeof value !== "string" || value.trim().length === 0) {
            throw new Error("รายละเอียดต้องไม่เป็นช่องว่างล้วน");
          }
        },
      },
    },
    imageUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true, // ค่าเริ่มต้น true; true = เผยแพร่, false = ฉบับร่าง
    },
  },
  {
    tableName: "learning_resources",
    timestamps: true, // อนุญาตให้มี createdAt และ updatedAt ได้ตามข้อกำหนด
  }
);

export default LearningResource;
