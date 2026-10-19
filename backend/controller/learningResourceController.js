import { Op } from "sequelize";
import LearningResource, { ALLOWED_CATEGORIES } from "../model/learningResourceModel.js";

// ตรวจสอบว่า id เป็นจำนวนเต็มบวกหรือไม่ (> 0)
const isValidPositiveInteger = (val) => {
  if (typeof val === "number") return Number.isInteger(val) && val > 0;
  if (typeof val === "string") {
    const trimmed = val.trim();
    if (!/^\d+$/.test(trimmed)) return false;
    const num = Number(trimmed);
    return Number.isInteger(num) && num > 0;
  }
  return false;
};

// ตรวจสอบความถูกต้องของข้อมูลตามข้อกำหนด (Validation Helper)
const validateResourceInput = (data, isUpdate = false) => {
  const errors = [];
  const { title, creator, category, publishedDate, description, status } = data;

  // 1. Title validation: 1-150 ตัวอักษร, ไม่เป็นช่องว่างล้วน
  if (!isUpdate || title !== undefined) {
    if (title === undefined || title === null || typeof title !== "string" || title.trim().length === 0) {
      errors.push("ชื่อสื่อการเรียนรู้ (title) ต้องระบุ และไม่เป็นช่องว่างล้วน");
    } else if (title.trim().length > 150) {
      errors.push("ชื่อสื่อการเรียนรู้ต้องมีความยาวไม่เกิน 150 ตัวอักษร");
    }
  }

  // 2. Creator validation: 1-100 ตัวอักษร, ไม่เป็นช่องว่างล้วน
  if (!isUpdate || creator !== undefined) {
    if (creator === undefined || creator === null || typeof creator !== "string" || creator.trim().length === 0) {
      errors.push("ชื่อผู้สร้าง/ผู้รับผิดชอบ (creator) ต้องระบุ และไม่เป็นช่องว่างล้วน");
    } else if (creator.trim().length > 100) {
      errors.push("ชื่อผู้สร้างต้องมีความยาวไม่เกิน 100 ตัวอักษร");
    }
  }

  // 3. Category validation: ต้องอยู่ในหมวดหมู่ที่กำหนด
  if (!isUpdate || category !== undefined) {
    if (!category || !ALLOWED_CATEGORIES.includes(category)) {
      errors.push(`หมวดหมู่ (category) ต้องเป็นหนึ่งใน: ${ALLOWED_CATEGORIES.join(", ")}`);
    }
  }

  // 4. PublishedDate validation: วันที่รูปแบบ YYYY-MM-DD ที่ถูกต้อง
  if (!isUpdate || publishedDate !== undefined) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!publishedDate || !dateRegex.test(publishedDate) || isNaN(Date.parse(publishedDate))) {
      errors.push("วันที่เผยแพร่ (publishedDate) ต้องเป็นรูปแบบ YYYY-MM-DD ที่ถูกต้อง");
    }
  }

  // 5. Description validation: 1-2,000 ตัวอักษร, ไม่เป็นช่องว่างล้วน
  if (!isUpdate || description !== undefined) {
    if (description === undefined || description === null || typeof description !== "string" || description.trim().length === 0) {
      errors.push("รายละเอียด (description) ต้องระบุ และไม่เป็นช่องว่างล้วน");
    } else if (description.trim().length > 2000) {
      errors.push("รายละเอียดต้องมีความยาวไม่เกิน 2,000 ตัวอักษร");
    }
  }

  // 6. Status validation (ถ้าส่งมา)
  if (status !== undefined && typeof status !== "boolean") {
    if (status !== "true" && status !== "false" && status !== 1 && status !== 0) {
      errors.push("สถานะ (status) ต้องเป็น boolean (เผยแพร่/ฉบับร่าง)");
    }
  }

  return errors;
};

/**
 * GET /api/learning-resources
 * อ่านรายการ ค้นหา และกรอง (รองรับคำค้นบางส่วน q/search/title และหมวดหมู่ category ร่วมกัน)
 */
export const getAllLearningResources = async (req, res) => {
  try {
    const { search, q, title, category } = req.query;
    const searchTerm = search || q || title;
    const whereConditions = [];

    // ค้นหาบางส่วนจากชื่อสื่อการเรียนรู้
    if (searchTerm && searchTerm.trim() !== "") {
      const term = `%${searchTerm.trim()}%`;
      whereConditions.push({
        title: {
          [Op.iLike]: term, // PostgreSQL case-insensitive like
        },
      });
    }

    // กรองตามหมวดหมู่
    if (category && category.trim() !== "" && category !== "all") {
      whereConditions.push({
        category: category.trim(),
      });
    }

    const where = whereConditions.length > 0 ? { [Op.and]: whereConditions } : {};

    const resources = await LearningResource.findAll({
      where,
      order: [["id", "ASC"]],
    });

    // หากไม่พบ ให้ตอบ 200 พร้อมรายการว่าง []
    return res.status(200).json(resources);
  } catch (error) {
    console.error("❌ Error in getAllLearningResources:", error.message);
    return res.status(500).json({
      message: "เกิดข้อผิดพลาดภายในระบบในการดึงข้อมูลสื่อการเรียนรู้",
    });
  }
};

/**
 * GET /api/learning-resources/:id
 * อ่านรายละเอียดหนึ่งรายการตาม id
 */
export const getLearningResourceById = async (req, res) => {
  try {
    const { id } = req.params;

    // ตรวจสอบ id ต้องเป็นจำนวนเต็มบวก
    if (!isValidPositiveInteger(id)) {
      return res.status(400).json({
        message: "รหัส id ต้องเป็นจำนวนเต็มบวกเท่านั้น",
      });
    }

    const resource = await LearningResource.findByPk(Number(id));

    if (!resource) {
      return res.status(404).json({
        message: `ไม่พบสื่อการเรียนรู้รหัส ${id}`,
      });
    }

    return res.status(200).json(resource);
  } catch (error) {
    console.error("❌ Error in getLearningResourceById:", error.message);
    return res.status(500).json({
      message: "เกิดข้อผิดพลาดภายในระบบในการดึงรายละเอียดสื่อการเรียนรู้",
    });
  }
};

/**
 * POST /api/learning-resources
 * เพิ่มรายการสื่อการเรียนรู้ใหม่
 */
export const createLearningResource = async (req, res) => {
  try {
    const errors = validateResourceInput(req.body, false);
    if (errors.length > 0) {
      return res.status(400).json({
        message: errors.join(", "),
        errors,
      });
    }

    const { title, creator, category, publishedDate, description, imageUrl, status } = req.body;

    const newResource = await LearningResource.create({
      title: title.trim(),
      creator: creator.trim(),
      category: category.trim(),
      publishedDate,
      description: description.trim(),
      imageUrl: imageUrl ? imageUrl.trim() : null,
      status: status !== undefined ? Boolean(status) : true,
    });

    return res.status(201).json(newResource);
  } catch (error) {
    console.error("❌ Error in createLearningResource:", error.message);
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        message: error.errors.map((e) => e.message).join(", "),
      });
    }
    return res.status(500).json({
      message: "เกิดข้อผิดพลาดภายในระบบในการสร้างสื่อการเรียนรู้",
    });
  }
};

/**
 * PUT /api/learning-resources/:id
 * แก้ไขรายการสื่อการเรียนรู้ตาม id
 */
export const updateLearningResource = async (req, res) => {
  try {
    const { id } = req.params;

    // ตรวจสอบ id ต้องเป็นจำนวนเต็มบวก
    if (!isValidPositiveInteger(id)) {
      return res.status(400).json({
        message: "รหัส id ต้องเป็นจำนวนเต็มบวกเท่านั้น",
      });
    }

    const resource = await LearningResource.findByPk(Number(id));
    if (!resource) {
      return res.status(404).json({
        message: `ไม่พบสื่อการเรียนรู้รหัส ${id}`,
      });
    }

    const errors = validateResourceInput(req.body, true);
    if (errors.length > 0) {
      return res.status(400).json({
        message: errors.join(", "),
        errors,
      });
    }

    const { title, creator, category, publishedDate, description, imageUrl, status } = req.body;

    if (title !== undefined) resource.title = title.trim();
    if (creator !== undefined) resource.creator = creator.trim();
    if (category !== undefined) resource.category = category.trim();
    if (publishedDate !== undefined) resource.publishedDate = publishedDate;
    if (description !== undefined) resource.description = description.trim();
    if (imageUrl !== undefined) resource.imageUrl = imageUrl ? imageUrl.trim() : null;
    if (status !== undefined) resource.status = Boolean(status);

    await resource.save();

    return res.status(200).json(resource);
  } catch (error) {
    console.error("❌ Error in updateLearningResource:", error.message);
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        message: error.errors.map((e) => e.message).join(", "),
      });
    }
    return res.status(500).json({
      message: "เกิดข้อผิดพลาดภายในระบบในการแก้ไขสื่อการเรียนรู้",
    });
  }
};

/**
 * DELETE /api/learning-resources/:id
 * ลบรายการสื่อการเรียนรู้ตาม id
 */
export const deleteLearningResource = async (req, res) => {
  try {
    const { id } = req.params;

    // ตรวจสอบ id ต้องเป็นจำนวนเต็มบวก
    if (!isValidPositiveInteger(id)) {
      return res.status(400).json({
        message: "รหัส id ต้องเป็นจำนวนเต็มบวกเท่านั้น",
      });
    }

    const resource = await LearningResource.findByPk(Number(id));
    if (!resource) {
      return res.status(404).json({
        message: `ไม่พบสื่อการเรียนรู้รหัส ${id}`,
      });
    }

    await resource.destroy();

    return res.status(200).json({
      message: `ลบสื่อการเรียนรู้รหัส ${id} สำเร็จ`,
      data: resource,
    });
  } catch (error) {
    console.error("❌ Error in deleteLearningResource:", error.message);
    return res.status(500).json({
      message: "เกิดข้อผิดพลาดภายในระบบในการลบสื่อการเรียนรู้",
    });
  }
};
