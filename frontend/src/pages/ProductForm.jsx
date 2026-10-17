import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ProductForm = ({
  title,
  buttonText,
  formData,
  categories = [],
  handleChange,
  handleSubmit,
  loading = false,
}) => {
  return (
    <div className="max-w-2xl mx-auto py-2">
      {/* Header bar with Back button */}
      <div className="flex items-center justify-between mb-6">
        <Link
          to="/products"
          className="btn btn-sm btn-ghost bg-white hover:bg-neutral-100 border border-neutral-200 shadow-xs rounded-xl text-neutral-800 gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Products</span>
        </Link>
      </div>

      {/* Luxury Soft UI Form Card */}
      <div className="bg-white border border-neutral-200/80 shadow-xs rounded-3xl p-6 sm:p-10 transition-all">
        <h2 className="text-2xl font-extrabold text-neutral-900 mb-6 flex items-center gap-2.5 tracking-tight border-b border-neutral-150 pb-4">
          {title}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Product Name */}
          <div>
            <label className="block text-neutral-800 text-sm font-semibold mb-1.5">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              required
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Minimalist Wireless Headphones"
              className="input input-bordered w-full bg-white border-neutral-200 focus:border-black focus:outline-none rounded-xl text-neutral-900 placeholder:text-neutral-400 text-sm"
            />
          </div>

          {/* Product Category */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-neutral-800 text-sm font-semibold">
                Category (หมวดหมู่สินค้า)
              </label>
              <Link
                to="/categories"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-neutral-600 hover:text-black font-semibold hover:underline"
              >
                + Manage Categories
              </Link>
            </div>
            <select
              name="categoryId"
              value={formData.categoryId || ""}
              onChange={handleChange}
              className="select select-bordered w-full bg-white border-neutral-200 focus:border-black focus:outline-none rounded-xl text-neutral-900 text-sm"
            >
              <option value="">-- No Category (ไม่มีหมวดหมู่) --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Product Price */}
          <div>
            <label className="block text-neutral-800 text-sm font-semibold mb-1.5">
              Price (฿) <span className="text-red-500">*</span>
            </label>
            <input
              required
              type="number"
              name="price"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              placeholder="0.00"
              className="input input-bordered w-full bg-white border-neutral-200 focus:border-black focus:outline-none rounded-xl text-neutral-900 placeholder:text-neutral-400 text-sm"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-neutral-800 text-sm font-semibold mb-1.5">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              placeholder="Describe the product details, features, specifications..."
              className="textarea textarea-bordered w-full bg-white border-neutral-200 focus:border-black focus:outline-none rounded-xl resize-none text-neutral-900 placeholder:text-neutral-400 text-sm"
            ></textarea>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-neutral-800 text-sm font-semibold mb-1.5">
              Image URL (แนบลิงก์รูปภาพ)
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://images.unsplash.com/..."
              className="input input-bordered w-full bg-white border-neutral-200 focus:border-black focus:outline-none rounded-xl text-neutral-900 placeholder:text-neutral-400 text-sm"
            />
          </div>

          {/* Live Image Preview */}
          {formData.image && (
            <div className="p-3.5 bg-neutral-50 border border-neutral-200 rounded-2xl">
              <span className="block text-xs font-semibold text-neutral-500 mb-2">
                Preview Image:
              </span>
              <div className="h-44 rounded-xl overflow-hidden bg-neutral-100 flex items-center justify-center">
                <img
                  src={formData.image}
                  alt="Preview"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-5 border-t border-neutral-150">
            <Link
              to="/products"
              className="btn btn-ghost bg-neutral-100 hover:bg-neutral-200 rounded-xl border border-neutral-200 text-neutral-800 font-medium px-5 text-sm"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="btn bg-black hover:bg-neutral-800 text-white rounded-xl px-7 shadow-xs hover:shadow-md border-none font-semibold text-sm transition-all cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                buttonText
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
