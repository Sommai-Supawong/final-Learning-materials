import Product from "../model/productModel.js";
import Category from "../model/categoryModel.js";

const createProduct = async (req, res, next) => {
  try {
    // ดึงค่าจาก req.body โดย image คือ URL ของรูปภาพ และ categoryId คือรหัสหมวดหมู่
    const { name, price, description, image, categoryId } = req.body;
    if (!name || !price) {
      return res
        .status(400)
        .json({ message: "Name and Price are requied fields" });
    }
    // บันทึกข้อมูลสินค้าใหม่ รวมถึง URL รูปภาพ และ categoryId ลง Database
    const newProduct = await Product.create({
      name,
      price: Number(price),
      description,
      image,
      categoryId: categoryId ? Number(categoryId) : null,
    });

    // ดึงข้อมูลพร้อม category object กลับไป
    const productWithCategory = await Product.findByPk(newProduct.id, {
      include: [{ model: Category, as: "category", attributes: ["id", "name"] }],
    });

    return res.status(201).json(productWithCategory);
  } catch (error) {
    return next(error);
  }
};

const getAllProduct = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      order: [["id", "DESC"]],
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["id", "name"],
        },
      ],
    });

    return res.status(200).json(products);
  } catch (error) {
    return next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    // แปลง id จาก string เป็น number
    const productId = Number(req.params.id);

    // ค้นหา product ที่มี id ตรงกับที่ขอมา
    const product = await Product.findByPk(productId, {
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["id", "name"],
        },
      ],
    });

    // ถ้าไม่เจอ ให้ตอบกลับ 404 และ return ออกจาก function เลย
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // ถ้าเจอ ส่งข้อมูลกลับไป
    return res.status(200).json(product);
  } catch (error) {
    return next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    // แปลง id จาก string เป็น number
    const productId = Number(req.params.id);

    // รับค่าใหม่จาก body (รวมถึง URL รูปภาพใหม่ image และ categoryId)
    const { name, price, description, image, categoryId } = req.body;

    // หา product ที่จะแก้ไขก่อน
    const product = await Product.findByPk(productId);

    // ถ้าไม่เจอส่ง 404
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // อัปเดตค่า ถ้าไม่ส่งมาให้ใช้ค่าเดิม (รวมถึงฟิลด์ description, image URL และ categoryId)
    product.name = name || product.name;
    product.price = price !== undefined ? Number(price) : product.price;
    product.description = description !== undefined ? description : product.description;
    product.image = image !== undefined ? image : product.image;
    if (categoryId !== undefined) {
      product.categoryId = categoryId ? Number(categoryId) : null;
    }

    // บันทึกลง database จริง
    await product.save();

    // ดึงข้อมูลพร้อม category ล่าสุด
    const updatedProduct = await Product.findByPk(product.id, {
      include: [{ model: Category, as: "category", attributes: ["id", "name"] }],
    });

    return res.status(200).json({ message: "Product updated", data: updatedProduct });
  } catch (error) {
    return next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    // แปลง id จาก string เป็น number
    const productId = Number(req.params.id);

    // หา product ที่จะลบก่อน
    const product = await Product.findByPk(productId);

    // ถ้าไม่เจอส่ง 404
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // ลบออกจาก database จริง
    await product.destroy();

    return res.status(200).json({ message: "Product deleted", data: product });
  } catch (error) {
    return next(error);
  }
};

export {
  createProduct,
  getAllProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
