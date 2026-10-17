<div align="center">

# ✨ Product Management App

### โมเดิร์นเว็บแอปพลิเคชันจัดการสินค้าสไตล์ Luxury Soft UI & Monochrome (White & Black)

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![DaisyUI](https://img.shields.io/badge/DaisyUI-v5-000000?logo=daisyui&logoColor=white)](https://daisyui.com/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Frontend-000000?logo=vercel&logoColor=white)](https://vercel.com/)
[![Render](https://img.shields.io/badge/Render-Backend-46E3B7?logo=render&logoColor=white)](https://render.com/)

---

</div>

## 📖 สรุปภาพรวมของโปรเจกต์ (Project Overview)

**Product Management App** คือเว็บแอปพลิเคชัน Full-stack ระดับพรีเมียมสำหรับบริหารจัดการสินค้าและหมวดหมู่ (Product & Category CRUD) อย่างเต็มรูปแบบ ออกแบบด้วยสถาปัตยกรรมที่ยืดหยุ่น ทันสมัย และรองรับการรันทั้ง **Local Environment**, **Docker Containers**, และการ Deploy ขึ้น **Cloud (Frontend บน Vercel / Backend บน Render)**

ตัวระบบถูกออกแบบ UI ใหม่ภายใต้แนวคิด **Luxury Soft UI & Monochrome Style (White & Black)**:
- พื้นหลังคลีน สะอาดตา โทนสีขาวนวล `#FAFAFA`
- ปุ่มกดและองค์ประกอบสำคัญคุมโทนดำ `#0A0A0A` เรียบหรู คมชัด มินิมอล
- ตัดสีม่วงและสีสันฉูดฉาดออกทั้งหมด เพื่อความพรีเมียมและโฟกัสที่ตัวผลิตภัณฑ์
- ใช้เฉพาะ Built-in Components ของ **daisyUI v5** ร่วมกับ Utility Classes ของ **Tailwind CSS v4** โดยไม่เขียน Custom CSS ที่ซับซ้อน ช่วยให้โค้ดดูแลรักษาง่าย
- รองรับภาษาไทยอย่างสวยงามด้วยฟอนต์ **Kanit**

---

## 🌟 ฟีเจอร์เด่น (Key Features)

- 🏠 **Main Homepage (`/`):** หน้าแรกสไตล์ Luxury พร้อม Hero Section, แถบ Quick-Jump ข้ามไปยังหมวดหมู่ต่าง ๆ, และ **Product Showcase** ที่จัดกลุ่มสินค้าแยกตามหมวดหมู่อย่างเป็นระเบียบ สวยงามและ Responsive บนทุกขนาดหน้าจอ
- 🏷️ **ระบบจัดการหมวดหมู่สินค้า (Category CRUD) (`/categories`):**
  - สร้างหมวดหมู่ใหม่ได้ทันที
  - แก้ไขชื่อหมวดหมู่แบบ Inline รวดเร็ว ไม่ต้องสลับหน้า
  - แสดงจำนวนสินค้าที่ผูกอยู่กับหมวดหมู่นั้น ๆ (`productCount`)
  - ลบหมวดหมู่พร้อม Modal ยืนยันความปลอดภัย
- 📦 **ระบบจัดการสต็อกและแคตตาล็อกสินค้า (Product CRUD) (`/products`):**
  - เพิ่ม แก้ไข และลบสินค้า
  - เชื่อมโยงสินค้าเข้ากับหมวดหมู่ (Relational One-to-Many)
  - แถบแท็บกรองสินค้าตามหมวดหมู่แบบ Dynamic
  - Modal แสดงรายละเอียดสินค้าแบบ Soft UI
- 🧭 **Global Navigation Bar:** Navbar ด้านบนแบบ Sticky พร้อมลิงก์ไปยังทุกหน้า พร้อมปุ่มลัด `+ เพิ่มสินค้า` และเมนู Responsive Hamburger สำหรับ Mobile
- 🔔 **Luxury Toast Notifications:** ระบบแจ้งเตือน Dark Toast เมื่อทำรายการสำเร็จหรือเกิดข้อผิดพลาด
- ⚡ **สถาปัตยกรรมกระชับ:** ตัดระบบไฟล์เสียงและ Media Player ที่ไม่จำเป็นออก เพื่อให้ระบบมีความคลีน ปลอดภัย และตอบสนองรวดเร็ว
- 🚀 **Production-Ready Multi-Platform:** พร้อม Deploy ขึ้น Cloud ได้ทันที (Frontend บน Vercel พร้อมไฟล์ `vercel.json` ป้องกันปัญหา 404 รีเฟรช / Backend มี `render.yaml` 1-Click Deploy)

---

## 🗺️ เส้นทางหน้าเว็บ (Frontend Routing)

| Route Path | หน้าเว็บ | คำอธิบายและฟังก์ชันการทำงาน |
| :--- | :--- | :--- |
| **`/`** | **Homepage** | หน้าแรกหลักของระบบ แสดง Hero Banner, แถบข้ามหมวดหมู่, และ Product Showcase จัดกลุ่มตามแต่ละหมวดหมู่ |
| **`/products`** | **Product Catalog** | หน้าจัดการสินค้า แสดงรายการสินค้าทั้งหมด มีแท็บกรองตามหมวดหมู่ ดูรายละเอียดใน Modal และปุ่มแก้ไข/ลบ |
| **`/categories`** | **Category Management** | หน้าบริหารจัดการหมวดหมู่ เพิ่มหมวดหมู่ใหม่, แก้ไขชื่อแบบ Inline, แสดงจำนวนสินค้า และลบหมวดหมู่ |
| **`/add`** | **Add Product** | แบบฟอร์มเพิ่มสินค้าใหม่ พร้อม Dropdown เลือกหมวดหมู่, กรอกชื่อ ราคา คำอธิบาย และรูปภาพ |
| **`/edit/:id`** | **Edit Product** | แบบฟอร์มแก้ไขข้อมูลสินค้าเดิม โหลดข้อมูลอัตโนมัติจาก ID |
| `*` | **Not Found (404)** | หน้าแจ้งเตือนเมื่อเข้า URL ที่ไม่มีในระบบ พร้อมปุ่มกลับหน้าแรก |

---

## 🏗️ โครงสร้างโปรเจกต์ (Project Structure)

```text
product-management-app/
├── backend/
│   ├── config/
│   │   └── database.js          # Sequelize เชื่อมต่อ PostgreSQL (ตรวจจับ Local vs Cloud SSL อัตโนมัติ)
│   ├── controller/
│   │   ├── categoryController.js # CRUD หมวดหมู่สินค้า + รวมจำนวนสินค้า (Product Count)
│   │   └── productController.js  # CRUD สินค้า + เชื่อมโยง Model Category
│   ├── model/
│   │   ├── categoryModel.js     # ตาราง Categories (id, name)
│   │   └── productModel.js      # ตาราง Products (id, name, price, description, image, categoryId)
│   ├── router/
│   │   ├── categoryRouter.js    # Express Router สำหรับ /api/categories
│   │   └── productRouter.js     # Express Router สำหรับ /api/products
│   ├── .dockerignore            # ป้องกัน copy node_modules ขึ้น Docker
│   ├── .env                     # ตัวแปรสภาพแวดล้อม Backend สำหรับ Local Run
│   ├── .env.example             # ตัวอย่างตัวแปรสภาพแวดล้อม Backend
│   ├── Dockerfile               # Node 22 Alpine Dockerfile สำหรับ Backend
│   ├── index.js                 # Entry point Express API (พอร์ต 5000)
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx       # Global Luxury Monochrome Navbar + Mobile Menu
│   │   │   ├── ProductCard.jsx  # การ์ดแสดงสินค้าสไตล์ Soft UI
│   │   │   ├── ProductHeader.jsx# ส่วนหัวตารางสินค้า & ตัวกรองหมวดหมู่
│   │   │   └── ProductList.jsx  # Grid แสดงสินค้า พร้อม Action Buttons
│   │   ├── context/
│   │   │   └── ToastContext.jsx # Luxury Dark Toast Notification Provider
│   │   ├── layouts/
│   │   │   └── MainLayout.jsx   # Layout คลุม Navbar, Background ขาวคลีน (#FAFAFA), และ Footer
│   │   ├── pages/
│   │   │   ├── HomePage.jsx     # หน้าแรก (Hero + Category-grouped Showcase)
│   │   │   ├── ProductPage.jsx  # หน้าจัดการสินค้า & แคตตาล็อก
│   │   │   ├── CategoryPage.jsx # หน้าจัดการหมวดหมู่สินค้า
│   │   │   ├── AddProduct.jsx   # หน้าเพิ่มสินค้า
│   │   │   ├── EditProduct.jsx  # หน้าแก้ไขสินค้า
│   │   │   ├── ProductForm.jsx  # แบบฟอร์มกรอกข้อมูลสินค้า (Reusable Form)
│   │   │   └── NotFound.jsx     # หน้า 404 สไตล์มินิมอล
│   │   ├── App.jsx              # React Router กำหนด Routes
│   │   ├── index.css            # กำหนด Theme Color (Black & White Primary) และฟอนต์ Kanit
│   │   └── main.jsx
│   ├── .dockerignore
│   ├── .env                     # ตัวแปรสภาพแวดล้อม Frontend (VITE_API_URL)
│   ├── .env.example
│   ├── Dockerfile               # Node 22 Alpine Dockerfile สำหรับ Frontend
│   ├── index.html               # Entry HTML โหลด Google Fonts Kanit
│   ├── vercel.json              # Vercel SPA Rewrite กฎ /(.*) -> /index.html แก้ปัญหา 404
│   ├── vite.config.js           # Vite 8 + Tailwind CSS v4 Config
│   └── package.json
│
├── .env                         # ตัวแปรสภาพแวดล้อมหลักสำหรับ Docker Compose
├── .env.example                 # ตัวอย่างตัวแปรหลัก
├── docker-compose.yml           # Multi-container orchestration (PostgreSQL, Backend, Frontend)
├── render.yaml                  # Blueprint สำหรับ Deploy Backend อัตโนมัติบน Render
├── vercel.json                  # คอนฟิก Vercel Monorepo / Root Deployment
├── deploy.md                    # 📖 คู่มือการ Deploy สู่ Cloud (Neon + Render + Vercel) แบบละเอียด
└── README.md
```

---

## ⚙️ การตั้งค่า Environment Variables

### 1. ไฟล์ `.env` ที่โฟลเดอร์หลัก (Root) - สำหรับ Docker Compose
คัดลอกจาก `.env.example`:
```bash
cp .env.example .env
```
ค่าที่แนะนำ:
```env
# Database Settings สำหรับ Docker Postgres Container
POSTGRES_USER=dev_user
POSTGRES_PASSWORD=dev_password
POSTGRES_DB=product_db
POSTGRES_PORT=5433

# Database Connection (เมื่อรันในเครื่องต่อที่พอร์ต 5433)
DB_HOST=localhost
DB_PORT=5433
DB_NAME=product_db
DB_USER=dev_user
DB_PASSWORD=dev_password
DB_SSL=false

# Backend Settings
NODE_ENV=development
PORT=5000
BACKEND_PORT=5000

# Frontend Settings
FRONTEND_PORT=5173
VITE_API_URL=http://localhost:5000
```

> [!TIP]
> **ทำไมพอร์ต PostgreSQL จึงใช้ `5433`?**  
> เพื่อป้องกันปัญหาพอร์ตชนกันกับ PostgreSQL ที่อาจติดตั้งอยู่ในเครื่องโฮสต์ (พอร์ตมาตรฐาน 5432) ตัว Docker Compose จึงเปิดพอร์ตภายนอกเป็น `5433` ให้โดยอัตโนมัติ

---

## 🚀 วิธีการรันโปรเจกต์ (Execution Guide)

### รูปแบบที่ 1: รันผ่าน Docker Compose (แนะนำ สะดวกที่สุด) 🐳

สั่งรันทั้งระบบ (ฐานข้อมูล, API และเว็บแอป) ด้วยคำสั่งเดียว:

```bash
# 1. บิลด์และสั่งรันคอนเทนเนอร์ทั้งหมดใน Background
docker compose up --build -d

# 2. ตรวจสอบสถานะคอนเทนเนอร์
docker compose ps

# 3. ดูบันทึกการทำงาน (Logs)
docker compose logs -f

# 4. สั่งหยุดการทำงาน
docker compose down
```

**🌐 ช่องทางเข้าใช้งาน:**
- **Frontend Web App:** [http://localhost:5173](http://localhost:5173)
- **Backend API:** [http://localhost:5000](http://localhost:5000)
- **PostgreSQL Database:** `localhost:5433` (Username: `dev_user`, Password: `dev_password`, Database: `product_db`)

---

### รูปแบบที่ 2: รันแยกบนเครื่อง Local (Local Development) 💻

#### ขั้นที่ 1: เตรียม Database (เลือกวิธีใดวิธีหนึ่ง)
* **วิธี A (สะดวกที่สุด):** รันเฉพาะฐานข้อมูล Postgres ด้วย Docker:
  ```bash
  docker compose up postgres-db -d
  ```
* **วิธี B:** ใช้ Cloud Database ฟรี เช่น [Neon.tech](https://neon.tech/) หรือ [Supabase](https://supabase.com/) แล้วนำ Connection String มาใส่ใน `backend/.env`

#### ขั้นที่ 2: รันฝั่ง Backend API
เปิด Terminal ที่ 1:
```bash
cd backend
npm install
npm run dev
```
*(Backend จะรันที่ [http://localhost:5000](http://localhost:5000) และทำการ Sync ตารางอัตโนมัติ)*

#### ขั้นที่ 3: รันฝั่ง Frontend Web App
เปิด Terminal ที่ 2:
```bash
cd frontend
npm install
npm run dev
```
*(Frontend จะรันที่ [http://localhost:5173](http://localhost:5173))*

---

### รูปแบบที่ 3: การ Deploy สู่ Cloud (Production Ready) ☁️

> [!IMPORTANT]
> 📖 **ต้องการคู่มือการ Deploy แบบเจาะลึกทุกขั้นตอน?**  
> สามารถอ่านคู่มือการตั้งค่า **Neon + Render + Vercel** พร้อมคำแนะนำการตั้งค่า Connection Pooling และการแก้ปัญหาอย่างละเอียดได้ที่ไฟล์ [deploy.md](file:///D:/backend-work/Product-management-app/deploy.md)

#### 1. Deploy Frontend บน [Vercel](https://vercel.com/)
1. เชื่อมต่อ Git Repository เข้ากับ Vercel
2. เลือกตั้งค่า:
   - **Framework Preset:** `Vite`
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
3. เพิ่ม Environment Variable:
   - `VITE_API_URL`: URL ของ Backend ที่ Deploy สำเร็จ (เช่น `https://my-backend.onrender.com`)
4. กด **Deploy**  
   *(โปรเจกต์มีไฟล์ `frontend/vercel.json` กฎ Rewrite SPA ไว้แล้ว รีเฟรชหน้าเว็บที่ URL ใดก็ไม่ติดหน้า 404)*

#### 2. Deploy Backend บน [Render](https://render.com/)
1. เข้า Render Dashboard แล้วเลือก **New + > Web Service**
2. เลือก Repository ของคุณ แล้วกำหนดค่า:
   - **Root Directory:** `backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
3. กำหนด Environment Variables:
   - `NODE_ENV`: `production`
   - `DATABASE_URL`: Connection string ของ Neon PostgreSQL หรือ Render PostgreSQL
4. กด **Create Web Service**  
   *(หรือเลือก **Blueprint** แล้วชี้มาที่ไฟล์ `render.yaml` เพื่อสร้าง Service อัตโนมัติ)*

---

## 🔌 รายการ API Endpoints (RESTful APIs)

### 🏷️ Categories Endpoints (`/api/categories`)
| HTTP Method | Endpoint | คำอธิบาย | ตัวอย่าง Request Body (JSON) |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/categories` | ดึงรายการหมวดหมู่ทั้งหมด (พร้อมนับจำนวนสินค้า `productCount`) | - |
| **GET** | `/api/categories/:id` | ดึงข้อมูลหมวดหมู่เฉพาะ ID | - |
| **POST** | `/api/categories` | สร้างหมวดหมู่สินค้าใหม่ | `{"name": "Workspace Essentials"}` |
| **PUT** | `/api/categories/:id` | แก้ไขชื่อหมวดหมู่ตาม ID | `{"name": "Office & Desk Setup"}` |
| **DELETE** | `/api/categories/:id` | ลบหมวดหมู่ตาม ID | - |

### 📦 Products Endpoints (`/api/products`)
| HTTP Method | Endpoint | คำอธิบาย | ตัวอย่าง Request Body (JSON) |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/products` | ดึงรายการสินค้าทั้งหมด (พร้อมข้อมูลหมวดหมู่ที่สังกัด) | - |
| **GET** | `/api/products/:id` | ดึงข้อมูลสินค้าเฉพาะ ID | - |
| **POST** | `/api/products` | เพิ่มสินค้าใหม่เข้าสู่ระบบ | `{"name": "Mechanical Keyboard", "price": 3290, "description": "Custom switch", "image": "https://...", "categoryId": 1}` |
| **PUT** | `/api/products/:id` | แก้ไขข้อมูลสินค้าตาม ID | `{"name": "Wireless Keyboard", "price": 3490, "categoryId": 1}` |
| **DELETE** | `/api/products/:id` | ลบสินค้าออกจากระบบตาม ID | - |

---

## 🛠️ การแก้ไขปัญหาที่พบบ่อย (Troubleshooting & FAQ)

### 1. ปัญหา: `The server does not support SSL connections`
- **สาเหตุ:** Sequelize พยายามบังคับเชื่อมต่อแบบเข้ารหัส SSL กับ PostgreSQL บนเครื่อง Local ที่ไม่ได้เปิด SSL
- **วิธีแก้:** ใน `backend/config/database.js` ระบบมีฟังก์ชันตรวจสอบอัตโนมัติแล้ว โดยหากตรวจพบการเชื่อมต่อกับ Cloud Database (เช่น Neon, Render, Supabase) จะเปิด SSL ให้อัตโนมัติ แต่หากรันบน Local/Docker จะปิด SSL ให้ทันที

### 2. ปัญหา: พอร์ตชนกัน (`Bind for 0.0.0.0:5432 failed: port is already allocated`)
- **สาเหตุ:** มี service PostgreSQL อื่นทำงานอยู่บนพอร์ต 5432 ในเครื่อง
- **วิธีแก้:** โปรเจกต์ได้ตั้งค่า Docker Compose ให้แมปพอร์ตภายนอกเป็น **`5433`** ไว้ล่วงหน้าแล้ว คุณจึงสามารถรัน Docker ร่วมกับโปรแกรมอื่นได้อย่างราบรื่น

### 3. ปัญหา: รีเฟรชหน้าเว็บบน Vercel แล้วขึ้นหน้า 404 Not Found
- **สาเหตุ:** สถาปัตยกรรม Single Page Application (SPA) ของ React Router ต้องการให้เซิร์ฟเวอร์ส่ง `index.html` เสมอในทุก URL
- **วิธีแก้:** โปรเจกต์มีไฟล์ `frontend/vercel.json` ที่กำหนด Rewrite กฎ `/(.*) -> /index.html` ไว้เรียบร้อยแล้ว

### 4. ปัญหา: Frontend ยิงเรียก Backend ไม่ได้ (Network Error / CORS)
- **วิธีแก้:**
  1. ตรวจสอบค่า `VITE_API_URL` ใน `frontend/.env` หรือบน Vercel Dashboard ให้ตรงกับ URL ของ Backend (เช่น `http://localhost:5000` สำหรับ Local)
  2. ทดสอบเปิดเบราว์เซอร์ไปที่ Backend URL จะต้องขึ้นข้อความต้อนรับของ API

---

<div align="center">

สร้างสรรค์ด้วยความใส่ใจในสถาปัตยกรรม โค้ดที่กระชับ และดีไซน์ที่เรียบหรูเหนือกาลเวลา 

</div>
