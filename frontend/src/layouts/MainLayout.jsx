import React from "react";
import { Outlet, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Sparkles } from "lucide-react";

const MainLayout = () => {
  return (
    <div
      data-theme="light"
      className="min-h-screen bg-[#FAFAFA] text-neutral-900 font-sans flex flex-col selection:bg-neutral-900 selection:text-white"
    >
      {/* Global Luxury Monochrome Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Outlet />
      </main>

      {/* Minimalist Monochrome Footer */}
      <footer className="border-t border-neutral-200/80 bg-white/60 backdrop-blur-sm py-10 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-black text-white flex items-center justify-center font-bold text-[10px]">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <span className="font-semibold text-neutral-900 tracking-wider uppercase">
              Atelier Product Management
            </span>
            <span className="text-neutral-400">| Luxury Monochrome UI</span>
          </div>

          <div className="flex items-center gap-6">
            <Link to="/" className="hover:text-black transition-colors">
              Home
            </Link>
            <Link to="/products" className="hover:text-black transition-colors">
              Products
            </Link>
            <Link to="/categories" className="hover:text-black transition-colors">
              Categories
            </Link>
            <Link to="/add" className="hover:text-black transition-colors">
              + Add Product
            </Link>
          </div>

          <div className="text-neutral-400 text-center sm:text-right">
            © {new Date().getFullYear()} Designed with Soft UI Principles.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
