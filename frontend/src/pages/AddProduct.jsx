import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CirclePlus } from "lucide-react";
import { useToast } from "../context/ToastContext";
import ProductForm from "./ProductForm";
import { API_BASE_URL } from "../config/api";

const AddProduct = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    categoryId: "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/categories`);
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create product");
      }

      // แสดง Toast สำเร็จ แล้วนำทางกลับไปยังหน้ารายการสินค้า
      showToast("Product added successfully!", "success");
      navigate("/products");
    } catch (error) {
      console.error("Error creating product:", error);
      showToast("Error adding product. Please check your connection.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProductForm
      title={
        <>
          <CirclePlus className="w-6 h-6 text-black" />
          <span>Add New Product</span>
        </>
      }
      buttonText="Create Product"
      formData={formData}
      categories={categories}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      loading={loading}
    />
  );
};

export default AddProduct;
