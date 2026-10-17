import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ProductPage from "../pages/ProductPage";
import AddProduct from "../pages/AddProduct";
import EditProduct from "../pages/EditProduct";
import NotFound from "../pages/NotFound";

/**
 * รวมการตั้งค่าเส้นทาง (Routes) ทั้งหมดของระบบไว้ที่นี่ที่เดียว
 * ใช้ createBrowserRouter ตามมาตรฐานสมัยใหม่ของ React Router
 */
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <ProductPage />,
      },
      {
        path: "products",
        element: <Navigate to="/" replace />,
      },
      {
        path: "add",
        element: <AddProduct />,
      },
      {
        path: "products/add",
        element: <Navigate to="/add" replace />,
      },
      {
        path: "edit/:id",
        element: <EditProduct />,
      },
      {
        path: "products/edit/:id",
        element: <EditProduct />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
