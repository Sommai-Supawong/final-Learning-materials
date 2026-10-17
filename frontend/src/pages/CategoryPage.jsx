import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Tags, Plus, Edit2, Trash2, Check, X } from "lucide-react";
import { useToast } from "../context/ToastContext";
import { API_BASE_URL } from "../config/api";

const CategoryPage = () => {
  const { showToast } = useToast();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // สำหรับฟอร์มเพิ่มหมวดหมู่ใหม่
  const [newCategoryName, setNewCategoryName] = useState("");
  const [adding, setAdding] = useState(false);

  // สำหรับการแก้ไขหมวดหมู่ (inline edit)
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");
  const [saving, setSaving] = useState(false);

  // สำหรับ Modal ยืนยันการลบ
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/categories`);
      if (!response.ok) throw new Error("Failed to fetch categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      showToast("Failed to load categories.", "error");
    } finally {
      setLoading(false);
    }
  };

  // สร้างหมวดหมู่ใหม่ (Create)
  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    setAdding(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCategoryName.trim() }),
      });

      if (response.status === 409) {
        showToast("Category name already exists!", "error");
        return;
      }
      if (!response.ok) throw new Error("Failed to create category");

      showToast(`Category "${newCategoryName}" created!`, "success");
      setNewCategoryName("");
      fetchCategories();
    } catch (error) {
      console.error("Error adding category:", error);
      showToast("Failed to add category.", "error");
    } finally {
      setAdding(false);
    }
  };

  // เริ่มแก้ไข (Start Edit)
  const startEdit = (category) => {
    setEditingId(category.id);
    setEditingName(category.name);
  };

  // บันทึกการแก้ไข (Update)
  const handleSaveEdit = async (id) => {
    if (!editingName.trim()) return;

    setSaving(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editingName.trim() }),
      });

      if (!response.ok) throw new Error("Failed to update category");

      showToast("Category updated successfully!", "success");
      setEditingId(null);
      setEditingName("");
      fetchCategories();
    } catch (error) {
      console.error("Error updating category:", error);
      showToast("Failed to update category.", "error");
    } finally {
      setSaving(false);
    }
  };

  // ยืนยันการลบ (Delete)
  const confirmDelete = async () => {
    if (!deleteTarget) return;

    setDeleting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/categories/${deleteTarget.id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete category");

      showToast(`Deleted "${deleteTarget.name}" successfully!`, "success");
      setDeleteTarget(null);
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
      showToast("Failed to delete category.", "error");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-2">
      {/* Header bar */}
      <div className="flex items-center justify-between mb-6">
        <Link
          to="/products"
          className="btn btn-sm btn-ghost bg-white hover:bg-neutral-100 border border-neutral-200 shadow-xs rounded-xl text-neutral-800 gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Products</span>
        </Link>
      </div>

      {/* Main Glass Card */}
      <div className="bg-white border border-neutral-200/80 shadow-xs rounded-3xl p-6 sm:p-8">
        <div className="flex items-center gap-3.5 mb-6 border-b border-neutral-150 pb-5">
          <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center shadow-xs">
            <Tags className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-neutral-900 tracking-tight">
              Category Management
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 font-normal">
              จัดการหมวดหมู่สินค้า เพิ่ม แก้ไข และลบหมวดหมู่
            </p>
          </div>
        </div>

        {/* Form: เพิ่มหมวดหมู่ใหม่ */}
        <form onSubmit={handleAddCategory} className="mb-8">
          <div className="flex gap-2">
            <input
              type="text"
              required
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="e.g. Electronics, Clothing, Books..."
              className="input input-bordered flex-1 bg-white border-neutral-200 focus:border-black focus:outline-none rounded-xl text-neutral-900 placeholder:text-neutral-400 text-sm"
            />
            <button
              type="submit"
              disabled={adding || !newCategoryName.trim()}
              className="btn bg-black hover:bg-neutral-800 text-white rounded-xl px-5 border-none shadow-xs hover:shadow-md transition-all cursor-pointer disabled:opacity-50 gap-1.5 text-sm"
            >
              {adding ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <>
                  <Plus className="w-4 h-4" /> Add Category
                </>
              )}
            </button>
          </div>
        </form>

        {/* รายการหมวดหมู่ทั้งหมด */}
        <div>
          <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">
            All Categories ({categories.length})
          </h3>

          {loading ? (
            <div className="flex justify-center my-12">
              <span className="loading loading-spinner loading-md text-neutral-900"></span>
            </div>
          ) : categories.length === 0 ? (
            <div className="text-center py-12 bg-neutral-50 rounded-2xl border border-dashed border-neutral-300">
              <Tags className="w-10 h-10 text-neutral-300 mx-auto mb-2" />
              <p className="text-neutral-500 text-sm">
                ยังไม่มีหมวดหมู่สินค้า เริ่มต้นเพิ่มหมวดหมู่แรกได้ที่ช่องด้านบน
              </p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="flex items-center justify-between p-3.5 bg-neutral-50/70 hover:bg-neutral-100/80 border border-neutral-200/70 rounded-2xl transition-all"
                >
                  {editingId === cat.id ? (
                    // โหมดแก้ไข (Inline Edit)
                    <div className="flex-1 flex items-center gap-2 mr-2">
                      <input
                        type="text"
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        autoFocus
                        className="input input-sm input-bordered flex-1 bg-base-100 rounded-lg text-base-content"
                      />
                      <button
                        type="button"
                        disabled={saving || !editingName.trim()}
                        onClick={() => handleSaveEdit(cat.id)}
                        className="btn btn-sm btn-success text-white rounded-lg px-2.5 cursor-pointer"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingId(null)}
                        className="btn btn-sm btn-ghost rounded-lg px-2.5 cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    // โหมดแสดงปกติ
                    <div className="flex items-center gap-2.5">
                      <span className="font-semibold text-base-content">
                        {cat.name}
                      </span>
                      <span className="badge badge-sm badge-ghost text-xs text-base-content/60">
                        {cat.productCount} สินค้า
                      </span>
                    </div>
                  )}

                  {editingId !== cat.id && (
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => startEdit(cat)}
                        className="btn btn-sm btn-ghost text-info hover:bg-info/10 rounded-xl px-2.5 cursor-pointer"
                        title="Edit Category"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteTarget(cat)}
                        className="btn btn-sm btn-ghost text-error hover:bg-error/10 rounded-xl px-2.5 cursor-pointer"
                        title="Delete Category"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal ยืนยันการลบหมวดหมู่ */}
      {deleteTarget && (
        <dialog className="modal modal-open backdrop-blur-xs bg-black/40 animate-in fade-in duration-200">
          <div className="modal-box bg-white border border-neutral-200 shadow-2xl rounded-3xl p-6 sm:p-8 max-w-sm text-center">
            <div className="w-14 h-14 bg-neutral-100 text-neutral-900 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-neutral-200">
              <Trash2 className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="font-bold text-xl text-neutral-900 mb-2">
              Delete Category?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 mb-2 leading-relaxed">
              ต้องการลบหมวดหมู่{" "}
              <span className="font-bold text-neutral-900">
                "{deleteTarget.name}"
              </span>{" "}
              หรือไม่?
            </p>
            {deleteTarget.productCount > 0 && (
              <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 p-2.5 rounded-xl mb-4">
                ⚠️ มีสินค้าอยู่ในหมวดหมู่นี้ {deleteTarget.productCount} รายการ (สินค้าจะไม่ถูกลบ แต่จะถูกตั้งเป็นไม่มีหมวดหมู่)
              </p>
            )}
            <div className="flex gap-2.5 justify-end mt-4">
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

export default CategoryPage;
