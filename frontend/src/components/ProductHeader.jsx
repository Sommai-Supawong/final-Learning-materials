import React from "react";
import { Link } from "react-router-dom";
import { PackageSearch, Plus, Tags } from "lucide-react";

const ProductHeader = ({ onAddClick }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white border border-neutral-200/80 shadow-xs rounded-3xl p-6 sm:p-8 mb-8 transition-all gap-4">
      <div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-black text-white flex items-center justify-center shadow-xs">
            <PackageSearch className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              Catalog & Inventory
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 font-normal">
              จัดการข้อมูลสินค้าทั้งหมดในระบบ เพิ่ม แก้ไข และตรวจสอบรายละเอียด
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2.5 w-full sm:w-auto">
        <Link
          to="/categories"
          className="btn btn-sm sm:btn-md btn-ghost bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 text-neutral-800 rounded-full px-4 sm:px-5 font-medium text-xs sm:text-sm gap-1.5 flex-1 sm:flex-initial"
        >
          <Tags className="w-4 h-4 text-neutral-700" />
          <span>Categories</span>
        </Link>
        <button
          type="button"
          className="btn btn-sm sm:btn-md bg-black hover:bg-neutral-800 text-white rounded-full px-5 sm:px-6 font-medium text-xs sm:text-sm border-none shadow-xs hover:shadow-md transition-all gap-1.5 flex-1 sm:flex-initial cursor-pointer"
          onClick={onAddClick}
        >
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </button>
      </div>
    </div>
  );
};

export default ProductHeader;
