import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SquarePen } from "lucide-react";
import { useToast } from "../context/ToastContext";
import ProductForm from "./ProductForm";
import { API_BASE_URL } from "../config/api";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [fetching, setFetching] = useState(true);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    categoryId: "",
  });

  // ดึงข้อมูลสินค้าเดิม และหมวดหมู่ทั้งหมดมาแสดงในฟอร์มเมื่อหน้าโหลด
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resProduct, resCategories] = await Promise.all([
          fetch(`${API_BASE_URL}/api/products/${id}`),
          fetch(`${API_BASE_URL}/api/categories`),
        ]);

        if (!resProduct.ok) {
          throw new Error("Product not found");
        }
        const data = await resProduct.json();
        setFormData({
          name: data.name || "",
          price: data.price !== undefined ? data.price : "",
          description: data.description || "",
          image: data.image || "",
          categoryId: data.categoryId || "",
        });

        if (resCategories.ok) {
          const catData = await resCategories.json();
          setCategories(catData);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
        showToast("Failed to load product details.", "error");
        navigate("/products");
      } finally {
        setFetching(false);
      }
    };

    fetchData();
  }, [id, navigate, showToast]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      // เมื่อแก้ไขสำเร็จ แสดง Toast แล้วนำทางกลับไปยังหน้ารายการสินค้า
      showToast("Product updated successfully!", "success");
      navigate("/products");
    } catch (error) {
      console.error("Error updating product:", error);
      showToast("Error updating product.", "error");
    } finally {
      setSaving(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex justify-center my-24">
        <span className="loading loading-spinner loading-lg text-neutral-900"></span>
      </div>
    );
  }

  return (
    <ProductForm
      title={
        <>
          <SquarePen className="w-6 h-6 text-black" />
          <span>Edit Product</span>
        </>
      }
      buttonText="Save Changes"
      formData={formData}
      categories={categories}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      loading={saving}
    />
  );
};

export default EditProduct;
