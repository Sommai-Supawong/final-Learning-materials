import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BookOpen,
  Search,
  Filter,
  Calendar,
  User,
  ArrowRight,
  Eye,
  CheckCircle2,
  Clock,
  Layers,
  FileText,
  Video,
  FileQuestion,
  X,
  AlertCircle,
  SlidersHorizontal,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { getLearningResources } from "../services/learningResourceService";
import { useToast } from "../context/ToastContext";

const CATEGORIES = [
  { id: "all", label: "All (ทั้งหมด)", icon: Layers },
  { id: "บทความ", label: "Articles (บทความ)", icon: FileText },
  { id: "วิดีโอ", label: "Videos (วิดีโอ)", icon: Video },
  { id: "แบบฝึกหัด", label: "Worksheets (แบบฝึกหัด)", icon: FileQuestion },
];

const CATEGORY_DEFAULT_IMAGES = {
  บทความ: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=800&auto=format&fit=crop",
  วิดีโอ: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
  แบบฝึกหัด: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop",
};

const HomePage = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search & Filter
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Detailed Reading View Modal
  const [readingItem, setReadingItem] = useState(null);

  const fetchData = useCallback(
    async (term = searchTerm, cat = selectedCategory) => {
      setLoading(true);
      setError(null);
      try {
        const data = await getLearningResources({ search: term, category: cat });
        setResources(data);
      } catch (err) {
        console.error("Error loading resources:", err);
        setError(err.message || "Unable to connect to the server / ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
        showToast(err.message || "Error loading resources", "error");
      } finally {
        setLoading(false);
      }
    },
    [searchTerm, selectedCategory, showToast]
  );

  useEffect(() => {
    fetchData();
  }, [selectedCategory, fetchData]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchData(searchTerm, selectedCategory);
  };

  const handleResetSearch = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    fetchData("", "all");
  };

  // Stats Counters
  const totalCount = resources.length;
  const articleCount = resources.filter((r) => r.category === "บทความ").length;
  const videoCount = resources.filter((r) => r.category === "วิดีโอ").length;
  const exerciseCount = resources.filter((r) => r.category === "แบบฝึกหัด").length;

  const getCategoryBadge = (cat) => {
    let Icon = FileText;
    let badgeColor = "bg-sky-500/90 text-white";
    if (cat === "วิดีโอ") {
      Icon = Video;
      badgeColor = "bg-indigo-500/90 text-white";
    }
    if (cat === "แบบฝึกหัด") {
      Icon = FileQuestion;
      badgeColor = "bg-emerald-600/90 text-white";
    }

    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md shadow-xs ${badgeColor}`}
      >
        <Icon className="w-3.5 h-3.5" />
        <span>{cat}</span>
      </span>
    );
  };

  return (
    <div className="space-y-10 sm:space-y-14">
      {/* 1. Bento Hero Spotlight Section (Liquid Glass & Asymmetry) */}
      <section className="relative overflow-hidden glass-panel rounded-[32px] sm:rounded-[44px] p-6 sm:p-10 lg:p-14 transition-all duration-300">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 space-y-6">
            {/* Pill Header Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-pill text-slate-800 text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping"></span>
              <img src="/logo/LM-logo-small.png" alt="LM Logo" className="w-4 h-4 object-contain rounded" />
              <span>Topic 5 • ข้อ 5 สื่อการเรียนรู้</span>
            </div>

            {/* Display Headline */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
                Learning materials
              </h1>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-slate-900 via-sky-800 to-slate-700 bg-clip-text text-transparent">
                คลังสื่อการเรียนรู้ดิจิทัล • Curated Educational Hub
              </p>
            </div>

            {/* Editorial Lead Description */}
            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-2xl">
              ศูนย์รวมสื่อการเรียนการสอน บทความวิชาการ วิดีโอบรรยาย และแบบฝึกหัดภาคปฏิบัติ
              ออกแบบตามหลักสถาปัตยกรรม Apple iOS Liquid Glass ผสานสุนทรียภาพแห่งความโปร่งใส
              ความนุ่มนวลของพื้นผิว Soft UI และความแม่นยำของระบบจัดการข้อมูล
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <a
                href="#explore-resources"
                id="btn-explore"
                className="btn btn-sm sm:btn-md btn-tactile bg-slate-900 hover:bg-slate-800 text-white rounded-full px-6 sm:px-8 font-semibold text-xs sm:text-sm border-none shadow-sm gap-2 cursor-pointer h-11"
              >
                <span>Explore Resources (สำรวจสื่อ)</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </a>
              <Link
                to="/learning-resources"
                id="btn-manage-crud"
                className="btn btn-sm sm:btn-md btn-tactile glass-pill hover:bg-white text-slate-800 rounded-full px-6 sm:px-7 font-semibold text-xs sm:text-sm shadow-xs gap-2 h-11"
              >
                <SlidersHorizontal className="w-4 h-4 text-slate-700" />
                <span>Manage CRUD (จัดการสื่อ)</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Floating Glass Stat Matrix */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3.5 sm:gap-4">
            {/* Total Card */}
            <div className="glass-card p-5 sm:p-6 rounded-[28px] relative overflow-hidden group">
              <div className="w-10 h-10 rounded-2xl bg-sky-100/80 flex items-center justify-center text-sky-700 mb-3 shadow-xs">
                <BookOpen className="w-5 h-5" />
              </div>
              <p className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight" id="stat-total">
                {totalCount}
              </p>
              <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">
                Total Resources
              </p>
              <span className="text-[11px] text-slate-400">สื่อทั้งหมดในคลัง</span>
            </div>

            {/* Articles Card */}
            <div className="glass-card p-5 sm:p-6 rounded-[28px] relative overflow-hidden group">
              <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-700 mb-3 shadow-xs">
                <FileText className="w-5 h-5" />
              </div>
              <p className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight" id="stat-articles">
                {articleCount}
              </p>
              <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">
                Articles
              </p>
              <span className="text-[11px] text-slate-400">บทความวิชาการ</span>
            </div>

            {/* Videos Card */}
            <div className="glass-card p-5 sm:p-6 rounded-[28px] relative overflow-hidden group">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-3 shadow-xs">
                <Video className="w-5 h-5" />
              </div>
              <p className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight" id="stat-videos">
                {videoCount}
              </p>
              <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">
                Videos
              </p>
              <span className="text-[11px] text-slate-400">วิดีโอบรรยาย</span>
            </div>

            {/* Worksheets Card */}
            <div className="glass-card p-5 sm:p-6 rounded-[28px] relative overflow-hidden group">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-3 shadow-xs">
                <FileQuestion className="w-5 h-5" />
              </div>
              <p className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight" id="stat-exercises">
                {exerciseCount}
              </p>
              <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">
                Worksheets
              </p>
              <span className="text-[11px] text-slate-400">แบบฝึกหัดเตรียมสอบ</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Floating Control Dock: Search & Segmented Category Pills */}
      <section
        id="explore-resources"
        className="glass-panel rounded-[32px] p-5 sm:p-8 space-y-6 scroll-mt-24 shadow-sm"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
              <span>Search & Filter Resources</span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                ค้นหาและกรองสื่อ
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              เลือกดูตามหมวดหมู่ หรือพิมพ์คำค้นหาเพื่อเข้าถึงเนื้อหาที่ต้องการได้ทันที
            </p>
          </div>

          <Link
            to="/learning-resources/add"
            id="home-btn-add"
            className="btn btn-sm btn-tactile bg-slate-900 hover:bg-slate-800 text-white border-none rounded-full px-5 font-semibold text-xs shadow-xs gap-1.5 self-start sm:self-auto cursor-pointer h-10"
          >
            <span>+ Add Resource (เพิ่มสื่อใหม่)</span>
          </Link>
        </div>

        {/* Search Input & Action Dock */}
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              id="home-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search resources by title, topic, or creator... / ค้นหาสื่อการเรียนรู้..."
              className="input w-full pl-11 pr-10 bg-white/70 focus:bg-white border-slate-200 focus:border-slate-800 focus:outline-none rounded-2xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 h-12 transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                aria-label="Clear search input"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            type="submit"
            id="home-btn-search"
            className="btn btn-tactile bg-slate-900 hover:bg-slate-800 text-white rounded-2xl px-7 font-semibold text-xs sm:text-sm border-none shadow-xs gap-2 h-12 cursor-pointer"
          >
            <Search className="w-4 h-4 text-white" />
            <span>Search (ค้นหา)</span>
          </button>

          {(searchTerm || selectedCategory !== "all") && (
            <button
              type="button"
              id="home-btn-reset"
              onClick={handleResetSearch}
              className="btn btn-tactile glass-pill hover:bg-white text-slate-700 rounded-2xl px-5 font-semibold text-xs sm:text-sm shadow-xs h-12 cursor-pointer"
            >
              Reset Filters (ล้างค่า)
            </button>
          )}
        </form>

        {/* Category Pills Switcher */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200/60">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                id={`cat-filter-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`btn btn-sm btn-tactile rounded-full px-4 sm:px-5 font-semibold text-xs transition-all gap-1.5 h-9 cursor-pointer ${
                  isSelected
                    ? "bg-slate-900 text-white shadow-xs border-none"
                    : "glass-pill text-slate-600 hover:text-slate-900 hover:bg-white/80"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Squircle Glass Resource Cards Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Featured Learning Resources
            </h2>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-200/70 text-slate-700">
              {resources.length} รายการ
            </span>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <span className="loading loading-spinner loading-lg text-slate-900"></span>
            <p className="text-sm font-semibold text-slate-500 mt-4">
              Loading learning resources / กำลังโหลดสื่อการเรียนรู้...
            </p>
          </div>
        ) : error ? (
          <div className="glass-panel p-8 rounded-3xl text-center space-y-4 max-w-lg mx-auto">
            <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
            <h3 className="text-lg font-bold text-slate-900">{error}</h3>
            <button
              onClick={() => fetchData()}
              className="btn btn-sm btn-tactile bg-slate-900 text-white rounded-full px-6"
            >
              Retry (ลองใหม่อีกครั้ง)
            </button>
          </div>
        ) : resources.length === 0 ? (
          <div className="glass-panel p-12 sm:p-16 rounded-[32px] text-center max-w-xl mx-auto space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-slate-100 flex items-center justify-center text-slate-400 mx-auto">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              ไม่พบสื่อการเรียนรู้ที่ตรงกับเงื่อนไข
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              No learning materials matched your search query or category filter. Try refining keywords or clearing filters.
            </p>
            <button
              type="button"
              onClick={handleResetSearch}
              className="btn btn-tactile bg-slate-900 hover:bg-slate-800 text-white rounded-full px-6 text-xs font-semibold"
            >
              Reset Filters (แสดงทั้งหมด)
            </button>
          </div>
        ) : (
          <div
            id="resources-cards-grid"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {resources.map((item) => {
              const coverImg =
                item.imageUrl && item.imageUrl.trim().length > 0
                  ? item.imageUrl
                  : CATEGORY_DEFAULT_IMAGES[item.category] || CATEGORY_DEFAULT_IMAGES["บทความ"];

              return (
                <div
                  key={item.id}
                  id={`resource-card-${item.id}`}
                  className="glass-card flex flex-col overflow-hidden group"
                >
                  {/* Image Cover Container */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 rounded-t-[31px]">
                    <img
                      src={coverImg}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          CATEGORY_DEFAULT_IMAGES[item.category] || CATEGORY_DEFAULT_IMAGES["บทความ"];
                      }}
                    />

                    {/* Gradient Overlay for Legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80"></div>

                    {/* Top Floating Glass Badges */}
                    <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 pointer-events-none">
                      {getCategoryBadge(item.category)}
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md shadow-xs ${
                          item.status
                            ? "bg-emerald-500/90 text-white"
                            : "bg-amber-500/90 text-white"
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                        <span>{item.status ? "เผยแพร่แล้ว" : "ฉบับร่าง"}</span>
                      </span>
                    </div>

                    {/* Bottom Image Overlay: Author snippet */}
                    <div className="absolute bottom-3 left-4 right-4 flex items-center gap-2 text-white/90 text-xs font-medium">
                      <User className="w-3.5 h-3.5 text-white/80" />
                      <span className="truncate">{item.creator}</span>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2.5">
                      {/* Publication Date */}
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{item.publishedDate}</span>
                        <span className="text-slate-300">•</span>
                        <span>#{item.id}</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-2 leading-snug">
                        {item.title}
                      </h3>

                      {/* Description Clamp */}
                      <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Card Actions Footer */}
                    <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between gap-3">
                      <button
                        type="button"
                        id={`btn-read-card-${item.id}`}
                        onClick={() => setReadingItem(item)}
                        className="btn btn-sm btn-tactile bg-slate-900 hover:bg-slate-800 text-white rounded-full px-5 font-semibold text-xs gap-1.5 h-9 cursor-pointer border-none shadow-xs"
                      >
                        <Eye className="w-3.5 h-3.5 text-white" />
                        <span>อ่านรายละเอียด</span>
                      </button>

                      <Link
                        to={`/learning-resources/edit/${item.id}`}
                        className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
                      >
                        Edit (แก้ไข)
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 4. Detailed Reading View Modal (Apple iOS Glass Sheet) */}
      {readingItem && (
        <div
          id="modal-reading-view"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xl animate-in fade-in duration-200"
        >
          <div className="glass-panel max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-[36px] shadow-2xl border border-white/80 p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  {getCategoryBadge(readingItem.category)}
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                      readingItem.status
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                        : "bg-amber-100 text-amber-800 border border-amber-200"
                    }`}
                  >
                    <span>{readingItem.status ? "เผยแพร่แล้ว (Published)" : "ฉบับร่าง (Draft)"}</span>
                  </span>
                </div>
                <h3
                  id="reading-modal-title"
                  className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight mt-2"
                >
                  {readingItem.title}
                </h3>
              </div>

              <button
                type="button"
                id="btn-close-reading"
                onClick={() => setReadingItem(null)}
                className="btn btn-sm btn-ghost btn-circle text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-full"
                aria-label="Close reading view"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cover Image in Reading View */}
            <div className="relative aspect-video rounded-3xl overflow-hidden bg-slate-100 shadow-inner">
              <img
                src={
                  readingItem.imageUrl && readingItem.imageUrl.trim().length > 0
                    ? readingItem.imageUrl
                    : CATEGORY_DEFAULT_IMAGES[readingItem.category] || CATEGORY_DEFAULT_IMAGES["บทความ"]
                }
                alt={readingItem.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Author & Publication Metadata Pill */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/70 text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-700">
                  <User className="w-4 h-4 text-slate-700" />
                </div>
                <div>
                  <p className="text-slate-400 font-medium">ผู้สร้าง / เจ้าของสื่อ (Creator)</p>
                  <p id="reading-modal-creator" className="text-slate-900 font-bold text-sm">
                    {readingItem.creator}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-right">
                <Calendar className="w-4 h-4 text-slate-400" />
                <div>
                  <p className="text-slate-400 font-medium">วันที่เผยแพร่ (Published Date)</p>
                  <p id="reading-modal-date" className="text-slate-900 font-bold text-sm">
                    {readingItem.publishedDate}
                  </p>
                </div>
              </div>
            </div>

            {/* Full Content / Description */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                รายละเอียดและเนื้อหา (Content & Overview)
              </h4>
              <div
                id="reading-modal-description"
                className="text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-line p-5 rounded-2xl bg-white border border-slate-100 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]"
              >
                {readingItem.description}
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="pt-4 border-t border-slate-200/70 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setReadingItem(null)}
                className="btn btn-sm btn-tactile bg-slate-900 hover:bg-slate-800 text-white rounded-full px-6 font-semibold text-xs h-10"
              >
                Close (ปิดหน้าต่าง)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
