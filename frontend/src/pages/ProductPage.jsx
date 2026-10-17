import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { useToast } from "../context/ToastContext";
import ProductHeader from "../components/ProductHeader";
import ProductList from "../components/ProductList";
import { API_BASE_URL } from "../config/api";

const ProductPage = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [resProducts, resCategories] = await Promise.all([
        fetch(`${API_BASE_URL}/api/products`),
        fetch(`${API_BASE_URL}/api/categories`),
      ]);
      if (resProducts.ok) {
        const prodData = await resProducts.json();
        setProducts(prodData);
      }
      if (resCategories.ok) {
        const catData = await resCategories.json();
        setCategories(catData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      showToast("Failed to load products or categories.", "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products`);
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleDeleteClick = (id) => {
    const target = products.find((p) => p.id === id) || { id, name: "Product" };
    setDeleteTarget(target);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/products/${deleteTarget.id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        showToast(`Deleted "${deleteTarget.name}" successfully!`, "success");
        setDeleteTarget(null);
        fetchData();
      } else {
        showToast("Failed to delete product.", "error");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      showToast("Error connecting to server.", "error");
    } finally {
      setDeleting(false);
    }
  };

  // กรองสินค้าตามหมวดหมู่ที่เลือก
  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.categoryId === Number(selectedCategory));

  return (
    <div>
      {/* ส่วนหัวหน้าเว็บ และปุ่ม Add Product ไปยังหน้า /add */}
      <ProductHeader onAddClick={() => navigate("/add")} />

      {/* แถบกรองหมวดหมู่ (Category Filter Bar) */}
      {categories.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={`btn btn-sm rounded-full transition-all cursor-pointer font-medium text-xs ${
              selectedCategory === "all"
                ? "bg-black text-white border-black shadow-xs hover:bg-neutral-800"
                : "bg-white text-neutral-600 hover:text-black border border-neutral-200 hover:bg-neutral-100"
            }`}
          >
            All Products ({products.length})
          </button>
          {categories.map((cat) => {
            const count = products.filter((p) => p.categoryId === cat.id).length;
            const isSelected = selectedCategory === String(cat.id);
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(String(cat.id))}
                className={`btn btn-sm rounded-full transition-all cursor-pointer font-medium text-xs ${
                  isSelected
                    ? "bg-black text-white border-black shadow-xs hover:bg-neutral-800"
                    : "bg-white text-neutral-600 hover:text-black border border-neutral-200 hover:bg-neutral-100"
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>
      )}

      {/* รายการสินค้า หรือ Loading Spinner */}
      {loading ? (
        <div className="flex justify-center my-20">
          <span className="loading loading-spinner loading-lg text-neutral-900"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <ProductList
            products={filteredProducts}
            onEditClick={(product) => navigate(`/edit/${product.id}`)}
            onDeleteClick={handleDeleteClick}
          />
        </div>
      )}

      {/* DaisyUI Soft UI Modal: ยืนยันการลบสินค้า */}
      {deleteTarget && (
        <dialog className="modal modal-open backdrop-blur-xs bg-black/40 animate-in fade-in duration-200">
          <div className="modal-box bg-white border border-neutral-200 shadow-2xl rounded-3xl p-6 sm:p-8 max-w-sm text-center">
            <div className="w-14 h-14 bg-neutral-100 text-neutral-900 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-neutral-200">
              <Trash2 className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="font-bold text-xl text-neutral-900 mb-2">
              Delete Product?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 mb-6 leading-relaxed">
              Are you sure you want to delete{" "}
              <span className="font-bold text-neutral-900">
                "{deleteTarget.name}"
              </span>
              ? This action cannot be undone.
            </p>
            <div className="flex gap-2.5 justify-end">
              <button
                type="button"
                disabled={deleting}
                onClick={() => setDeleteTarget(null)}
                className="btn btn-sm sm:btn-md btn-ghost rounded-xl text-neutral-700 border border-neutral-200 px-4 flex-1"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deleting}
                onClick={confirmDelete}
                className="btn btn-sm sm:btn-md bg-red-600 hover:bg-red-700 rounded-xl text-white border-none shadow-xs px-5 flex-1"
              >
                {deleting ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ProductPage;
