import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Plus, Menu, X, Package, Tags, Sparkles } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Categories", path: "/categories" },
  ];

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo / Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-black text-white flex items-center justify-center font-bold shadow-sm group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-bold tracking-widest uppercase text-neutral-900 leading-none">
                Atelier
              </span>
              <span className="text-[10px] tracking-wider uppercase text-neutral-400 font-medium mt-0.5">
                Luxury Essentials
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 bg-neutral-100/70 p-1.5 rounded-full border border-neutral-200/60">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  isActive(link.path)
                    ? "bg-white text-black shadow-xs font-semibold"
                    : "text-neutral-500 hover:text-black hover:bg-white/50"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Action Button & Mobile Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/add"
              className="btn btn-sm sm:btn-md bg-black hover:bg-neutral-800 text-white border-none rounded-full px-4 sm:px-5 font-medium text-xs sm:text-sm shadow-xs hover:shadow-md transition-all gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Product</span>
              <span className="sm:hidden">Add</span>
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="btn btn-sm btn-ghost btn-circle md:hidden text-neutral-700 hover:bg-neutral-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-200 bg-white px-4 pt-3 pb-5 space-y-1.5 shadow-lg animate-in fade-in slide-in-from-top-2 duration-150">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive(link.path)
                  ? "bg-black text-white font-semibold"
                  : "text-neutral-700 hover:bg-neutral-100"
              }`}
            >
              {link.name === "Home" && <Sparkles className="w-4 h-4" />}
              {link.name === "Products" && <Package className="w-4 h-4" />}
              {link.name === "Categories" && <Tags className="w-4 h-4" />}
              <span>{link.name}</span>
            </Link>
          ))}
          <div className="pt-2 border-t border-neutral-100">
            <Link
              to="/add"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 bg-neutral-900 text-white rounded-xl text-sm font-medium shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Product</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
