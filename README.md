<div align="center">

# ✨ Learning materials • Educational Resources Management Portal

### Production-Grade Learning Materials Web Application (Minimalist Monochrome & Subtle Liquid Glass)
**ข้อสอบปฏิบัติการพัฒนาระบบเว็บ Fullstack รายวิชา 7153403 เทคโนโลยีการบริการเว็บ • ชุดที่ 5 สื่อการเรียนรู้ (Topic 5)**

[![React](https://img.shields.io/badge/React-19-black?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-black?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-black?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![DaisyUI](https://img.shields.io/badge/DaisyUI-v5-black?logo=daisyui&logoColor=white)](https://daisyui.com/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-black?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Sequelize](https://img.shields.io/badge/Sequelize-ORM-black?logo=sequelize&logoColor=white)](https://sequelize.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-black?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Playwright](https://img.shields.io/badge/Playwright-15%20Passed-black?logo=playwright&logoColor=white)](https://playwright.dev/)

---

</div>

## 📖 สรุปภาพรวมของโครงการ (Project Overview)

**Learning materials** คือเว็บแอปพลิเคชันเชิงพาณิชย์ระดับโปรดักชันสำหรับการค้นหา จัดการ และจัดหมวดหมู่สื่อการเรียนรู้ดิจิทัล (Curated Educational Resources Platform) พัฒนาตามข้อกำหนดหัวข้อ **"ชุดที่ 5 สื่อการเรียนรู้ (Topic 5)"** รายวิชา 7153403 เทคโนโลยีการบริการเว็บ 

ตัวระบบเป็นสถาปัตยกรรม Full-Stack สมบูรณ์แบบที่เชื่อมต่อระหว่าง Frontend (React 19, Tailwind CSS v4, DaisyUI v5) และ Backend RESTful API (Express, Node.js, Sequelize ORM) บนฐานข้อมูล PostgreSQL จริง พร้อมชุดทดสอบ End-to-End (E2E) ด้วย Playwright 100% ผ่านทุกกรณีทดสอบ

---

## 🎨 สถาปัตยกรรมและภาษาการออกแบบ (Design System & Aesthetic)

ระบบได้รับการปรับปรุง UI/UX ตามมาตรฐาน `fixdesignv1.md` อย่างเคร่งครัด:

1. **Minimalist Monochrome Palette:**
   - คุมโทนสีขาว-ดำ มินิมอล สะอาดตา ไม่ใช้สีนีออนหรือการไล่สีฉูดฉาด
   - รหัสสีหลัก: ขาวบริสุทธิ์ `#FFFFFF`, เทาอ่อน `#F7F7F7` / `#F1F1F1`, ดำเข้ม `#171717`, เทากลาง `#666666`, `#858585`, และเส้นขอบละมุนตา `#E7E7E7` / `#D5D5D5`
2. **Subtle Liquid Glass & Refined Soft UI:**
   - พื้นผิวโปร่งแสงกึ่งกระจกฝ้าแบบเบาบาง (`backdrop-blur-md`, `bg-white/80`, `border-neutral-200/80`)
   - เงาแบบกระจายแสงนุ่มนวล (`shadow-xs`, `shadow-sm`) เพิ่มมิติการสัมผัสและการมีปฏิสัมพันธ์ (Tactile Depth)
3. **Editorial Typography (Kanit Typeface):**
   - ใช้งานฟอนต์ **Kanit** ครอบคลุมทั้งระบบ (Global Coverage) ตั้งแต่ Heading, Body, Input, Textarea, Select, Button, Dialog ตลอดจนข้อความแจ้งเตือนความผิดพลาด (Validation Errors)
   - จัดการระยะห่างบรรทัด (Line-height) และช่องว่างอย่างแม่นยำ ไม่พบปัญหาตัวอักษรไทยตกหล่นหรือถูกตัดทอน (Zero Clipping)
4. **English-First Interface พร้อมรองรับภาษาไทย:**
   - อินเทอร์เฟซมาตรฐานสากล ใช้ภาษาอังกฤษเป็นหลักพร้อมคำกำกับภาษาไทย และรองรับการป้อนข้อมูลภาษาไทยได้ 100%

---

## 🌟 ฟีเจอร์หลักตามข้อกำหนดชุดที่ 5 (Topic 5 Features)

| ฟีเจอร์ | เส้นทาง (Route) | รายละเอียดการทำงานและองค์ประกอบสำคัญ |
| :--- | :--- | :--- |
| 🎴 **Showcase View (หน้าแรก)** | `/` | แสดงสื่อการเรียนรู้เป็นการ์ดภาพคมชัด อัตราส่วน 16:9, หมวดหมู่, ชื่อสื่อ, ผู้สร้าง, วันที่เผยแพร่, สถานะ, และปุ่มเปิด **Detailed Reading View Modal** |
| 🔍 **Search & Category Filters** | `/` และ `/learning-resources` | ค้นหาแบบ Real-time ด้วยคำค้นหาบางส่วน (Title, Creator, Topic) ควบคู่กับการกรองหมวดหมู่ (`บทความ`, `วิดีโอ`, `แบบฝึกหัด`) พร้อม Empty State และปุ่มล้างเงื่อนไข |
| ⚙️ **CRUD Management View** | `/learning-resources` | แผงควบคุมและจัดการสื่อการเรียนรู้ แสดงข้อมูล **ผู้สร้าง (`creator`)** และ **วันที่เผยแพร่ (`publishedDate`)** อย่างเด่นชัด พร้อมปุ่ม ดู/แก้ไข/ลบ และสลับมุมมองระหว่าง **Cards View** และ **Table View** |
| ➕ **เพิ่มสื่อการเรียนรู้ใหม่** | `/learning-resources/add` | ฟอร์มเพิ่มสื่อการเรียนรู้ รองรับทั้งภาษาอังกฤษและภาษาไทย พร้อมระบบ **Live Image Preview** เมื่อใส่ External Image URL และ Client/Server Validation |
| ✏️ **แก้ไขข้อมูลสื่อการเรียนรู้** | `/learning-resources/edit/:id` | ดึงข้อมูลเดิมจากฐานข้อมูลมาแสดงในฟอร์ม รองรับการแก้ไขชื่อ ผู้สร้าง หมวดหมู่ วันที่ สถานะ ลิงก์รูปภาพ และเนื้อหา |
| 🗑️ **ระบบยืนยันการลบ** | Modal Dialog | หน้าต่างยืนยันการลบแบบ Accessible แจ้งเตือนชื่อรายการที่จะลบชัดเจน สามารถกดยกเลิก (Cancel) เพื่อรักษาข้อมูล หรือยืนยันลบ (Confirm Delete) เพื่อลบถาวร |

---

## 🗄️ โครงสร้างฐานข้อมูล (Database Schema)

ตารางหลัก: **`learning_resources`**

| ฟิลด์ | ชนิดข้อมูล (Sequelize) | ข้อกำหนดและความหมาย |
| :--- | :--- | :--- |
| `id` | `INTEGER` | Primary Key, Auto Increment, จำนวนเต็มบวก |
| `title` | `STRING(150)` | ชื่อสื่อการเรียนรู้ 1–150 ตัวอักษร (ห้ามเป็นช่องว่างล้วน) |
| `creator` | `STRING(100)` | ผู้สร้าง/ผู้รับผิดชอบ 1–100 ตัวอักษร (ห้ามเป็นช่องว่างล้วน) |
| `category` | `STRING(50)` | หมวดหมู่ตามเงื่อนไข: `"บทความ"`, `"วิดีโอ"`, `"แบบฝึกหัด"` |
| `publishedDate` | `DATEONLY` | วันที่เผยแพร่ตามรูปแบบสากล `YYYY-MM-DD` |
| `description` | `TEXT` | รายละเอียดเนื้อหา 1–2,000 ตัวอักษร (ห้ามเป็นช่องว่างล้วน) |
| `imageUrl` | `TEXT` | ลิงก์รูปภาพปกภายนอก (External Image URL) สำหรับแสดงผลการ์ด |
| `status` | `BOOLEAN` | ค่าเริ่มต้น `true` (`true` = เผยแพร่, `false` = ฉบับร่าง) |
| `createdAt` / `updatedAt` | `DATE` | บันทึกวันเวลาสร้างและแก้ไขข้อมูลอัตโนมัติ |

---

## 📡 ข้อกำหนด RESTful API (`/api/learning-resources`)

| Method | Endpoint | หน้าที่ | HTTP Status |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/learning-resources` | อ่านรายการทั้งหมด พร้อมรองรับ Query `search` และ `category` | `200` (หากไม่พบ คืน `[]`) |
| **GET** | `/api/learning-resources/:id` | อ่านรายละเอียดรายการตามรหัส (ตรวจ ID เป็นจำนวนเต็มบวก) | `200` (ถ้า id ผิด `400`, ไม่พบ `404`) |
| **POST** | `/api/learning-resources` | สร้างสื่อการเรียนรู้ใหม่ พร้อม Validate ทุกฟิลด์ | `201` (ถ้าข้อมูลไม่ถูกต้อง `400`) |
| **PUT** | `/api/learning-resources/:id` | ปรับปรุงข้อมูลสื่อการเรียนรู้ตามรหัส | `200` (ถ้า id ผิด/ข้อมูลไม่ผ่าน `400`, ไม่พบ `404`) |
| **DELETE** | `/api/learning-resources/:id` | ลบสื่อการเรียนรู้ตามรหัส | `200` (ถ้า id ผิด `400`, ไม่พบ `404`) |

---

## 🧪 การทดสอบ End-to-End (Playwright E2E Validation)

ชุดทดสอบ E2E เขียนขึ้นด้วย **Playwright** ตรวจสอบการทำงานของระบบอย่างรอบด้าน ครอบคลุมทั้ง 21 สถานการณ์สำคัญ:

### ผลการทดสอบล่าสุด (21/21 Passed • 100% Green):
```bash
Running 21 tests using 1 worker

  ✓   1. Application Load: Loads successfully without runtime errors and sets document title (647ms)
  ✓   2. Brand & Logo Integration: Official logo appears in Navbar and loads with valid natural dimensions (804ms)
  ✓   3. Primary Navigation: Navigates between Showcase, Manage Resources, and Add Resource (956ms)
  ✓   4. Product Navigation Removal: Obsolete product catalog links are not exposed in active navigation (512ms)
  ✓   5. Resource Listings: Renders learning materials cards with required fields & image covers (561ms)
  ✓   6. Search Functionality: Filters resources by keyword in real time (1.2s)
  ✓   7. Category Filtering: Filters resources by selected category tab (935ms)
  ✓   8. Search & Filter Synergy: Combined search and category filtering with empty state and reset (1.8s)
  ✓   9. Resource Details: Opens Detailed Reading View modal with complete content and closes (983ms)
  ✓  10. Create Resource (English): Submits valid English form data with external image preview (1.2s)
  ✓  11. Create Resource (Thai): Submits valid Thai typography and content (1.1s)
  ✓  12. Edit Resource Flow: Updates resource data and persists changes across UI and Database (1.2s)
  ✓  13. Delete Confirmation: Cancel preserves item, Confirm permanently deletes from database (1.5s)
  ✓  14. Form Validation: Validates required, empty, and whitespace-only fields (525ms)
  ✓  15. Direct API Validation: Validates IDs, categories, and whitespace strings (16ms)
  ✓  16. Keyboard Navigation: Operates search inputs and triggers actions using Enter key (1.2s)
  ✓  17. Responsive Viewport Audits: No horizontal overflow across mobile, tablet, and desktop (1.6s)
  ✓  18. Reduced Motion Support: Respects prefers-reduced-motion media feature (366ms)
  ✓  19. Asset Verification: Logo images exist and return HTTP 200 OK (34ms)
  ✓  20. Browser Console Health: Primary flows execute without uncaught JS errors (692ms)
  ✓  21. Visual Snapshot Captures: Saves responsive screenshots for visual verification (6.6s)

  21 passed (25.2s)
```

### คำสั่งสำหรับรันการทดสอบ:
```bash
# รัน Playwright E2E Tests จาก Root Directory
npm run test:e2e

# หรือรันจาก Frontend Directory
cd frontend
npm run test:e2e
```

---

## 🚀 ขั้นตอนการติดตั้งและรันระบบ (Local Setup)

### 1. ติดตั้ง Dependencies
```bash
# ติดตั้ง Backend Dependencies
cd backend
npm install

# ติดตั้ง Frontend Dependencies
cd ../frontend
npm install
```

### 2. รันฐานข้อมูล PostgreSQL ผ่าน Docker
```bash
docker compose up -d postgres-db
```
*(พอร์ต PostgreSQL แมปที่ `5433` โดยอัตโนมัติ ไม่ชนกับ Service อื่น)*

### 3. เริ่มต้นการทำงานของเซิร์ฟเวอร์
```bash
# Terminal 1: เริ่มต้น Backend
cd backend
npm start

# Terminal 2: เริ่มต้น Frontend
cd frontend
npm run dev
```

เปิดเว็บเบราว์เซอร์ไปที่: **`http://localhost:5173`**

---

## 📸 ภาพหน้าจอการทำงาน (Visual Verification Screenshots)

ระบบได้บันทึกภาพหน้าจอจริงจากการรัน E2E ไว้ที่โฟลเดอร์ `frontend/e2e-screenshots/`:
- `desktop-home.png` — หน้าแรก (Showcase Cards View & Hero Section) บน Desktop (1440x900)
- `mobile-home.png` — หน้าแรกบนสมาร์ทโฟน (390x844) แสดงการจัดวาง Responsive ที่สมบูรณ์แบบ
- `desktop-manage.png` — แผงควบคุมและจัดการสื่อการเรียนรู้ (CRUD Dashboard View)
- `desktop-form.png` — ฟอร์มเพิ่มและแก้ไขสื่อการเรียนรู้ พร้อมระบบ Live Image Preview
