import { API_BASE_URL } from "../config/api";

/**
 * Service สำหรับเรียกใช้งาน RESTful API ของ สื่อการเรียนรู้ (Learning Resources)
 * ตามข้อกำหนด Section 2 และ Section 5
 */

export const getLearningResources = async ({ search = "", category = "" } = {}) => {
  const queryParams = new URLSearchParams();
  if (search && search.trim()) {
    queryParams.append("search", search.trim());
  }
  if (category && category.trim() && category !== "all") {
    queryParams.append("category", category.trim());
  }

  const queryString = queryParams.toString();
  const url = `${API_BASE_URL}/api/learning-resources${queryString ? `?${queryString}` : ""}`;

  const response = await fetch(url);
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "ไม่สามารถโหลดข้อมูลสื่อการเรียนรู้ได้");
  }
  return await response.json();
};

export const getLearningResourceById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/api/learning-resources/${id}`);
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "ไม่พบสื่อการเรียนรู้ที่ต้องการ");
  }
  return await response.json();
};

export const createLearningResource = async (resourceData) => {
  const response = await fetch(`${API_BASE_URL}/api/learning-resources`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(resourceData),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || "เกิดข้อผิดพลาดในการเพิ่มสื่อการเรียนรู้");
  }
  return data;
};

export const updateLearningResource = async (id, resourceData) => {
  const response = await fetch(`${API_BASE_URL}/api/learning-resources/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(resourceData),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || "เกิดข้อผิดพลาดในการแก้ไขสื่อการเรียนรู้");
  }
  return data;
};

export const deleteLearningResource = async (id) => {
  const response = await fetch(`${API_BASE_URL}/api/learning-resources/${id}`, {
    method: "DELETE",
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || "เกิดข้อผิดพลาดในการลบสื่อการเรียนรู้");
  }
  return data;
};
