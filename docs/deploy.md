# 🚀 Complete Deployment & DevOps Guide: Product Management App

คู่มือการติดตั้ง รันระบบ และนำโปรเจกต์ขึ้นสู่ระบบ Production อย่างสมบูรณ์แบบ รองรับทั้งสภาพแวดล้อม **Local Development**, **Docker Containers**, และการ Deploy แบบกระจายศูนย์บน **Cloud Infrastructure (Vercel + Neon + Render)**

---

## 📑 สารบัญ (Table of Contents)
1. [สถาปัตยกรรมระบบ (System Architecture)](#1-สถาปัตยกรรมระบบ-system-architecture)
2. [สิ่งที่ต้องเตรียมล่วงหน้าและการตั้งค่าตัวแปร (Pre-Deployment Setup)](#2-สิ่งที่ต้องเตรียมล่วงหน้าและการตั้งค่าตัวแปร-pre-deployment-setup)
3. [การรันระบบบนเครื่องและผ่าน Docker (Local & Docker Execution)](#3-การรันระบบบนเครื่องและผ่าน-docker-local--docker-execution)
4. [คู่มือการ Deploy สู่ Cloud ทีละขั้นตอน (Step-by-Step Deployment Guide)](#4-คู่มือการ-deploy-สู่-cloud-ทีละขั้นตอน-step-by-step-deployment-guide)
   - [4.1 ตั้งค่าฐานข้อมูลบน Neon (Serverless PostgreSQL)](#41-ตั้งค่าฐานข้อมูลบน-neon-serverless-postgresql)
   - [4.2 Deploy Backend Web Service บน Render](#42-deploy-backend-web-service-บน-render)
   - [4.3 Deploy Frontend SPA บน Vercel](#43-deploy-frontend-spa-บน-vercel)
5. [การแก้ไขปัญหาและข้อผิดพลาดที่พบบ่อย (Troubleshooting & Common Errors)](#5-การแก้ไขปัญหาและข้อผิดพลาดที่พบบ่อย-troubleshooting--common-errors)

---

## 1. สถาปัตยกรรมระบบ (System Architecture)

ระบบถูกออกแบบตามหลักการ **Separation of Concerns (SoC)** แยกเลเยอร์ Frontend, Backend และ Database ชัดเจน:

```mermaid
flowchart LR
    subgraph Client ["Client Devices"]
        Browser["User Browser / Mobile"]
    end

    subgraph Vercel_Platform ["Vercel (Frontend Hosting)"]
        SPA["React 19 + Vite 8 SPA\n(daisyUI v5 + Tailwind CSS v4)"]
        VercelRules["vercel.json (SPA Rewrite Rule)"]
    end

    subgraph Render_Platform ["Render (Backend Web Service)"]
        API["Node.js + Express API\n(Host: 0.0.0.0 | Port: $PORT)"]
        HealthEndpoint["/health Endpoint"]
    end

    subgraph Neon_Platform ["Neon (Serverless Postgres)"]
        NeonDB[("PostgreSQL 15+\n(Scale to Zero & PgBouncer Pooling)")]
    end

    Browser -->|HTTPS Request| SPA
    SPA -->|RESTful API (JSON)| API
    API -->|TCP / SSL (Port 5432)| NeonDB
    API -->|Health Check 200 OK| HealthEndpoint
```

---

## 2. สิ่งที่ต้องเตรียมล่วงหน้าและการตั้งค่าตัวแปร (Pre-Deployment Setup)

### 2.1 เครื่องมือที่จำเป็น (Prerequisites)
- **Node.js:** เวอร์ชั่น `>= 20.x` หรือ `>= 22.x LTS`
- **npm:** เวอร์ชั่น `>= 10.x`
- **Docker & Docker Desktop:** สำหรับการรันคอนเทนเนอร์บนเครื่อง
- **Git:** สำหรับการ Push ซอร์สโค้ดขึ้น GitHub / GitLab
- **บัญชีผู้ใช้ Cloud Services (ฟรีทั้งหมด):**
  - [Neon.tech](https://neon.tech/) — จัดการฐานข้อมูล Serverless Postgres
  - [Render.com](https://render.com/) — โฮสต์ Backend Express API
  - [Vercel.com](https://vercel.com/) — โฮสต์ Frontend React SPA

---

### 2.2 โครงสร้างและการแมป Environment Variables (`.env`)

โปรเจกต์แยกการจัดการ Environment Variables เป็น 3 ตำแหน่ง:

| ตำแหน่งไฟล์ | สภาพแวดล้อมที่ใช้งาน | วัตถุประสงค์ |
| :--- | :--- | :--- |
| **`/.env`** (Root) | Docker Compose | ควบคุมพอร์ตและคอนฟิกของทั้ง Postgres, Backend และ Frontend ในคอนเทนเนอร์ |
| **`/backend/.env`** | Local Backend Run | ตั้งค่าพอร์ตและเชื่อมต่อฐานข้อมูล (Local DB หรือ Cloud DB) |
| **`/frontend/.env`** | Local Frontend Run | ชี้ URL ปลายทางของ Backend API |

---

### 2.3 ตารางคำอธิบายตัวแปรสภาพแวดล้อมทั้งหมด

| ตัวแปร (Variable) | ค่าเริ่มต้น (Default) | ตัวอย่างค่าสำหรับ Production | คำอธิบายการทำงาน |
| :--- | :--- | :--- | :--- |
| `NODE_ENV` | `development` | `production` | โหมดการทำงานของ Node.js (ควบคุมการ sync ตาราง และ logging) |
| `PORT` | `5000` | ถูกกำหนดอัตโนมัติโดย Render | พอร์ตที่ Express Server ใช้เปิดรับ Request (ผูกกับ `0.0.0.0`) |
| `BACKEND_PORT` | `5000` | `5000` | พอร์ตภายนอกสำหรับแมปเข้า Docker Container |
| `DATABASE_URL` | - | `postgresql://user:pass@ep-xxx-pooler.neon.tech/neondb?sslmode=require` | Connection String หลักสำหรับต่อ Cloud Database (Neon/Render) |
| `DB_HOST` | `localhost` / `postgres-db` | - | โฮสต์ฐานข้อมูล (ใช้กรณีไม่ระบุ `DATABASE_URL`) |
| `DB_PORT` | `5433` (Docker Host) / `5432` | `5432` | พอร์ตฐานข้อมูล |
| `DB_NAME` | `product_db` | `neondb` | ชื่อ Database |
| `DB_USER` | `dev_user` | `neondb_owner` | Username ผู้ใช้ฐานข้อมูล |
| `DB_PASSWORD` | `dev_password` | `********` | รหัสผ่านฐานข้อมูล |
| `DB_SSL` | `false` | `true` | บังคับเปิด/ปิดการเข้ารหัส SSL (ระบบตรวจจับให้อัตโนมัติหากเป็น Cloud URL) |
| `CORS_ORIGIN` | `*` | `https://your-frontend.vercel.app` | กำหนด Domain ของ Frontend ที่อนุญาตให้ยิงข้าม Domain มาได้ |
| `VITE_API_URL` | `http://localhost:5000` | `https://your-backend.onrender.com` | Base URL ของ Backend ที่ Frontend React จะเรียกใช้งาน |

---

## 3. การรันระบบบนเครื่องและผ่าน Docker (Local & Docker Execution)

### ทางเลือกที่ 1: รันผ่าน Docker Compose (แนะนำ สะดวกและรวดเร็วที่สุด) 🐳

วิธีนี้จะติดตั้งและรันทั้ง PostgreSQL, Backend Node.js และ Frontend Vite ให้เสร็จสรรพในคอนเทนเนอร์:

```bash
# 1. คัดลอก Environment Variables ตัวอย่าง
cp .env.example .env

# 2. บิลด์และเริ่มการทำงานคอนเทนเนอร์ทั้งหมดในโหมด Background
docker compose up --build -d

# 3. ตรวจสอบสถานะของคอนเทนเนอร์ (ต้องขึ้น Up และ healthy)
docker compose ps

# 4. ดู Logs การทำงานแบบ Real-time
docker compose logs -f

# 5. เมื่อต้องการหยุดการทำงาน
docker compose down
```

**🌐 URL สำหรับเข้าใช้งาน:**
- **Frontend App:** [http://localhost:5173](http://localhost:5173)
- **Backend Health Check:** [http://localhost:5000/health](http://localhost:5000/health)
- **Backend Products API:** [http://localhost:5000/api/products](http://localhost:5000/api/products)
- **PostgreSQL Database (Host Port):** `localhost:5433`

> [!NOTE]
> พอร์ตภายนอกของ Postgres ใน Docker ถูกตั้งไว้ที่ **`5433`** เพื่อป้องกันการชนกับพอร์ต `5432` ที่มักถูกใช้งานอยู่แล้วในเครื่องของผู้พัฒนา

---

### ทางเลือกที่ 2: รันแบบ Hybrid Local (Postgres ใน Docker + รันโค้ดตรงบนเครื่อง) 💻

เหมาะสำหรับนักพัฒนาที่ต้องการแก้ไขโค้ดและดีบักบนเครื่องโดยตรง:

#### ขั้นตอนที่ 1: รันเฉพาะฐานข้อมูล Postgres ด้วย Docker
```bash
docker compose up postgres-db -d
```
*(ฐานข้อมูลจะพร้อมใช้งานที่ `localhost:5433` ทันที)*

#### ขั้นตอนที่ 2: รัน Backend API
เปิด **Terminal 1**:
```bash
cd backend
npm install
npm run dev
```
*(Backend จะเชื่อมต่อกับ `localhost:5433` สร้างตารางให้อัตโนมัติ และรันที่ [http://localhost:5000](http://localhost:5000))*

#### ขั้นตอนที่ 3: รัน Frontend Web App
เปิด **Terminal 2**:
```bash
cd frontend
npm install
npm run dev
```
*(Frontend จะรันที่ [http://localhost:5173](http://localhost:5173))*

---

## 4. คู่มือการ Deploy สู่ Cloud ทีละขั้นตอน (Step-by-Step Deployment Guide)

แนะนำให้ Deploy ตามลำดับดังนี้: **1. Neon (Database) ➡️ 2. Render (Backend) ➡️ 3. Vercel (Frontend)**

```mermaid
flowchart TD
    Step1["Step 1: Setup Neon Database\n- Create Project\n- Copy Pooled Connection String"]
    Step2["Step 2: Deploy Backend to Render\n- Connect Git Repo\n- Set DATABASE_URL\n- Build & Start Web Service"]
    Step3["Step 3: Deploy Frontend to Vercel\n- Connect Git Repo\n- Set Root Dir: frontend\n- Set VITE_API_URL = Render URL"]
    Step4["Production Ready 🎉\nAccess via Vercel URL"]

    Step1 --> Step2 --> Step3 --> Step4
```

---

### 4.1 ตั้งค่าฐานข้อมูลบน Neon (Serverless PostgreSQL)

1. เข้าสู่ระบบที่ [https://console.neon.tech/](https://console.neon.tech/)
2. กด **Create Project**:
   - **Project Name:** `product-management-db`
   - **Postgres Version:** `15` หรือ `16`
   - **Region:** เลือกภูมิภาคที่ใกล้ที่สุด (เช่น `Singapore (ap-southeast-1)`)
3. ในหน้า Dashboard ของ Neon ไปที่หัวข้อ **Connection Details**:
   - ให้เปิดสวิตช์เลือกแบบ **"Pooled connection"** (แนะนำอย่างยิ่งสำหรับ Serverless/Cloud เพื่อรองรับการ scale และประหยัด connection)
   - คัดลอก Connection String ที่ได้ ซึ่งจะมีหน้าตาประมาณนี้:
     ```text
     postgresql://neondb_owner:npg_xxxxxx@ep-cool-flower-123456-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
     ```
4. เก็บ Connection String นี้ไว้ เพื่อนำไปใส่ใน Render ในขั้นตอนถัดไป

> [!TIP]
> ไม่จำเป็นต้องรัน SQL migration ใดๆ ด้วยตนเอง เพราะระบบ Backend ใช้ Sequelize ซึ่งมีฟังก์ชัน Sync ตาราง (`Category` และ `Product`) ให้อัตโนมัติเมื่อ Backend เชื่อมต่อสำเร็จในครั้งแรก

---

### 4.2 Deploy Backend Web Service บน Render

คุณสามารถเลือก Deploy ได้ 2 วิธี:

#### วิธีที่ A: ผ่านไฟล์ Blueprint `render.yaml` (อัตโนมัติและรวดเร็ว)
1. Push โค้ดขึ้น GitHub Repository
2. เข้าสู่ [Render Dashboard](https://dashboard.render.com/)
3. คลิก **New +** แล้วเลือก **Blueprint**
4. เลือก Repository ของคุณ Render จะอ่านการตั้งค่าจากไฟล์ `render.yaml` โดยอัตโนมัติ
5. ใส่ค่า `DATABASE_URL` จาก Neon ลงในช่องที่ระบบร้องขอ แล้วกด **Apply**

#### วิธีที่ B: ตั้งค่าแบบ Manual ผ่าน Render Dashboard
1. เข้าสู่ Render Dashboard คลิก **New +** แล้วเลือก **Web Service**
2. เชื่อมต่อกับ Git Repository ของคุณ
3. กรอกข้อมูลการตั้งค่าดังนี้:
   - **Name:** `product-management-backend`
   - **Region:** เลือกภูมิภาคเดียวกับ Neon (เช่น `Singapore`)
   - **Root Directory:** `backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Health Check Path:** `/health`
4. เลื่อนลงมาที่หัวข้อ **Environment Variables** แล้วกดเพิ่มตัวแปร:
   - `NODE_ENV` = `production`
   - `DATABASE_URL` = *(วาง Connection String ที่ได้จาก Neon)*
   - `CORS_ORIGIN` = `*` *(สามารถแก้ไขเป็น Domain ของ Vercel ภายหลังได้)*
5. กด **Create Web Service**
6. รอประมาณ 1-2 นาที เมื่อหน้าจอขึ้น **Live** ให้ทดสอบเปิด URL ของ Render เช่น:
   ```text
   https://product-management-backend.onrender.com/health
   ```
   จะต้องได้รับ Response ตอบกลับเป็น JSON: `{"status": "ok", ...}`
7. คัดลอก URL ของ Backend Service นี้ไว้ใช้ในขั้นตอนของ Frontend

---

### 4.3 Deploy Frontend SPA บน Vercel

1. เข้าสู่ระบบที่ [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. คลิก **Add New...** ➡️ **Project**
3. Import Repository ของโปรเจกต์
4. กำหนดค่าในส่วน **Configure Project**:
   - **Project Name:** `product-management-app`
   - **Framework Preset:** `Vite`
   - **Root Directory:** คลิก **Edit** แล้วเลือกโฟลเดอร์ **`frontend`** *(สำคัญมาก)*
   - **Build and Output Settings:**
     - Build Command: `npm run build`
     - Output Directory: `dist`
5. เปิดหัวข้อ **Environment Variables**:
   - **Key:** `VITE_API_URL`
   - **Value:** URL ของ Render Backend ที่ได้จากขั้นตอนที่ 4.2 (เช่น `https://product-management-backend.onrender.com`)  
     *(ข้อควรระวัง: ห้ามใส่เครื่องหมาย `/` ปิดท้าย URL)*
6. กดปุ่ม **Deploy**
7. รอประมาณ 30 วินาที เมื่อ Build สำเร็จ หน้าเว็บจะพร้อมใช้งานทันทีผ่าน Vercel Domain

> [!IMPORTANT]
> ในโปรเจกต์มีไฟล์ [`vercel.json`](file:///D:/backend-work/Product-management-app/frontend/vercel.json) กำหนดกฎ Rewrite SPA `/(.*) -> /index.html` ไว้แล้ว ทำให้คุณสามารถเข้าหน้า `/products`, `/categories`, หรือ `/edit/1` และกดรีเฟรชเบราว์เซอร์ได้โดยไม่มีปัญหา Error 404

---

## 5. การแก้ไขปัญหาและข้อผิดพลาดที่พบบ่อย (Troubleshooting & Common Errors)

### 🔴 ปัญหาฝั่ง Neon (Serverless Postgres)

#### 1. ข้อผิดพลาด: `Connection terminated unexpectedly` หรือ `SequelizeConnectionError: ETIMEDOUT`
- **สาเหตุ:** Neon เป็น Serverless Database ที่มีฟีเจอร์ "Scale to Zero" (จะเข้าสู่โหมดประหยัดพลังงานเมื่อไม่มีการใช้งานเกิน 5 นาที) เมื่อมี Request เข้ามาใหม่ Neon ต้องใช้เวลาตื่นประมาณ 1-3 วินาที หาก Connection Pool ตัดสายเร็วเกินไปจะเกิด Timeout
- **การแก้ไขในโค้ด:**
  1. ใน [`backend/config/database.js`](file:///D:/backend-work/Product-management-app/backend/config/database.js) ได้รับการตั้งค่า Connection Pool:
     - `acquire: 60000` (ให้รอการเชื่อมต่อได้สูงสุด 60 วินาที เพื่อรองรับช่วงตื่นของ Neon)
     - `idle: 10000` และ `evict: 5000` (ตัดและล้าง Connection ที่ค้างทิ้ง ป้องกันการหยิบ Socket ที่ปิดไปแล้วมาใช้ใหม่)
  2. ฟังก์ชัน `connectDB` มีระบบ Retry สูงสุด 5 ครั้งพร้อมหน่วงเวลา 3 วินาที ทำให้การ Deploy บน Render ไม่หลุด Crash ในช่วงที่ Neon กำลังเริ่มทำงาน
  3. **คำแนะนำเพิ่มเติม:** ควรเลือกใช้ Connection String แบบ **Pooled connection** (`-pooler`) ของ Neon เสมอ

#### 2. ข้อผิดพลาด: `The server does not support SSL connections`
- **สาเหตุ:** ฝืนเปิด SSL ขณะต่อฐานข้อมูล Local หรือใบรับรอง Cloud ถูกปฏิเสธ
- **การแก้ไข:** ใน `database.js` ระบบจะตรวจจับ `DATABASE_URL` อัตโนมัติ หากมีคำว่า `neon.tech` หรือ `sslmode=require` ระบบจะเปิด SSL พร้อมตั้งค่า `rejectUnauthorized: false` เพื่อรองรับ Proxy Certificates ของ Cloud DB ทันที

---

### 🟡 ปัญหาฝั่ง Render (Backend Web Service)

#### 1. ข้อผิดพลาด: `Web service failed to bind to $PORT`
- **สาเหตุ:** การฮาร์ดโค้ดพอร์ต (เช่น กำหนดเลข 5000 ตายตัว) หรือสั่งให้เซิร์ฟเวอร์ฟังเฉพาะที่ `localhost`
- **การแก้ไข:** โค้ดใน [`backend/index.js`](file:///D:/backend-work/Product-management-app/backend/index.js) ถูกผูกด้วย:
  ```javascript
  const PORT = process.env.PORT || process.env.BACKEND_PORT || 5000;
  app.listen(PORT, "0.0.0.0", () => { ... });
  ```
  การผูกกับโฮสต์ `"0.0.0.0"` จะทำให้ Container ของ Render สามารถรับทราฟฟิกภายนอกได้อย่างถูกต้อง 100%

#### 2. การตอบสนองช้าในครั้งแรก (Cold Start บน Render Free Tier)
- **สาเหตุ:** บนแพ็กเกจฟรีของ Render ตัว Web Service จะเข้าสู่โหมด Sleep หากไม่มี Request เข้ามาเกิน 15 นาที เมื่อมี Request ใหม่เข้ามา อาจใช้เวลาประมาณ 30-50 วินาทีในการตื่น
- **แนวทางแก้ไข:**
  - สร้าง Health Monitor ฟรี (เช่น [UptimeRobot](https://uptimerobot.com/) หรือ [Cron-job.org](https://cron-job.org/)) ให้ยิง GET ไปที่ `https://your-backend.onrender.com/health` ทุกๆ 10-14 นาที เพื่อรักษาให้ Service ตื่นอยู่ตลอดเวลา

#### 3. ปัญหา CORS: `Access to fetch at ... has been blocked by CORS policy`
- **สาเหตุ:** Backend ไม่ได้อนุญาต Origin ของ Vercel
- **การแก้ไข:**
  - ตั้งค่า Environment Variable `CORS_ORIGIN` บน Render Dashboard ให้เป็น Domain ของ Frontend บน Vercel หรือปล่อยว่างไว้เพื่อให้ระบบใช้ค่าเริ่มต้นที่อนุญาตทุก Origin (`*`)

---

### 🔵 ปัญหาฝั่ง Vercel (Frontend React SPA)

#### 1. ข้อผิดพลาด: รีเฟรชหน้าเว็บที่ `/products` หรือ `/categories` แล้วขึ้นหน้า `404: NOT_FOUND`
- **สาเหตุ:** Vercel มุ่งค้นหาไฟล์ตาม path บน Web Server แต่ในระบบ SPA เส้นทาง URL ถูกควบคุมโดย React Router บนฝั่ง Client
- **การแก้ไข:** ตัวโปรเจกต์มีไฟล์ [`frontend/vercel.json`](file:///D:/backend-work/Product-management-app/frontend/vercel.json) บรรจุคำสั่ง:
  ```json
  {
    "rewrites": [
      { "source": "/(.*)", "destination": "/index.html" }
    ]
  }
  ```
  คำสั่งนี้จะสั่งให้ Vercel ส่งหน้า `index.html` เสมอในทุก URL ทำให้ React Router ทำงานได้อย่างต่อเนื่อง

#### 2. ข้อผิดพลาด: URL เรียก API กลายเป็นเบิ้ล Slash เช่น `https://api.render.com//api/products`
- **สาเหตุ:** ผู้ใช้ใส่เครื่องหมาย `/` ท้าย `VITE_API_URL` ในหน้าตั้งค่าของ Vercel
- **การแก้ไข:** ระบบถูกปรับให้ใช้ตัวแปลงกลางที่ [`frontend/src/config/api.js`](file:///D:/backend-work/Product-management-app/frontend/src/config/api.js):
  ```javascript
  const rawUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
  export const API_BASE_URL = rawUrl.replace(/\/+$/, "");
  ```
  ฟังก์ชันนี้จะตัดเครื่องหมาย Slash ที่ต่อท้ายออกโดยอัตโนมัติ ทำให้หมดปัญหา URL ซ้อน

---

### 🟢 ปัญหาฝั่ง Local & Docker

#### 1. ข้อผิดพลาด: `Bind for 0.0.0.0:5432 failed: port is already allocated`
- **สาเหตุ:** มี PostgreSQL อื่นรันค้างอยู่บนเครื่องคอมพิวเตอร์ของคุณที่พอร์ต 5432
- **การแก้ไข:** ใน [`docker-compose.yml`](file:///D:/backend-work/Product-management-app/docker-compose.yml) ได้ทำการแมปพอร์ตภายนอกออกเป็น **`5433:5432`** ไว้แล้ว หากต้องการเปลี่ยนเป็นพอร์ตอื่น สามารถแก้ไขได้ง่ายๆ ผ่านตัวแปร `POSTGRES_PORT` ในไฟล์ `.env`

#### 2. Backend สตาร์ทไม่ทันฐานข้อมูลใน Docker
- **สาเหตุ:** Backend พยายามต่อ Database ก่อนที่ Postgres จะเปิดรับ Connection
- **การแก้ไข:** ใน `docker-compose.yml` มีการใส่ `healthcheck` เช็คด้วย `pg_isready` และกำหนด `depends_on: { postgres-db: { condition: service_healthy } }` ร่วมกับระบบ Retry ใน `database.js` ทำให้คอนเทนเนอร์เริ่มทำงานตามลำดับอย่างปลอดภัย

---

<div align="center">

**Product Management App** พร้อมสำหรับการ Deploy และใช้งานจริงบน Production แล้ว 🚀

</div>
