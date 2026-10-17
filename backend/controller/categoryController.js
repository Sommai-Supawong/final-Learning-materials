import Category from "../model/categoryModel.js";
import Product from "../model/productModel.js";

// ดึงรายการหมวดหมู่ทั้งหมด
const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.findAll({
      order: [["id", "ASC"]],
      include: [
        {
          model: Product,
          attributes: ["id"],
        },
      ],
    });

    // แนบจำนวนสินค้า (productCount) ไปด้วยเพื่อให้ UI ใช้งานง่าย
    const formattedCategories = categories.map((cat) => ({
      id: cat.id,
      name: cat.name,
      productCount: cat.Products ? cat.Products.length : 0,
      createdAt: cat.createdAt,
      updatedAt: cat.updatedAt,
    }));

    return res.status(200).json(formattedCategories);
  } catch (error) {
    return next(error);
  }
};

// ดึงหมวดหมู่ตาม ID
const getCategoryById = async (req, res, next) => {
  try {
    const categoryId = Number(req.params.id);
    const category = await Category.findByPk(categoryId);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(200).json(category);
  } catch (error) {
    return next(error);
  }
};

// สร้างหมวดหมู่ใหม่
const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Category name is required" });
    }

    const existingCategory = await Category.findOne({
      where: { name: name.trim() },
    });
    if (existingCategory) {
      return res.status(409).json({ message: "Category name already exists" });
    }

    const newCategory = await Category.create({ name: name.trim() });
    return res.status(201).json(newCategory);
  } catch (error) {
    return next(error);
  }
};

// แก้ไขหมวดหมู่
const updateCategory = async (req, res, next) => {
  try {
    const categoryId = Number(req.params.id);
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Category name is required" });
    }

    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    category.name = name.trim();
    await category.save();

    return res
      .status(200)
      .json({ message: "Category updated", data: category });
  } catch (error) {
    return next(error);
  }
};

// ลบหมวดหมู่
const deleteCategory = async (req, res, next) => {
  try {
    const categoryId = Number(req.params.id);
    const category = await Category.findByPk(categoryId);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    await category.destroy();
    return res
      .status(200)
      .json({ message: "Category deleted", data: category });
  } catch (error) {
    return next(error);
  }
};

export {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
