import React from "react";
import { Link } from "react-router-dom";
import { Home, AlertCircle } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center py-10">
      <div className="bg-white border border-neutral-200/80 shadow-xs rounded-3xl p-10 max-w-md w-full">
        <div className="w-16 h-16 bg-neutral-100 text-neutral-900 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-neutral-200">
          <AlertCircle className="w-8 h-8 text-neutral-800" />
        </div>
        <h1 className="text-5xl font-black text-neutral-900 mb-2 tracking-tight">404</h1>
        <h2 className="text-lg font-bold text-neutral-800 mb-2">Page Not Found</h2>
        <p className="text-neutral-500 mb-6 text-xs sm:text-sm leading-relaxed">
          ขออภัย ไม่พบหน้าที่คุณกำลังค้นหา หรือหน้านี้อาจถูกย้ายไปแล้ว
        </p>
        <Link
          to="/"
          className="btn bg-black hover:bg-neutral-800 text-white w-full rounded-xl shadow-xs border-none text-sm font-semibold gap-2"
        >
          <Home className="w-4 h-4" />
          <span>Back to Homepage</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
