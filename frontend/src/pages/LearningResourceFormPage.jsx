import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save, AlertCircle, Image as ImageIcon, CheckCircle2, Clock } from "lucide-react";
import { useToast } from "../context/ToastContext";
import {
  getLearningResourceById,
  createLearningResource,
  updateLearningResource,
} from "../services/learningResourceService";

const CATEGORIES = ["บทความ", "วิดีโอ", "แบบฝึกหัด"];

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
      errors.title = "กรุณาระบุชื่อสื่อการเรียนรู้ (ห้ามเป็นช่องว่างล้วน) / Title is required and cannot be empty whitespace";
    } else if (formData.title.trim().length > 150) {
      errors.title = "ชื่อสื่อการเรียนรู้ต้องไม่เกิน 150 ตัวอักษร / Title must be 150 characters or fewer";
    }

    if (!formData.creator || formData.creator.trim().length === 0) {
      errors.creator = "กรุณาระบุชื่อผู้สร้าง/ผู้รับผิดชอบ (ห้ามเป็นช่องว่างล้วน) / Creator is required";
    } else if (formData.creator.trim().length > 100) {
      errors.creator = "ชื่อผู้สร้างต้องไม่เกิน 100 ตัวอักษร / Creator must be 100 characters or fewer";
    }

    if (!formData.category || !CATEGORIES.includes(formData.category)) {
      errors.category = "กรุณาเลือกหมวดหมู่ที่ถูกต้อง / Please select a valid category";
    }

    if (!formData.publishedDate) {
      errors.publishedDate = "กรุณาระบุวันที่เผยแพร่ / Published date is required";
    }

    if (!formData.description || formData.description.trim().length === 0) {
      errors.description = "กรุณาระบุรายละเอียดสื่อการเรียนรู้ (ห้ามเป็นช่องว่างล้วน) / Description is required";
    } else if (formData.description.trim().length > 2000) {
      errors.description = "รายละเอียดต้องไม่เกิน 2,000 ตัวอักษร / Description must be 2,000 characters or fewer";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      showToast("Please fill out all required fields correctly / กรุณากรอกข้อมูลให้ครบถ้วนและถูกต้องตามเงื่อนไข", "error");
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
        showToast("Updated learning resource successfully / แก้ไขข้อมูลสื่อการเรียนรู้สำเร็จ!", "success");
      } else {
        await createLearningResource(payload);
        showToast("Created learning resource successfully / เพิ่มสื่อการเรียนรู้ใหม่สำเร็จ!", "success");
      }
      navigate("/learning-resources");
    } catch (err) {
      console.error("Error saving learning resource:", err);
      showToast(err.message || "Failed to save learning resource / เกิดข้อผิดพลาดในการบันทึกข้อมูล", "error");
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center">
        <span className="loading loading-spinner loading-lg text-slate-900"></span>
        <p className="text-slate-500 text-xs sm:text-sm mt-3 font-medium">Loading existing resource data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-2">
      {/* Header bar with Back button */}
      <div className="flex items-center justify-between mb-5">
        <Link
          to="/learning-resources"
          id="btn-back"
          className="btn btn-sm btn-tactile bg-white hover:bg-slate-50 border border-slate-200/90 shadow-xs rounded-xl text-slate-800 gap-2 font-semibold text-xs cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Resources (กลับไปหน้าจัดการ)</span>
        </Link>
      </div>

      {/* Main Rounded Soft UI Form Card with Subtle Liquid Glass */}
      <div className="bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-[0_12px_40px_rgb(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,0.95)] rounded-[28px] sm:rounded-[32px] p-6 sm:p-9 transition-all">
        <div className="flex items-center gap-3.5 border-b border-slate-100 pb-5 mb-6">
          <img
            src="/logo/LM-logo-small.png"
            alt="LM Logo"
            className="w-11 h-11 rounded-2xl object-contain shadow-xs"
          />
          <div>
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">
              Learning materials • Topic 5 • ข้อ 5 สื่อการเรียนรู้
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {isEdit ? "Edit Learning Resource (แก้ไขสื่อการเรียนรู้)" : "Add New Resource (เพิ่มสื่อการเรียนรู้ใหม่)"}
            </h2>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5" id="resource-form">
          {/* Title */}
          <div>
            <label className="block text-slate-800 text-xs sm:text-sm font-semibold mb-1.5">
              Title (ชื่อสื่อการเรียนรู้) <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              id="input-title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Modern Full-Stack Web Architecture / พื้นฐานการพัฒนาเว็บ"
              maxLength={150}
              className={`input input-bordered w-full bg-slate-50 focus:bg-white border-slate-200 focus:border-slate-900 focus:outline-none rounded-2xl text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm h-11 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)] ${
                validationErrors.title ? "border-rose-500 bg-rose-50/30" : ""
              }`}
            />
            {validationErrors.title && (
              <span className="text-rose-600 text-xs mt-1.5 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                {validationErrors.title}
              </span>
            )}
            <span className="text-[11px] text-slate-400 block text-right mt-1">
              {formData.title.length}/150 characters
            </span>
          </div>

          {/* Grid: Creator & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Creator */}
            <div>
              <label className="block text-slate-800 text-xs sm:text-sm font-semibold mb-1.5">
                Creator (ผู้สร้าง/ผู้รับผิดชอบ) <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="creator"
                id="input-creator"
                value={formData.creator}
                onChange={handleChange}
                placeholder="e.g. Dr. Somchai Suksom / ดร.สมชาย"
                maxLength={100}
                className={`input input-bordered w-full bg-slate-50 focus:bg-white border-slate-200 focus:border-slate-900 focus:outline-none rounded-2xl text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm h-11 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)] ${
                  validationErrors.creator ? "border-rose-500 bg-rose-50/30" : ""
                }`}
              />
              {validationErrors.creator && (
                <span className="text-rose-600 text-xs mt-1.5 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {validationErrors.creator}
                </span>
              )}
            </div>

            {/* Category Dropdown */}
            <div>
              <label className="block text-slate-800 text-xs sm:text-sm font-semibold mb-1.5">
                Category (หมวดหมู่) <span className="text-rose-500">*</span>
              </label>
              <select
                name="category"
                id="select-category"
                value={formData.category}
                onChange={handleChange}
                className="select select-bordered w-full bg-slate-50 focus:bg-white border-slate-200 focus:border-slate-900 focus:outline-none rounded-2xl text-slate-900 text-xs sm:text-sm font-semibold h-11 min-h-0"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Grid: Published Date & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Published Date */}
            <div>
              <label className="block text-slate-800 text-xs sm:text-sm font-semibold mb-1.5">
                Published Date (วันที่เผยแพร่) <span className="text-rose-500">*</span>
              </label>
              <input
                type="date"
                name="publishedDate"
                id="input-published-date"
                value={formData.publishedDate}
                onChange={handleChange}
                className="input input-bordered w-full bg-slate-50 focus:bg-white border-slate-200 focus:border-slate-900 focus:outline-none rounded-2xl text-slate-900 text-xs sm:text-sm font-mono h-11"
              />
            </div>

            {/* Status Radio/Toggle */}
            <div>
              <label className="block text-slate-800 text-xs sm:text-sm font-semibold mb-1.5">
                Status (สถานะการเผยแพร่)
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  id="status-published"
                  onClick={() => handleStatusChange(true)}
                  className={`flex-1 py-2.5 px-3 rounded-2xl border text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer btn-tactile ${
                    formData.status
                      ? "bg-slate-900 border-slate-900 text-white shadow-xs"
                      : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Published (เผยแพร่)</span>
                </button>
                <button
                  type="button"
                  id="status-draft"
                  onClick={() => handleStatusChange(false)}
                  className={`flex-1 py-2.5 px-3 rounded-2xl border text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer btn-tactile ${
                    !formData.status
                      ? "bg-slate-900 border-slate-900 text-white shadow-xs"
                      : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Draft (ฉบับร่าง)</span>
                </button>
              </div>
            </div>
          </div>

          {/* External Image URL with Live Preview */}
          <div>
            <label className="block text-slate-800 text-xs sm:text-sm font-semibold mb-1.5">
              Cover Image URL (ลิงก์รูปภาพประกอบภายนอก)
            </label>
            <div className="relative">
              <ImageIcon className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="url"
                name="imageUrl"
                id="input-image-url"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/photo-..."
                className="input input-bordered w-full pl-11 bg-slate-50 focus:bg-white border-slate-200 focus:border-slate-900 focus:outline-none rounded-2xl text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm h-11 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]"
              />
            </div>

            {/* Live Image Preview */}
            {formData.imageUrl && (
              <div className="mt-3 p-3.5 bg-slate-50 border border-slate-200/90 rounded-2xl">
                <span className="block text-[11px] font-bold text-slate-500 mb-2 uppercase tracking-wider">
                  Live Cover Preview (ตัวอย่างรูปภาพ):
                </span>
                <div className="h-44 rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center border border-slate-200 shadow-xs">
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-slate-800 text-xs sm:text-sm font-semibold mb-1.5">
              Description (คำอธิบาย / รายละเอียดสื่อ) <span className="text-rose-500">*</span>
            </label>
            <textarea
              name="description"
              id="input-description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              maxLength={2000}
              placeholder="Enter comprehensive description, objectives, and key learning topics..."
              className={`textarea textarea-bordered w-full bg-slate-50 focus:bg-white border-slate-200 focus:border-slate-900 focus:outline-none rounded-2xl text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm resize-none shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)] ${
                validationErrors.description ? "border-rose-500 bg-rose-50/30" : ""
              }`}
            ></textarea>
            {validationErrors.description && (
              <span className="text-rose-600 text-xs mt-1.5 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                {validationErrors.description}
              </span>
            )}
            <span className="text-[11px] text-slate-400 block text-right mt-1">
              {formData.description.length}/2,000 characters
            </span>
          </div>

          {/* Buttons: Cancel & Submit */}
          <div className="flex justify-end gap-3 pt-5 border-t border-slate-100">
            <button
              type="button"
              id="btn-cancel-form"
              onClick={() => navigate("/learning-resources")}
              className="btn btn-sm btn-tactile btn-ghost bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-700 font-semibold px-5 text-xs cursor-pointer h-10"
            >
              Cancel (ยกเลิก)
            </button>
            <button
              type="submit"
              id="btn-submit-form"
              disabled={loading}
              className="btn btn-sm btn-tactile bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-7 shadow-xs border-none font-semibold text-xs transition-all cursor-pointer disabled:opacity-50 gap-2 h-10"
            >
              {loading ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5 text-white" />
                  <span>{isEdit ? "Update Resource (บันทึกการแก้ไข)" : "Save Resource (เพิ่มสื่อการเรียนรู้)"}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LearningResourceFormPage;
