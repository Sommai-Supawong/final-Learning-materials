import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  AlertCircle,
  Image as ImageIcon,
  CheckCircle2,
  Clock,
  Sparkles,
  BookOpen,
  User,
  Calendar,
  Layers,
  FileText,
  Video,
  FileQuestion,
} from "lucide-react";
import { useToast } from "../context/ToastContext";
import {
  getLearningResourceById,
  createLearningResource,
  updateLearningResource,
} from "../services/learningResourceService";

const CATEGORIES = ["บทความ", "วิดีโอ", "แบบฝึกหัด"];

const CATEGORY_DEFAULT_IMAGES = {
  บทความ: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=800&auto=format&fit=crop",
  วิดีโอ: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
  แบบฝึกหัด: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop",
};

const LearningResourceFormPage = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    creator: "",
    category: "บทความ",
    publishedDate: new Date().toISOString().split("T")[0],
    description: "",
    imageUrl: "",
    status: true,
  });

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEdit);
  const [validationErrors, setValidationErrors] = useState({});

  const loadExistingData = useCallback(async () => {
    try {
      setFetchLoading(true);
      const data = await getLearningResourceById(id);
      setFormData({
        title: data.title || "",
        creator: data.creator || "",
        category: data.category || "บทความ",
        publishedDate: data.publishedDate || new Date().toISOString().split("T")[0],
        description: data.description || "",
        imageUrl: data.imageUrl || "",
        status: data.status !== undefined ? Boolean(data.status) : true,
      });
    } catch (err) {
      console.error("Error fetching learning resource:", err);
      showToast(err.message || "Failed to load resource data / ไม่สามารถโหลดข้อมูลเดิมได้", "error");
      navigate("/learning-resources");
    } finally {
      setFetchLoading(false);
    }
  }, [id, navigate, showToast]);

  useEffect(() => {
    if (isEdit) {
      loadExistingData();
    }
  }, [isEdit, loadExistingData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleStatusChange = (statusBool) => {
    setFormData((prev) => ({ ...prev, status: statusBool }));
  };

  const validate = () => {
    const errors = {};

    if (!formData.title || formData.title.trim().length === 0) {
      errors.title = "กรุณาระบุชื่อสื่อการเรียนรู้ (ห้ามเป็นช่องว่างล้วน)";
    } else if (formData.title.trim().length > 150) {
      errors.title = "ชื่อสื่อการเรียนรู้ต้องไม่เกิน 150 ตัวอักษร";
    }

    if (!formData.creator || formData.creator.trim().length === 0) {
      errors.creator = "กรุณาระบุชื่อผู้สร้าง/ผู้รับผิดชอบ (ห้ามเป็นช่องว่างล้วน)";
    } else if (formData.creator.trim().length > 100) {
      errors.creator = "ชื่อผู้สร้างต้องไม่เกิน 100 ตัวอักษร";
    }

    if (!formData.category || !CATEGORIES.includes(formData.category)) {
      errors.category = "กรุณาเลือกหมวดหมู่ที่ถูกต้อง";
    }

    if (!formData.publishedDate) {
      errors.publishedDate = "กรุณาระบุวันที่เผยแพร่";
    }

    if (!formData.description || formData.description.trim().length === 0) {
      errors.description = "กรุณาระบุรายละเอียดสื่อการเรียนรู้ (ห้ามเป็นช่องว่างล้วน)";
    } else if (formData.description.trim().length > 2000) {
      errors.description = "รายละเอียดต้องไม่เกิน 2,000 ตัวอักษร";
    }

    if (formData.imageUrl && formData.imageUrl.trim().length > 0) {
      try {
        new URL(formData.imageUrl.trim());
      } catch {
        errors.imageUrl = "รูปแบบ URL รูปภาพไม่ถูกต้อง";
      }
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      showToast("กรุณาตรวจสอบข้อมูลที่กรอกให้ถูกต้อง (ห้ามเป็นช่องว่างล้วน)", "error");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        title: formData.title.trim(),
        creator: formData.creator.trim(),
        category: formData.category,
        publishedDate: formData.publishedDate,
        description: formData.description.trim(),
        imageUrl: formData.imageUrl ? formData.imageUrl.trim() : null,
        status: Boolean(formData.status),
      };

      if (isEdit) {
        await updateLearningResource(id, payload);
        showToast("Updated resource successfully / บันทึกการแก้ไขสำเร็จ!", "success");
      } else {
        await createLearningResource(payload);
        showToast("Created new resource successfully / เพิ่มสื่อการเรียนรู้สำเร็จ!", "success");
      }
      navigate("/learning-resources");
    } catch (err) {
      console.error("Error saving learning resource:", err);
      showToast(err.message || "Failed to save resource / เกิดข้อผิดพลาดในการบันทึก", "error");
    } finally {
      setLoading(false);
    }
  };

  const previewImage =
    formData.imageUrl && formData.imageUrl.trim().length > 0
      ? formData.imageUrl.trim()
      : CATEGORY_DEFAULT_IMAGES[formData.category] || CATEGORY_DEFAULT_IMAGES["บทความ"];

  if (fetchLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <span className="loading loading-spinner loading-lg text-slate-900"></span>
        <p className="text-sm font-semibold text-slate-500 mt-4">
          Loading resource data / กำลังโหลดข้อมูล...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-12 space-y-8 sm:space-y-10">
      {/* 1. Header Navigation */}
      <div className="flex items-center justify-between">
        <Link
          to="/learning-resources"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-pill text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Resources (กลับหน้ารายการ)</span>
        </Link>
      </div>

      {/* 2. Side-by-Side Studio Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Glass Form Panel (7 Cols) */}
        <div className="lg:col-span-7 glass-panel rounded-[36px] p-6 sm:p-10 space-y-6 shadow-sm border border-white/80">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {isEdit ? "Edit Resource (แก้ไขสื่อการเรียนรู้)" : "Add New Resource (เพิ่มสื่อการเรียนรู้ใหม่)"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              กรอกข้อมูลเพื่อสร้างหรืออัปเดตสื่อการเรียนรู้ตามข้อกำหนด (Topic 5 • ข้อ 5 สื่อการเรียนรู้)
            </p>
          </div>

          <form id="form-learning-resource" onSubmit={handleSubmit} className="space-y-5">
            {/* 1. Title */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
                <span>1. ชื่อสื่อการเรียนรู้ (Title) *</span>
                <span className="text-[11px] font-normal text-slate-400">1-150 ตัวอักษร</span>
              </label>
              <input
                type="text"
                id="input-title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="เช่น พื้นฐานการพัฒนาเว็บด้วย React 19..."
                className={`input w-full bg-white/70 focus:bg-white border-slate-200 focus:border-slate-800 rounded-2xl text-xs sm:text-sm text-slate-900 h-11 transition-all ${
                  validationErrors.title ? "border-rose-500 bg-rose-50/30" : ""
                }`}
              />
              {validationErrors.title && (
                <p className="text-xs text-rose-600 font-medium flex items-center gap-1.5 mt-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{validationErrors.title}</span>
                </p>
              )}
            </div>

            {/* 2. Creator */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
                <span>2. ผู้สร้าง / ผู้รับผิดชอบ (Creator) *</span>
                <span className="text-[11px] font-normal text-slate-400">1-100 ตัวอักษร</span>
              </label>
              <input
                type="text"
                id="input-creator"
                name="creator"
                value={formData.creator}
                onChange={handleChange}
                placeholder="เช่น ดร.สมชาย สุขเกษม, Sarah Jenkins..."
                className={`input w-full bg-white/70 focus:bg-white border-slate-200 focus:border-slate-800 rounded-2xl text-xs sm:text-sm text-slate-900 h-11 transition-all ${
                  validationErrors.creator ? "border-rose-500 bg-rose-50/30" : ""
                }`}
              />
              {validationErrors.creator && (
                <p className="text-xs text-rose-600 font-medium flex items-center gap-1.5 mt-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{validationErrors.creator}</span>
                </p>
              )}
            </div>

            {/* 3 & 4: Category and Published Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  3. หมวดหมู่ (Category) *
                </label>
                <select
                  id="select-category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="select w-full bg-white/70 focus:bg-white border-slate-200 focus:border-slate-800 rounded-2xl text-xs sm:text-sm text-slate-900 font-medium h-11"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  4. วันที่เผยแพร่ (Published Date) *
                </label>
                <input
                  type="date"
                  id="input-published-date"
                  name="publishedDate"
                  value={formData.publishedDate}
                  onChange={handleChange}
                  className="input w-full bg-white/70 focus:bg-white border-slate-200 focus:border-slate-800 rounded-2xl text-xs sm:text-sm text-slate-900 font-mono h-11"
                />
              </div>
            </div>

            {/* 5. External Image URL */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
                <span>5. ลิงก์รูปภาพหน้าปก (Cover Image URL)</span>
                <span className="text-[11px] font-normal text-slate-400">รองรับ External URL</span>
              </label>
              <input
                type="url"
                id="input-image-url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/... (เว้นว่างไว้จะใช้ภาพเริ่มต้นตามหมวดหมู่)"
                className="input w-full bg-white/70 focus:bg-white border-slate-200 focus:border-slate-800 rounded-2xl text-xs sm:text-sm text-slate-900 h-11 font-mono transition-all"
              />
            </div>

            {/* 6. Description */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
                <span>6. รายละเอียดสื่อการเรียนรู้ (Description) *</span>
                <span className="text-[11px] font-normal text-slate-400">1-2,000 ตัวอักษร</span>
              </label>
              <textarea
                id="input-description"
                name="description"
                rows={5}
                value={formData.description}
                onChange={handleChange}
                placeholder="อธิบายสรุปเนื้อหา วัตถุประสงค์ หรือหลักสูตรของสื่อนี้..."
                className={`textarea w-full bg-white/70 focus:bg-white border-slate-200 focus:border-slate-800 rounded-2xl text-xs sm:text-sm text-slate-900 leading-relaxed transition-all p-4 ${
                  validationErrors.description ? "border-rose-500 bg-rose-50/30" : ""
                }`}
              ></textarea>
              {validationErrors.description && (
                <p className="text-xs text-rose-600 font-medium flex items-center gap-1.5 mt-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{validationErrors.description}</span>
                </p>
              )}
            </div>

            {/* 7. Status Radio Options */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                7. สถานะการเผยแพร่ (Status) *
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  id="status-published"
                  onClick={() => handleStatusChange(true)}
                  className={`p-3.5 rounded-2xl border text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    formData.status === true
                      ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                      : "bg-white/70 text-slate-700 border-slate-200 hover:bg-white"
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>เผยแพร่ (Published)</span>
                </button>

                <button
                  type="button"
                  id="status-draft"
                  onClick={() => handleStatusChange(false)}
                  className={`p-3.5 rounded-2xl border text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    formData.status === false
                      ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                      : "bg-white/70 text-slate-700 border-slate-200 hover:bg-white"
                  }`}
                >
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>ฉบับร่าง (Draft)</span>
                </button>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="pt-6 border-t border-slate-200/60 flex items-center justify-end gap-3">
              <button
                type="button"
                id="btn-cancel-form"
                onClick={() => navigate("/learning-resources")}
                className="btn btn-tactile glass-pill hover:bg-white text-slate-700 rounded-full px-6 font-semibold text-xs h-11 cursor-pointer"
              >
                Cancel (ยกเลิก)
              </button>
              <button
                type="submit"
                id="btn-submit-form"
                disabled={loading}
                className="btn btn-tactile bg-slate-900 hover:bg-slate-800 text-white rounded-full px-8 font-semibold text-xs sm:text-sm border-none shadow-sm gap-2 h-11 cursor-pointer"
              >
                {loading ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  <>
                    <Save className="w-4 h-4 text-white" />
                    <span>{isEdit ? "Update Resource (บันทึก)" : "Save Resource (บันทึกข้อมูล)"}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Live Dynamic Preview Studio (5 Cols) */}
        <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-24">
          <div className="flex items-center justify-between px-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-sky-500" />
              <span>Live Card Preview • ตัวอย่างการแสดงผล</span>
            </span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
              Real-time
            </span>
          </div>

          {/* Squircle Preview Card */}
          <div className="glass-card flex flex-col overflow-hidden shadow-md">
            {/* Preview Image with alt="Preview" required by Scenario 10 */}
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 rounded-t-[31px]">
              <img
                src={previewImage}
                alt="Preview"
                className="w-full h-full object-cover transition-all duration-300"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    CATEGORY_DEFAULT_IMAGES[formData.category] || CATEGORY_DEFAULT_IMAGES["บทความ"];
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80"></div>

              {/* Badges Overlay */}
              <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/90 text-white backdrop-blur-md shadow-xs">
                  <span>{formData.category}</span>
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md shadow-xs ${
                    formData.status ? "bg-emerald-500/90 text-white" : "bg-amber-500/90 text-white"
                  }`}
                >
                  <span>{formData.status ? "เผยแพร่แล้ว" : "ฉบับร่าง"}</span>
                </span>
              </div>

              <div className="absolute bottom-3 left-4 right-4 text-white/90 text-xs font-medium flex items-center gap-2">
                <User className="w-3.5 h-3.5" />
                <span className="truncate">{formData.creator || "ชื่อผู้สร้าง / Creator"}</span>
              </div>
            </div>

            {/* Content Preview */}
            <div className="p-6 space-y-3">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                <Calendar className="w-3.5 h-3.5" />
                <span>{formData.publishedDate || "2026-01-01"}</span>
                <span>•</span>
                <span>{formData.category}</span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 line-clamp-2">
                {formData.title || "ชื่อสื่อการเรียนรู้จะปรากฏที่นี่..."}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                {formData.description ||
                  "รายละเอียดและเนื้อหาของสื่อการเรียนรู้จะแสดงผลในบริเวณนี้ตามข้อมูลที่คุณกรอกในแบบฟอร์ม..."}
              </p>

              <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-400">
                <span>Apple Liquid Glass Material</span>
                <span className="font-semibold text-slate-700">Preview Mode</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningResourceFormPage;
