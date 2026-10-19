import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastProvider } from "./context/ToastContext";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import LearningResourcePage from "./pages/LearningResourcePage";
import LearningResourceFormPage from "./pages/LearningResourceFormPage";
import NotFound from "./pages/NotFound";
import "./App.css";

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          {/* ครอบด้วย MainLayout เพื่อให้มี Navbar, Theme Soft UI & Liquid Glass และ Footer เสมอ */}
          <Route element={<MainLayout />}>
            {/* หน้าแรก: สื่อการเรียนรู้ Showcase Cards + Search & Filter */}
            <Route path="/" element={<HomePage />} />

            {/* Topic 5: สื่อการเรียนรู้ (Learning Resources Management CRUD) */}
            <Route path="/learning-resources" element={<LearningResourcePage />} />
            <Route path="/learning-resources/add" element={<LearningResourceFormPage />} />
            <Route path="/learning-resources/edit/:id" element={<LearningResourceFormPage />} />

            {/* Redirect legacy routes safely to prevent broken links */}
            <Route path="/products" element={<Navigate to="/" replace />} />
            <Route path="/categories" element={<Navigate to="/" replace />} />
            <Route path="/add" element={<Navigate to="/learning-resources/add" replace />} />

            {/* หน้า 404 เมื่อไม่พบเส้นทางที่ระบุ */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
