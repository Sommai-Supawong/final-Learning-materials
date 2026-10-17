import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastProvider } from "./context/ToastContext";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import CategoryPage from "./pages/CategoryPage";
import NotFound from "./pages/NotFound";
import "./App.css";

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          {/* ครอบด้วย MainLayout เพื่อให้มี Navbar, Theme ขาวดำ Soft UI และ Footer เสมอ */}
          <Route element={<MainLayout />}>
            {/* หน้าแรกหลัก: New Luxury Homepage พร้อม Product Showcase Grouped by Categories */}
            <Route path="/" element={<HomePage />} />

            {/* หน้ารายการสินค้า/จัดการสินค้า (Catalog & Inventory) */}
            <Route path="/products" element={<ProductPage />} />

            {/* หน้าจัดการหมวดหมู่สินค้า (Category Management CRUD) */}
            <Route path="/categories" element={<CategoryPage />} />

            {/* หน้าเพิ่มสินค้าใหม่ */}
            <Route path="/add" element={<AddProduct />} />
            <Route path="/products/add" element={<Navigate to="/add" replace />} />

            {/* หน้าแก้ไขสินค้าตาม ID */}
            <Route path="/edit/:id" element={<EditProduct />} />
            <Route path="/products/edit/:id" element={<EditProduct />} />

            {/* หน้า 404 เมื่อไม่พบเส้นทางที่ระบุ */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
