import { Outlet, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <div
      data-theme="light"
      className="min-h-screen relative flex flex-col font-sans text-slate-900 selection:bg-slate-900 selection:text-white overflow-x-hidden bg-[#F8FAFC]"
    >
      {/* Dynamic Ambient Background Mesh (Apple iOS Refraction Canvas) */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Soft Sky Blue Mesh Blob */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[500px] bg-gradient-to-br from-sky-400/12 via-cyan-400/8 to-transparent rounded-full blur-[100px] opacity-80 animate-pulse duration-1000"></div>
        {/* Soft Lavender / Indigo Mesh Blob */}
        <div className="absolute top-32 right-1/4 w-[500px] h-[450px] bg-gradient-to-bl from-indigo-300/10 via-purple-300/6 to-transparent rounded-full blur-[90px] opacity-70"></div>
        {/* Subtle Warm Amber Light Reflection from Logo */}
        <div className="absolute top-1/2 left-1/3 w-[550px] h-[400px] bg-amber-300/6 rounded-full blur-[110px] opacity-50"></div>
        {/* Bottom Ambient Slate Glow */}
        <div className="absolute bottom-10 right-10 w-[600px] h-[450px] bg-sky-200/15 rounded-full blur-[120px] opacity-60"></div>

        {/* Micro-Dot Architectural Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#0f172a08_1px,transparent_1px)] [background-size:24px_24px]"></div>
      </div>

      {/* Floating Dynamic Island Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 w-full overflow-x-hidden">
        <Outlet />
      </main>

      {/* Apple iOS Frosted Glass Footer */}
      <footer className="mt-16 sm:mt-24 border-t border-white/60 bg-white/70 backdrop-blur-2xl py-8 sm:py-12 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-500">
          <div className="flex items-center gap-3.5">
            <img
              src="/logo/LM-logo-small.png"
              alt="Learning materials Logo"
              className="w-10 h-10 rounded-2xl object-contain shadow-xs border border-white/80 bg-white/80 p-1"
            />
            <div>
              <p className="font-bold text-slate-900 text-sm tracking-tight flex items-center gap-2">
                <span>Learning materials</span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200/70">
                  Topic 5
                </span>
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                ข้อ 5 สื่อการเรียนรู้ • Curated Educational Platform
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 font-semibold text-slate-600">
            <Link to="/" className="hover:text-slate-900 transition-colors">
              Showcase (หน้าแรก)
            </Link>
            <Link to="/learning-resources" className="hover:text-slate-900 transition-colors">
              Manage (จัดการสื่อ)
            </Link>
            <Link to="/learning-resources/add" className="hover:text-slate-900 transition-colors">
              + Add Resource (เพิ่มสื่อใหม่)
            </Link>
          </div>

          <div className="text-center sm:text-right text-[11px] text-slate-400">
            <p>© 2026 Learning materials. All rights reserved.</p>
            <p className="text-[10px] text-slate-400/80 mt-0.5">Designed with Liquid Glass & Soft UI</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
