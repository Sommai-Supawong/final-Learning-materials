# MASTER PROMPT: BESPOKE ARTISTIC REDESIGN — APPLE iOS GLASSMORPHISM & SOFT UI
## Domain: Learning Materials (ชุดที่ 5 สื่อการเรียนรู้) | Ultra-Custom Frontend Architecture | Zero-Template Aesthetic | 100% E2E Integrity

---

### ROLE & IDENTITY
Act as an elite **Principal Creative Technologist, Apple Human Interface (HIG) Specialist, Senior Design Systems Architect, and Lead QA Automation Engineer**.

Your objective is to completely demolish and rebuild the frontend layout, typography, surface materials, and interactive anatomy of the **Learning Materials (สื่อการเรียนรู้)** web application. 

You must replace the conventional web layout with a **bespoke, gallery-grade digital art experience** characterized by **Apple iOS Liquid Glassmorphism**, **tactile Soft UI**, and **intentional asymmetry**.

> **CRITICAL DIRECTIVE:** 
> - **BAN ALL TEMPLATE AESTHETICS:** Do NOT use standard flat cards, generic Bootstrap-style grids, rigid rectangular tables, or boilerplate Tailwind/DaisyUI default components.
> - **100% BUSINESS LOGIC & TEST INTEGRITY:** All existing data contracts (`id`, `title`, `creator`, `category`, `publishedDate`, `description`, `status`, `imageUrl`), API routes (`/api/learning-resources`), and all 21 Playwright E2E test selectors must be preserved and pass with a 100% green rate.

---

## 1. CORE DESIGN PHILOSOPHY & VISUAL LANGUAGE

### 1.1 Apple iOS-Grade Liquid Glassmorphism
- **Material Multi-Layering:** Surfaces are not simply transparent; they behave like physical optical glass. Use `backdrop-filter: blur(24px) saturate(190%)` with ultra-delicate multi-stop backgrounds (`rgba(255, 255, 255, 0.65)` in light mode, with subtle ambient light reflection).
- **Specular Highlight Borders:** Borders must emulate physical light refraction on chamfered glass edges using directional gradients:
  ```css
  border: 1px solid rgba(255, 255, 255, 0.45);
  box-shadow: 
    inset 0 1px 1px 0 rgba(255, 255, 255, 0.8),
    inset 0 -1px 1px 0 rgba(0, 0, 0, 0.04),
    0 20px 40px -15px rgba(0, 0, 0, 0.07);
  ```
- **Underlying Dynamic Ambient Mesh Canvas:** Place a soft, organic, floating background canvas behind the glass (flowing mesh gradients of soft platinum, frosted lavender, pearlescent slate, and subtle champagne gold) so that when elements scroll behind glass panels, the optical refraction is vividly apparent.

### 1.2 Tactile Soft UI (Continuous Squircle Ergonomics)
- **Squircle Radii:** Eliminate sharp 90-degree corners. Apply continuous curvature (`rounded-[2rem]` / `border-radius: 28px` to `36px`) for cards and floating modals; `rounded-2xl` for pills and buttons.
- **Layered Diffuse Depth:** Never use single harsh drop shadows. Use multi-tier diffuse ambient shadows that emulate soft studio lighting:
  ```css
  box-shadow: 
    0 2px 4px rgba(0,0,0,0.02),
    0 10px 20px -5px rgba(0,0,0,0.04),
    0 25px 50px -12px rgba(0,0,0,0.08);
  ```
- **Haptic Interaction Physics:** All buttons, cards, and interactive chips must react with spring-damped tactile easing (`cubic-bezier(0.16, 1, 0.3, 1)`):
  - Hover: subtle elevation lift (`translateY(-4px)`), increased specular luminescence, and inner glow.
  - Active / Press: physical tactile compression (`scale(0.97)`), mimicking iOS physical button clicks.

### 1.3 Editorial & Bespoke Typography System
- **Typography Pairing:**
  - Display / Headings: `Kanit` (Black / Bold / SemiBold) with tight letter-spacing (`tracking-tight`), editorial hierarchy, and subtle metallic or frosted text treatment.
  - Body / Metadata: Clean, legible sans-serif (`Inter`, system SF Pro Display, or Thai-optimized sans-serif) with balanced line heights (`leading-relaxed`).
- **Asymmetric Composition & Gallery Rhythms:**
  - Avoid predictable grids of identical boxes. Introduce hero resource spotlights, asymmetric staggered card layouts, editorial badge placements, and generous breathing whitespace.
  - Display metadata (`creator`, `publishedDate`, `category`) like high-end museum curation tags or luxury magazine metadata.

---

## 2. STRICT REQUIREMENTS FOR "TOPIC 5: สื่อการเรียนรู้"

Preserve all academic specifications for Set 5:
1. **Target Entity:** `LearningResource` (สื่อการเรียนรู้)
2. **7 Core Display & Edit Fields:**
   - `id`: Unique identifier (displayed subtly in badges or management cards)
   - `title`: Resource name (1–150 characters)
   - `creator`: Author / Creator (1–100 characters)
   - `category`: Category (`บทความ`, `วิดีโอ`, `แบบฝึกหัด`)
   - `publishedDate`: Publication date (`YYYY-MM-DD`)
   - `description`: Detailed overview / syllabus (1–2,000 characters)
   - `status`: Availability status (`true` = เผยแพร่แล้ว / Published, `false` = ฉบับร่าง / Draft)
3. **Cover Images:** External URL support with live thumbnail preview and graceful fallback images per category.
4. **Interactive Features:**
   - Real-time search by Title / Topic
   - Interactive category filter tabs (All, บทความ, วิดีโอ, แบบฝึกหัด)
   - Detailed Reading View Modal with rich typography and complete details
   - Management CRUD view with intuitive iOS-styled actions (Add, Edit, Delete with modal confirmation)

---

## 3. STEP-BY-STEP EXECUTION ROADMAP

### Step 1: Design System & CSS Foundation Overhaul
- Inspect `frontend/src/index.css` and `frontend/src/App.css`.
- Inject custom utility classes for:
  - `.glass-panel` (Apple iOS Frosted Glass container)
  - `.glass-pill` (Translucent floating badges and buttons)
  - `.glass-card` (Specular-bordered tactile resource cards)
  - `.mesh-ambient-bg` (Soft, non-distracting background glow)
  - Custom spring easing curves (`--ease-spring: cubic-bezier(0.16, 1, 0.3, 1)`)

### Step 2: Shell & Navigation Redesign (`MainLayout.jsx` & `Navbar.jsx`)
- Rebuild the navigation into a **Floating Island Header** (Dynamic Island / Floating Glass Capsule):
  - Fixed top floating pill with frosted glass backdrop blur and specular highlight.
  - Integration of official logo (`frontend/public/logo/LM-logo-small.png` / `LM-logo-full.png`) with crisp rendering.
  - Navigation tabs styled as fluid sliding glass segments.
  - Quick action button for `+ เพิ่มสื่อการเรียนรู้` with gradient glow.
- Footer redesigned as an ultra-minimal frosted glass bar with copyright and academic context.

### Step 3: Showcase Redesign (`HomePage.jsx`)
- **Artistic Hero Experience:**
  - Bold typography with luminous headline and subtle ambient badge.
  - Floating Live Stat Capsule (`#stat-total`, `#stat-articles`, `#stat-videos`, `#stat-worksheets`).
- **Interactive Control Bar:**
  - Integrated search input with glass pill styling and clear button.
  - Category selector styled as iOS segmented glass controls.
- **Resource Cards Grid (`#resources-cards-grid`):**
  - Continuous squircle card frames with specular border and soft diffuse shadow.
  - High-definition image cover with aspect-ratio preservation and category badge overlay.
  - Editorial metadata: Creator avatar pill, publication date with calendar icon, and status dot.
  - "อ่านรายละเอียด (Read More)" trigger opening the reading view modal.
- **Detailed Reading View Modal:**
  - Frosted glass overlay with backdrop blur.
  - Full-width hero cover image, metadata pill bar, clear typography for description, and smooth close interaction.

### Step 4: Management & Form Experience Redesign
- **Management View (`LearningResourcePage.jsx`):**
  - iOS-style list/card hybrid with quick search, category tags, clear status badges, and glass action buttons (Edit, Delete).
  - Modern Soft UI confirmation dialog for safe deletions.
- **Form Interface (`LearningResourceFormPage.jsx`):**
  - Glassmorphic form panel with live side-by-side card preview updating in real-time as the user types URL, title, or category.
  - Soft-focus input fields with glowing borders on focus.
  - Segmented radio buttons or custom selects for categories and status toggle.

### Step 5: Test Automation & Regression Guard (Playwright E2E)
- Verify that every E2E test selector remains active:
  - `#navbar-brand`, `#navbar-btn-home`, `#navbar-btn-manage`, `#navbar-btn-add`
  - `#search-input`, `#filter-category-all`, `#filter-category-บทความ`, `#filter-category-วิดีโอ`, `#filter-category-แบบฝึกหัด`
  - `#resources-cards-grid`, `[id^="resource-card-"]`, `[id^="btn-read-card-"]`, `#modal-reading-view`
  - `#form-learning-resource`, `#input-title`, `#input-creator`, `#select-category`, `#input-published-date`, `#input-description`, `#input-image-url`, `#btn-submit-form`
  - `#btn-confirm-delete`, `#btn-cancel-delete`
- Execute `npx playwright test` (or `npx.cmd playwright test` on Windows).
- **CRITICAL:** If any test fails, inspect the trace/screenshot, fix the component immediately, and re-run until all 21/21 tests pass with zero errors.

---

## 4. CONSTRAINTS & GUARANTEES
1. **Zero Regressions:** Do NOT break backend APIs (`/api/learning-resources`). Keep the database schema intact.
2. **Performance-First Glass:** Use hardware-accelerated CSS properties (`will-change: transform`, `transform: translateZ(0)`) to maintain 60 FPS scrolling even with multiple glass filters.
3. **Accessibility:** Text contrast on glass panels must adhere to WCAG AA standards (high-contrast text colors on top of blur backgrounds).
4. **Self-Correction Rule:** Do not ask for clarification on design choices—execute boldly with high artistic standards and verify with automated tests.

---

**COMMAND TO EXECUTE:**
Begin the redesign starting with Step 1. Rebuild the frontend into a bespoke Apple iOS Glassmorphism masterpiece and ensure all E2E tests are 100% green before completing.
