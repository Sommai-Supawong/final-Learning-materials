import React from "react";
import { Edit2, Trash2, ImageOff } from "lucide-react";

const ProductList = ({ products, onEditClick, onDeleteClick }) => {
  if (products.length === 0) {
    return (
      <div className="col-span-full text-center py-20 bg-white border border-dashed border-neutral-300 rounded-3xl p-8">
        <p className="text-base text-neutral-500 font-medium">
          No products found in this category.
        </p>
      </div>
    );
  }

  return (
    <>
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white border border-neutral-200/80 rounded-2xl overflow-hidden hover:border-neutral-350 hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
        >
          <div>
            {/* Product Image */}
            <div className="h-48 relative overflow-hidden bg-neutral-100 flex items-center justify-center">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-neutral-400">
                  <ImageOff className="w-10 h-10 stroke-[1.5]" />
                  <span className="text-[11px] mt-1 font-medium">No Image</span>
                </div>
              )}

              {/* Minimalist Black Price Badge */}
              <div className="absolute top-3 right-3 badge bg-black text-white text-xs font-bold shadow-xs py-2.5 px-3 rounded-full border-none">
                ฿{Number(product.price).toLocaleString()}
              </div>
            </div>

            {/* Product Meta */}
            <div className="p-5">
              {product.category && (
                <span className="badge badge-sm badge-outline border-neutral-300 text-neutral-600 font-normal mb-1.5 text-[11px]">
                  {product.category.name}
                </span>
              )}
              <h3 className="text-base font-bold text-neutral-900 group-hover:text-black mb-1.5 truncate">
                {product.name}
              </h3>
              <p className="text-xs text-neutral-500 line-clamp-2 h-8 leading-relaxed">
                {product.description || "No description provided."}
              </p>
            </div>
          </div>

          {/* Action Footer */}
          <div className="px-5 pb-5 pt-3 flex items-center justify-between border-t border-neutral-150">
            <span className="text-[11px] text-neutral-400 font-mono">
              #{product.id}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => onEditClick(product)}
                className="btn btn-xs sm:btn-sm btn-ghost hover:bg-neutral-100 text-neutral-800 font-medium rounded-xl border border-neutral-200 transition-all cursor-pointer gap-1"
              >
                <Edit2 className="w-3.5 h-3.5" /> Edit
              </button>
              <button
                type="button"
                onClick={() => onDeleteClick(product.id)}
                className="btn btn-xs sm:btn-sm btn-ghost hover:bg-red-50 text-red-600 font-medium rounded-xl border border-red-200 transition-all cursor-pointer gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductList;
