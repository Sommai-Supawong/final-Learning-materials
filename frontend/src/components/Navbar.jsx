import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Plus, Menu, X, Sparkles, BookOpen } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Exclusively Learning materials navigation links (Strictly zero product links)
  const navLinks = [
    { name: "Showcase (หน้าแรก)", path: "/" },
    { name: "Manage Resources (จัดการสื่อ)", path: "/learning-resources" },
  ];

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-3 sm:top-4 z-50 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 w-full transition-all">
      {/* Floating Dynamic Island Capsule */}
      <nav className="glass-island rounded-full sm:rounded-[28px] px-3.5 sm:px-6 py-2.5 transition-all duration-300">
        <div className="flex items-center justify-between">
          {/* Official Logo & Brand */}
          <Link
            to="/"
            id="navbar-brand"
            className="flex items-center gap-2.5 sm:gap-3 group select-none"
          >
            <div className="relative flex items-center justify-center">
              <img
                id="navbar-logo-img"
                src="/logo/LM-logo-small.png"
                alt="Learning materials Logo"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl object-contain shadow-xs transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-sky-500 rounded-full border-2 border-white animate-pulse"></span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-sm sm:text-base font-bold tracking-tight text-slate-900 leading-none">
                  Learning materials
                </span>
                <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold bg-sky-50 text-sky-700 border border-sky-200/80">
                  สื่อการเรียนรู้
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] font-medium text-slate-400 mt-0.5">
                Topic 5 • Curated Educational Hub
              </span>
            </div>
          </Link>

          {/* Desktop Segmented Glass Capsule */}
          <div className="hidden md:flex items-center gap-1 bg-slate-200/50 backdrop-blur-md p-1 rounded-full border border-white/60 shadow-[inset_0_1px_1px_rgba(0,0,0,0.03)]">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 sm:px-5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  isActive(link.path)
                    ? "bg-white text-slate-900 shadow-sm border border-white/90"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/40"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Action Button & Mobile Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/learning-resources/add"
              id="navbar-btn-add"
              className="btn btn-sm btn-tactile bg-slate-900 hover:bg-slate-800 text-white border-none rounded-full px-4 sm:px-5 font-semibold text-xs sm:text-sm shadow-sm transition-all gap-1.5 cursor-pointer h-9 sm:h-10"
            >
              <Plus className="w-3.5 h-3.5 text-white" />
              <span className="hidden sm:inline">Add Resource (เพิ่มสื่อใหม่)</span>
              <span className="sm:hidden">Add</span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="btn btn-sm btn-ghost btn-circle md:hidden text-slate-700 hover:bg-white/60 rounded-full"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Sheet */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-slate-200/60 space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-200">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
                  isActive(link.path)
                    ? "bg-slate-900 text-white shadow-xs"
                    : "text-slate-700 hover:bg-white/60"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
