# Final Full-Stack Exam - Learning Resources (ชุดโจทย์ที่ 5: สื่อการเรียนรู้)
> คลังสื่อการเรียนรู้ดิจิทัลระดับองค์กร (Curated Educational Resources Platform)  
> สถาปัตยกรรม Full-Stack ทันสมัย: React 19 + Vite (Frontend) และ Node.js + Express + Sequelize ORM (Backend) ร่วมกับ PostgreSQL Database

---

## 🌐 Live Production & Demonstration Links (ลิงก์ระบบและผลงาน)

| บริการ / ทรัพยากร | รายละเอียด | ลิงก์เข้าใช้งาน (Direct Link) |
| :--- | :--- | :--- |
| 🚀 **Live Web Application (Frontend)** | เว็บแอปพลิเคชันที่ Deploy จริงบน Vercel | [https://final-learning-materials.vercel.app/](https://final-learning-materials.vercel.app/) |
| 🎬 **Video Demonstration (YouTube)** | วิดีโอนำเสนอระบบและการสาธิตฟังก์ชันการทำงาน | [https://youtu.be/nw1R3mcQo2A](https://youtu.be/nw1R3mcQo2A?si=gKj2mg_TElJ-ePBC) |
| ⚙️ **Backend Service (Render Dashboard)** | เซิร์ฟเวอร์ API บน Render (Service Deploys) | [Render Deployment Dashboard](https://dashboard.render.com/web/srv-dbau6n61egvs73c5h120/deploys) |
| 🐘 **Cloud Database (Neon PostgreSQL)** | ฐานข้อมูล Serverless Postgres บน Neon / Vercel Integration | [Neon Storage Guides & Dashboard](https://vercel.com/sommais-projects/~/integrations/neon/icfg_5MvR5HfLLacwjl5xr1hgHCXc/resources/storage/store_enVQppdaTudYi6Wn/guides) |

---

## 1. Project Title & Description (บทนำและรายละเอียดโครงการ)
ระบบบริหารจัดการสื่อการเรียนรู้ (**Learning materials - Topic 5 / ชุดที่ 5 สื่อการเรียนรู้**) ถูกพัฒนาขึ้นเพื่อใช้เป็นแพลตฟอร์มการจัดการและเผยแพร่สื่อดิจิทัล ได้แก่ บทความวิชาการ (Articles), วิดีโอบรรยาย (Videos) และแบบฝึกหัดทบทวน (Worksheets) 

ระบบได้รับการออกแบบโครงสร้างทางสถาปัตยกรรม Frontend ใหม่ทั้งหมดด้วยเอกลักษณ์เฉพาะตัวสไตล์ **Apple iOS Liquid Glassmorphism & Soft UI** พร้อมเลย์เอาต์ **Bento Hero Spotlight**, **Floating Dynamic Island Capsule**, **Side-by-Side Live Preview Studio**, และรองรับการค้นหา (Search) และตัวกรองหมวดหมู่ (Category Filter) แบบเรียลไทม์ พร้อมการรับประกันคุณภาพด้วยชุดทดสอบ End-to-End (E2E) ผ่าน Playwright ครบ 100%

---

## 2. Tech Stack (เทคโนโลยีที่ใช้)

### Frontend
- **Framework & Tooling:** React 19, Vite, React Router DOM (v7)
- **Styling & UI Architecture:** Tailwind CSS, DaisyUI (Customized), Apple Liquid Glass (`backdrop-filter: blur(28px) saturate(190%)`), Continuous Squircle Geometry (`border-radius: 32px`)
- **Icons & Typography:** Lucide React, Kanit Font (Display), SF Pro / Inter (Metadata)
- **Testing:** Playwright Test Suite (Chromium headless browser automation)
- **State & Context:** React Hooks, Custom Toast Notification Context

### Backend
- **Runtime & Framework:** Node.js, Express.js (RESTful API architecture)
- **Database & ORM:** PostgreSQL, Sequelize ORM (Strict Validation & Data Integrity)
- **Utilities:** Dotenv (Environment Management), CORS (Cross-Origin Resource Sharing)
- **Architecture Pattern:** Modular Controller-Model-Router (Separation of Concerns)

---

## 3. Database Schema: `learning_resources`
ตารางหลัก `learning_resources` ในฐานข้อมูล PostgreSQL มีโครงสร้างฟิลด์และเงื่อนไข (Constraints) ดังนี้:

| Field | Data Type | Constraint | Description |
| :--- | :--- | :--- | :--- |
| `id` | `INTEGER` | Primary Key, Auto Increment | รหัสประจำสื่อการเรียนรู้ |
| `title` | `VARCHAR(150)` | NOT NULL, 1-150 Chars, Not Whitespace Only | ชื่อสื่อการเรียนรู้ |
| `creator` | `VARCHAR(100)` | NOT NULL, 1-100 Chars, Not Whitespace Only | ชื่อผู้สร้าง / ผู้รับผิดชอบ |
| `category` | `VARCHAR(50)` | NOT NULL, Enum: `'บทความ'`, `'วิดีโอ'`, `'แบบฝึกหัด'` | หมวดหมู่ของสื่อ |
| `publishedDate`| `DATEONLY` | NOT NULL, Format: `YYYY-MM-DD` | วันที่เผยแพร่สื่อการเรียนรู้ |
| `description` | `TEXT` | NOT NULL, 1-2000 Chars, Not Whitespace Only | รายละเอียดเนื้อหาของสื่อ |
| `imageUrl` | `TEXT` | NULLABLE, Valid URL String | ลิงก์รูปภาพหน้าปกภายนอก (External Image) |
| `status` | `BOOLEAN` | NOT NULL, Default: `true` | สถานะ (`true` = เผยแพร่, `false` = ฉบับร่าง) |
| `createdAt` | `TIMESTAMP` | Auto Generated | วันเวลาที่สร้างข้อมูล |
| `updatedAt` | `TIMESTAMP` | Auto Generated | วันเวลาที่อัปเดตข้อมูลล่าสุด |

---

## 4. RESTful API Endpoints Specification

Base Path: `/api/learning-resources`

| Method | Endpoint | Description | Query / Body Parameters | Expected Status Codes |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/learning-resources` | ดึงรายการสื่อทั้งหมด พร้อมค้นหาและกรอง | `?search=` (keyword/title)<br>`?category=` (`บทความ`, `วิดีโอ`, `แบบฝึกหัด`) | `200 OK` (Array) |
| `GET` | `/api/learning-resources/:id` | ดึงข้อมูลสื่อรายชิ้นตาม ID | Path Parameter: `id` (Positive Integer) | `200 OK`<br>`400 Bad Request` (Invalid ID)<br>`404 Not Found` |
| `POST` | `/api/learning-resources` | เพิ่มสื่อการเรียนรู้ใหม่ | JSON Body: `title`, `creator`, `category`, `publishedDate`, `description`, `imageUrl`, `status` | `201 Created`<br>`400 Bad Request` (Validation Error)<br>`500 Internal Error` |
| `PUT` | `/api/learning-resources/:id` | แก้ไขข้อมูลสื่อการเรียนรู้ตาม ID | Path Parameter: `id`<br>JSON Body: ฟิลด์ที่ต้องการแก้ไข | `200 OK`<br>`400 Bad Request`<br>`404 Not Found` |
| `DELETE` | `/api/learning-resources/:id` | ลบสื่อการเรียนรู้ออกจากฐานข้อมูล | Path Parameter: `id` | `200 OK`<br>`400 Bad Request`<br>`404 Not Found` |
| `GET` | `/health` / `/api/health` | ตรวจสอบสถานะการทำงานของเซิร์ฟเวอร์ | None | `200 OK` (JSON status) |

---

## 5. Setup & Run Instructions (คำแนะนำการติดตั้งและรันระบบ)

### 5.1 การเตรียมความพร้อมเบื้องต้น (Prerequisites)
- Node.js (v18 หรือใหม่กว่า)
- Docker Desktop (สำหรับรัน PostgreSQL Container) หรือ Local/Cloud PostgreSQL

### 5.2 ตั้งค่าฐานข้อมูล (Database Setup via Docker)
รันฐานข้อมูล PostgreSQL ผ่าน Docker Compose ในไดเรกทอรีราก:
```bash
docker compose up postgres-db -d
```

### 5.3 ติดตั้งและรันส่วนหลังบ้าน (Backend Setup)
```bash
# 1. เข้าสู่โฟลเดอร์ backend
cd backend

# 2. คัดลอกและตั้งค่า Environment Variables
cp .env.example .env

# 3. ติดตั้ง Dependencies
npm install

# 4. รันเซิร์ฟเวอร์ Backend (ระบบจะทำ Auto-Sync Table และ Auto-Seed ข้อมูลอัตโนมัติ)
npm start
# เซิร์ฟเวอร์จะพร้อมทำงานที่: http://localhost:5000
```

### 5.4 ติดตั้งและรันส่วนหน้าบ้าน (Frontend Setup)
```bash
# 1. เปิด Terminal ใหม่แล้วเข้าสู่โฟลเดอร์ frontend
cd frontend

# 2. คัดลอก Environment Variables
cp .env.example .env

# 3. ติดตั้ง Dependencies
npm install

# 4. รันเซิร์ฟเวอร์การพัฒนา Frontend
npm run dev
# เข้าใช้งานเว็บแอปพลิเคชันได้ที่: http://localhost:5173
```

---

## 6. Cloud Deployment Guide & Service Links (แนวทางการนำขึ้นคลาวด์และลิงก์บริการ)

### 6.1 Frontend Deployment (Vercel)
- **Live URL:** [https://final-learning-materials.vercel.app/](https://final-learning-materials.vercel.app/)
- **Repository Root Directory:** `frontend`
- **Framework Preset:** `Vite`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Environment Variable:**
  - `VITE_API_URL=https://<your-render-backend-url>.onrender.com`

### 6.2 Backend Deployment (Render.com)
- **Service Deployment Dashboard:** [Render Web Service srv-dbau6n61egvs73c5h120](https://dashboard.render.com/web/srv-dbau6n61egvs73c5h120/deploys)
- **Root Directory:** `backend`
- **Environment:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `node index.js` (หรือ `npm start`)
- **Environment Variables:**
  - `NODE_ENV=production`
  - `PORT=5000`
  - `DATABASE_URL=postgresql://neondb_owner:npg_2g8oQmKsklzY@ep-dry-violet-a10xuzof-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require`
  - `DB_SSL=true`
  - `CORS_ORIGIN=*` (หรือ `https://final-learning-materials.vercel.app`)

### 6.3 Serverless Database (Neon PostgreSQL via Vercel Integration)
- **Neon Management & Storage Guide:** [Neon Storage Guides & Integration](https://vercel.com/sommais-projects/~/integrations/neon/icfg_5MvR5HfLLacwjl5xr1hgHCXc/resources/storage/store_enVQppdaTudYi6Wn/guides)
- **Database Engine:** PostgreSQL 16 (Serverless with Auto-Scaling & Connection Pooling)

---

## 7. Automated End-to-End Testing (Playwright E2E Suite)

โครงการนี้มีชุดทดสอบอัตโนมัติแบบครอบคลุมทั้ง **14 Mandatory Quality Scenarios** ใน `frontend/tests/learning-resources.spec.js` และ **21 Master Aesthetic Scenarios** ใน `frontend/e2e/learning-resources.spec.js` (รวมทั้งสิ้น 35 Test Cases):

### คำสั่งรันการทดสอบ
```bash
cd frontend

# รันชุดทดสอบ 14 ข้อหลัก
npx playwright test tests/learning-resources.spec.js

# รันชุดทดสอบทั้งหมด 35 ข้อ (ทั้ง functional และ aesthetic tests)
npx playwright test
```

### สรุปสถานการณ์ทดสอบ 14 ข้อหลักที่ผ่านการตรวจสอบ 100%:
1. **Load page & display data:** หน้าเว็บโหลดสมบูรณ์ แสดงรายการสื่อการเรียนรู้
2. **Successfully create a new resource:** สร้างสื่อใหม่และได้รับสถานะ HTTP `201 Created`
3. **Validation Error (Title whitespace):** ส่งชื่อที่เป็นช่องว่างล้วน ระบบตอบกลับ HTTP `400 Bad Request`
4. **Validation Error (Invalid category):** ส่งหมวดหมู่ที่ไม่ได้รับอนุญาต ระบบตอบกลับ HTTP `400 Bad Request`
5. **View resource details:** หน้าต่าง Detailed Reading View แสดงข้อมูลครบถ้วนทุกฟิลด์
6. **Edit resource successfully:** แก้ไขข้อมูลสื่อสำเร็จ ข้อมูลอัปเดตตรงกันทั้งใน UI และ Database
7. **Cancel delete operation:** กดยกเลิกในกล่องยืนยัน ข้อมูลไม่ถูกลบและยังคงอยู่
8. **Confirm delete operation:** กดยืนยันการลบ ข้อมูลถูกลบออกจากทั้งหน้าจอและฐานข้อมูลอย่างถาวร
9. **Combined Search & Filter:** ค้นหาคำค้นบางส่วนในชื่อ พร้อมกรองหมวดหมู่ร่วมกันได้ถูกต้อง
10. **Search not found:** ค้นหาคำที่ไม่มีอยู่ ตอบกลับ HTTP `200 OK` พร้อมอาเรย์ว่างและแสดงหน้าจอ Empty State
11. **Non-existent ID Handling:** เรียกดู แก้ไข หรือลบ ID ที่ไม่มีอยู่ ตอบกลับ HTTP `404 Not Found`
12. **Non-positive integer ID:** ส่ง ID ที่ไม่ใช่จำนวนเต็มบวก (สตริงหรือค่าติดลบ) ตอบกลับ HTTP `400 Bad Request`
13. **Data persistence check:** รีเฟรชหน้าจอ ข้อมูลยังคงอยู่เหมือนเดิม ไม่สูญหาย
14. **API Error handling:** จำลองสถานการณ์เซิร์ฟเวอร์ล่ม (HTTP 500) หน้าเว็บจัดการแสดงข้อความแจ้งเตือนที่สุภาพ ไม่เกิด Runtime Crash
