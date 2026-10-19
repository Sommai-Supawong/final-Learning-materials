import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BookOpen,
  Plus,
  Search,
  Filter,
  Eye,
  Edit3,
  Trash2,
  CheckCircle2,
  Clock,
  AlertCircle,
  X,
  FileText,
  Video,
  FileQuestion,
  User,
  Calendar,
  LayoutGrid,
  Table as TableIcon,
  Sparkles,
  SlidersHorizontal,
} from "lucide-react";
import { useToast } from "../context/ToastContext";
import {
  getLearningResources,
  deleteLearningResource,
} from "../services/learningResourceService";

const CATEGORIES = [
  { id: "all", label: "All Categories (ทุกหมวดหมู่)" },
  { id: "บทความ", label: "Articles (บทความ)" },
  { id: "วิดีโอ", label: "Videos (วิดีโอ)" },
  { id: "แบบฝึกหัด", label: "Worksheets (แบบฝึกหัด)" },
];

const CATEGORY_DEFAULT_IMAGES = {
  บทความ: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=800&auto=format&fit=crop",
  วิดีโอ: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
  แบบฝึกหัด: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop",
};

const LearningResourcePage = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // View Mode: "cards" (Apple Squircle CRUD Cards) or "table" (Frosted Data Table)
  const [viewMode, setViewMode] = useState("cards");

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Modals
  const [detailItem, setDetailItem] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchData = useCallback(
    async (term = searchTerm, cat = selectedCategory) => {
      setLoading(true);
      setError(null);
      try {
        const data = await getLearningResources({ search: term, category: cat });
        setResources(data);
      } catch (err) {
        console.error("Error loading learning resources:", err);
        setError(err.message || "Unable to connect to the server / ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้");
        showToast(err.message || "Error loading learning resources", "error");
      } finally {
        setLoading(false);
      }
    },
    [searchTerm, selectedCategory, showToast]
  );

  useEffect(() => {
    fetchData();
  }, [selectedCategory, fetchData]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchData(searchTerm, selectedCategory);
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    fetchData("", "all");
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteLearningResource(deleteTarget.id);
      showToast(
        `Deleted resource "${deleteTarget.title}" successfully / ลบสื่อการเรียนรู้สำเร็จ!`,
        "success"
      );
      setDeleteTarget(null);
      fetchData();
    } catch (err) {
      console.error("Error deleting resource:", err);
      showToast(err.message || "Failed to delete resource / ลบข้อมูลไม่สำเร็จ", "error");
    } finally {
      setDeleting(false);
    }
  };

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
        <Icon className="w-3 h-3" />
        <span>{cat}</span>
      </span>
    );
  };

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* 1. Header Hub: Title & Controls */}
      <div className="glass-panel rounded-[32px] sm:rounded-[38px] p-6 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-slate-700 text-xs font-bold uppercase tracking-wider">
            <SlidersHorizontal className="w-3.5 h-3.5 text-sky-600" />
            <span>Management Console • แผงจัดการระบบ</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            Manage Learning Materials
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
            จัดการ เพิ่ม ลบ และแก้ไขสื่อการเรียนรู้ในฐานข้อมูล (CRUD Operations)
            พร้อมระบบแสดงผลการ์ดแบบ Apple Squircle และตารางข้อมูล
          </p>
        </div>

        {/* View Mode Toggle & Add Button */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center p-1 rounded-full bg-slate-200/50 backdrop-blur-md border border-white/60">
            <button
              type="button"
              id="view-mode-cards"
              onClick={() => setViewMode("cards")}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                viewMode === "cards"
                  ? "bg-white text-slate-900 shadow-sm border border-white/80"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Cards (การ์ด)</span>
            </button>
            <button
              type="button"
              id="view-mode-table"
              onClick={() => setViewMode("table")}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                viewMode === "table"
                  ? "bg-white text-slate-900 shadow-sm border border-white/80"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Table (ตาราง)</span>
            </button>
          </div>

          <Link
            to="/learning-resources/add"
            id="btn-add-resource"
            className="btn btn-sm btn-tactile bg-slate-900 hover:bg-slate-800 text-white rounded-full px-5 sm:px-6 font-semibold text-xs sm:text-sm border-none shadow-sm gap-2 h-10 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-white" />
            <span>+ Add Resource (เพิ่มสื่อ)</span>
          </Link>
        </div>
      </div>

      {/* 2. Search & Category Filter Bar */}
      <div className="glass-panel rounded-[28px] p-5 sm:p-7 space-y-4 shadow-xs">
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              id="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title, topic, or creator... / ค้นหาตามชื่อ, หัวข้อ หรือผู้สร้าง..."
              className="input w-full pl-11 pr-10 bg-white/70 focus:bg-white border-slate-200 focus:border-slate-800 focus:outline-none rounded-2xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 h-11 transition-all"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <select
            id="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="select bg-white/70 focus:bg-white border-slate-200 focus:border-slate-800 rounded-2xl text-xs sm:text-sm text-slate-800 font-medium h-11 sm:w-48"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </select>

          <button
            type="submit"
            id="btn-search"
            className="btn btn-tactile bg-slate-900 hover:bg-slate-800 text-white rounded-2xl px-6 font-semibold text-xs sm:text-sm border-none shadow-xs h-11 cursor-pointer"
          >
            Search (ค้นหา)
          </button>

          {(searchTerm || selectedCategory !== "all") && (
            <button
              type="button"
              id="btn-reset-filter"
              onClick={handleResetFilters}
              className="btn btn-tactile glass-pill hover:bg-white text-slate-700 rounded-2xl px-5 font-semibold text-xs sm:text-sm h-11 cursor-pointer"
            >
              Reset (ล้างค่า)
            </button>
          )}
        </form>
      </div>

      {/* 3. Main Data Content Display */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <span className="loading loading-spinner loading-lg text-slate-900"></span>
          <p className="text-sm font-semibold text-slate-500 mt-4">
            Loading resources / กำลังโหลดข้อมูล...
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
            <BookOpen className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            ไม่พบสื่อการเรียนรู้ในระบบ
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            No resources found. Click "+ Add Resource" above to create your first learning material.
          </p>
          <Link
            to="/learning-resources/add"
            className="btn btn-tactile bg-slate-900 hover:bg-slate-800 text-white rounded-full px-6 text-xs font-semibold"
          >
            + Create New Resource (เพิ่มสื่อใหม่)
          </Link>
        </div>
      ) : viewMode === "cards" ? (
        /* Cards View: Apple Squircle Management Cards */
        <div
          id="management-cards-grid"
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
                id={`resource-row-${item.id}`}
                className="glass-card flex flex-col overflow-hidden group"
              >
                {/* Cover Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 rounded-t-[31px]">
                  <img
                    src={coverImg}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        CATEGORY_DEFAULT_IMAGES[item.category] || CATEGORY_DEFAULT_IMAGES["บทความ"];
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80"></div>

                  {/* Badges */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 pointer-events-none">
                    {getCategoryBadge(item.category)}
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md shadow-xs ${
                        item.status
                          ? "bg-emerald-500/90 text-white"
                          : "bg-amber-500/90 text-white"
                      }`}
                    >
                      <span>{item.status ? "เผยแพร่แล้ว" : "ฉบับร่าง"}</span>
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4 text-white/90 text-xs font-medium flex items-center gap-2">
                    <User className="w-3.5 h-3.5" />
                    <span className="truncate">{item.creator}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{item.publishedDate}</span>
                      <span>•</span>
                      <span>ID #{item.id}</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-2">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      id={`btn-view-${item.id}`}
                      onClick={() => setDetailItem(item)}
                      className="btn btn-xs sm:btn-sm btn-tactile glass-pill hover:bg-white text-slate-700 rounded-full px-3.5 gap-1.5 h-8 font-semibold"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>ดูข้อมูล</span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      <Link
                        to={`/learning-resources/edit/${item.id}`}
                        id={`btn-edit-${item.id}`}
                        className="btn btn-xs sm:btn-sm btn-tactile bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-full px-3.5 gap-1.5 h-8 font-semibold border border-slate-200/70"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>แก้ไข</span>
                      </Link>

                      <button
                        type="button"
                        id={`btn-delete-${item.id}`}
                        onClick={() => setDeleteTarget(item)}
                        className="btn btn-xs sm:btn-sm btn-tactile bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-full px-3 h-8 font-semibold border border-rose-200/60"
                        title="ลบ (Delete)"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View: Frosted Glass Table */
        <div className="glass-panel rounded-[32px] overflow-hidden shadow-xs border border-white/80">
          <div className="overflow-x-auto">
            <table className="table w-full" id="learning-resources-table">
              <thead className="bg-slate-100/70 border-b border-slate-200 text-slate-700 text-xs uppercase tracking-wider">
                <tr>
                  <th className="py-4 pl-6">ID</th>
                  <th>Cover (หน้าปก)</th>
                  <th>Title & Creator</th>
                  <th>Category</th>
                  <th>Published Date</th>
                  <th>Status</th>
                  <th className="pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {resources.map((item) => (
                  <tr
                    key={item.id}
                    id={`resource-row-${item.id}`}
                    className="hover:bg-white/60 transition-colors"
                  >
                    <td className="font-mono font-bold text-slate-400 pl-6">
                      #{item.id}
                    </td>
                    <td>
                      <img
                        src={
                          item.imageUrl && item.imageUrl.trim().length > 0
                            ? item.imageUrl
                            : CATEGORY_DEFAULT_IMAGES[item.category] || CATEGORY_DEFAULT_IMAGES["บทความ"]
                        }
                        alt={item.title}
                        className="w-12 h-9 rounded-xl object-cover bg-slate-100 shadow-xs"
                      />
                    </td>
                    <td className="max-w-xs">
                      <p className="font-bold text-slate-900 truncate">{item.title}</p>
                      <p className="text-xs text-slate-500 truncate mt-0.5">{item.creator}</p>
                    </td>
                    <td>{getCategoryBadge(item.category)}</td>
                    <td className="text-slate-600 font-mono text-xs">{item.publishedDate}</td>
                    <td>
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          item.status
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {item.status ? "เผยแพร่" : "ร่าง"}
                      </span>
                    </td>
                    <td className="pr-6 text-right space-x-2">
                      <button
                        type="button"
                        id={`table-btn-view-${item.id}`}
                        onClick={() => setDetailItem(item)}
                        className="btn btn-xs btn-ghost btn-circle text-slate-600 hover:text-slate-900"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <Link
                        to={`/learning-resources/edit/${item.id}`}
                        id={`table-btn-edit-${item.id}`}
                        className="btn btn-xs btn-ghost btn-circle text-sky-600 hover:text-sky-800"
                      >
                        <Edit3 className="w-4 h-4" />
                      </Link>
                      <button
                        type="button"
                        id={`table-btn-delete-${item.id}`}
                        onClick={() => setDeleteTarget(item)}
                        className="btn btn-xs btn-ghost btn-circle text-rose-500 hover:text-rose-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. Modal: รายละเอียดสื่อการเรียนรู้ */}
      {detailItem && (
        <div
          id="modal-resource-detail"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xl animate-in fade-in duration-200"
        >
          <div className="glass-panel max-w-lg w-full rounded-[36px] shadow-2xl border border-white/80 p-6 sm:p-8 space-y-5 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-bold text-slate-400">
                  ID #{detailItem.id}
                </span>
                <h3
                  id="detail-title"
                  className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1"
                >
                  {detailItem.title}
                </h3>
              </div>
              <button
                type="button"
                id="btn-close-detail"
                onClick={() => setDetailItem(null)}
                className="btn btn-sm btn-ghost btn-circle text-slate-400 hover:text-slate-800 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">ผู้สร้าง (Creator):</span>
                  <span id="detail-creator" className="font-bold text-slate-900">
                    {detailItem.creator}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">หมวดหมู่ (Category):</span>
                  <span id="detail-category">{getCategoryBadge(detailItem.category)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">วันที่เผยแพร่ (Date):</span>
                  <span id="detail-published-date" className="font-mono text-slate-900">
                    {detailItem.publishedDate}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">สถานะ (Status):</span>
                  <span id="detail-status" className="font-semibold text-slate-900">
                    {detailItem.status ? "เผยแพร่แล้ว (Published)" : "ฉบับร่าง (Draft)"}
                  </span>
                </div>
              </div>

              <div>
                <p className="font-bold text-slate-800 mb-1">รายละเอียด (Description):</p>
                <p
                  id="detail-description"
                  className="p-4 rounded-2xl bg-white border border-slate-100 text-slate-600 leading-relaxed whitespace-pre-line text-xs sm:text-sm"
                >
                  {detailItem.description}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200/70 flex justify-end">
              <button
                type="button"
                onClick={() => setDetailItem(null)}
                className="btn btn-sm btn-tactile bg-slate-900 text-white rounded-full px-6"
              >
                Close (ปิด)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Modal: ยืนยันการลบสื่อการเรียนรู้ */}
      {deleteTarget && (
        <div
          id="modal-resource-delete"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xl animate-in fade-in duration-200"
        >
          <div className="glass-panel max-w-sm w-full rounded-[32px] shadow-2xl border border-white/80 p-6 sm:p-7 text-center space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-3xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto shadow-xs">
              <Trash2 className="w-7 h-7" />
            </div>

            <h3 className="text-lg font-black text-slate-900">
              Confirm Resource Deletion
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Are you sure you want to permanently delete{" "}
              <span className="font-bold text-slate-900" id="delete-target-title">
                "{deleteTarget.title}"
              </span>{" "}
              (ID #{deleteTarget.id})? This action cannot be undone.
            </p>

            <div className="pt-3 flex items-center justify-center gap-3">
              <button
                type="button"
                id="btn-cancel-delete"
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
                className="btn btn-sm btn-tactile glass-pill hover:bg-white text-slate-700 rounded-full px-5 font-semibold text-xs h-10"
              >
                Cancel (ยกเลิก)
              </button>
              <button
                type="button"
                id="btn-confirm-delete"
                onClick={confirmDelete}
                disabled={deleting}
                className="btn btn-sm btn-tactile bg-rose-600 hover:bg-rose-700 text-white rounded-full px-6 font-semibold text-xs border-none shadow-sm gap-2 h-10 cursor-pointer"
              >
                {deleting ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  <span>Delete (ยืนยันลบ)</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearningResourcePage;
