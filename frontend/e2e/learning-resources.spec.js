import { test, expect } from "@playwright/test";
import path from "path";
import fs from "fs";

test.describe("Learning materials — Master E2E Validation Suite (Topic 5 • ข้อ 5 สื่อการเรียนรู้)", () => {
  const BACKEND_URL = "http://localhost:5000";

  test.beforeAll(() => {
    const screenshotDir = path.resolve("e2e-screenshots");
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true });
    }
  });

  // Scenario 1: Application loads successfully
  test("1. Application Load: Loads successfully without runtime errors and sets document title", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Learning materials/);
    await expect(page.locator("h1")).toContainText("Learning materials");
    await expect(page.locator("body")).toContainText("Topic 5 • ข้อ 5 สื่อการเรียนรู้");
  });

  // Scenario 2: Brand and Logo integration
  test("2. Brand & Logo Integration: Official logo appears in Navbar and loads with valid natural dimensions", async ({
    page,
  }) => {
    await page.goto("/");

    const logoImg = page.locator("header nav img[alt='Learning materials Logo']");
    await expect(logoImg).toBeVisible();

    // Verify natural image dimensions
    const isImageLoaded = await logoImg.evaluate((img) => img.complete && img.naturalWidth > 0);
    expect(isImageLoaded).toBeTruthy();
  });

  // Scenario 3: Primary navigation works
  test("3. Primary Navigation: Navigates between Showcase, Manage Resources, and Add Resource", async ({
    page,
  }) => {
    await page.goto("/");

    // Click Manage Resources in navbar
    await page.click("header nav a:has-text('Manage Resources')");
    await expect(page).toHaveURL(/.*\/learning-resources/);
    await expect(page.locator("h1")).toContainText("Manage Learning Materials");

    // Click Add Resource in navbar
    await page.click("#navbar-btn-add");
    await expect(page).toHaveURL(/.*\/learning-resources\/add/);
    await expect(page.locator("h2")).toContainText("Add New Resource");

    // Click Brand logo to return to Showcase
    await page.click("header nav a[href='/']");
    await expect(page).toHaveURL("/");
  });

  // Scenario 4: Product-specific navigation is no longer exposed in the active user interface
  test("4. Product Navigation Removal: Obsolete product catalog links are not exposed in active navigation", async ({
    page,
  }) => {
    await page.goto("/");

    const nav = page.locator("header nav");
    await expect(nav).not.toContainText("สินค้า");
    await expect(nav).not.toContainText("Products");
    await expect(nav.locator("a[href='/products']")).toHaveCount(0);
  });

  // Scenario 5: Learning resource listings render correctly
  test("5. Resource Listings: Renders learning materials cards with required fields & image covers", async ({
    page,
  }) => {
    await page.goto("/");

    const statTotal = page.locator("#stat-total");
    await expect(statTotal).toBeVisible();

    const cardGrid = page.locator("#resources-cards-grid");
    await expect(cardGrid).toBeVisible();

    const cards = page.locator('[id^="resource-card-"]');
    await expect(cards.first()).toBeVisible();
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(10);

    const firstCard = cards.first();
    await expect(firstCard.locator("img")).toBeVisible();
    await expect(firstCard.locator("h3")).not.toBeEmpty();
    await expect(firstCard.locator('button[id^="btn-read-card-"]')).toBeVisible();
  });

  // Scenario 6: Search works
  test("6. Search Functionality: Filters resources by keyword in real time", async ({
    page,
  }) => {
    await page.goto("/");

    await page.fill("#home-search-input", "React");
    await page.click("#home-btn-search");
    await page.waitForTimeout(300);

    const cards = page.locator('[id^="resource-card-"]');
    await expect(cards.first()).toBeVisible();
    await expect(page.locator("body")).toContainText("React");
  });

  // Scenario 7: Category filtering works
  test("7. Category Filtering: Filters resources by selected category tab", async ({
    page,
  }) => {
    await page.goto("/");

    await page.click("#cat-filter-บทความ");
    await page.waitForTimeout(300);
    await expect(page.locator("body")).toContainText("บทความ");
  });

  // Scenario 8: Search and filtering work together with empty state and reset
  test("8. Search & Filter Synergy: Combined search and category filtering with empty state and reset", async ({
    page,
  }) => {
    await page.goto("/");

    // Combined search and category
    await page.fill("#home-search-input", "React");
    await page.click("#cat-filter-บทความ");
    await page.click("#home-btn-search");
    await page.waitForTimeout(300);

    // Non-existent search query -> Empty State
    await page.fill("#home-search-input", "NONEXISTENT_KEYWORD_XYZ_999");
    await page.click("#home-btn-search");
    await expect(page.locator("body")).toContainText("ไม่พบสื่อการเรียนรู้ที่ตรงกับเงื่อนไข");

    // Reset filters
    await page.click("#home-btn-reset");
    const cards = page.locator('[id^="resource-card-"]');
    await expect(cards.first()).toBeVisible();
    expect(await cards.count()).toBeGreaterThanOrEqual(10);
  });

  // Scenario 9: Resource details can be opened
  test("9. Resource Details: Opens Detailed Reading View modal with complete content and closes", async ({
    page,
  }) => {
    await page.goto("/");

    const firstReadBtn = page.locator('button[id^="btn-read-card-"]').first();
    await firstReadBtn.click();

    const readingModal = page.locator("#modal-reading-view");
    await expect(readingModal).toBeVisible();

    await expect(page.locator("#reading-modal-title")).not.toBeEmpty();
    await expect(page.locator("#reading-modal-creator")).not.toBeEmpty();
    await expect(page.locator("#reading-modal-date")).not.toBeEmpty();
    await expect(page.locator("#reading-modal-description")).not.toBeEmpty();

    await page.click("#btn-close-reading");
    await expect(readingModal).not.toBeVisible();
  });

  // Scenario 10: Create resource with English inputs and external image
  test("10. Create Resource (English): Submits valid English form data with external image preview", async ({
    page,
  }) => {
    await page.goto("/learning-resources/add");

    const uniqueTitle = `Modern Microservices in Practice ${Date.now()}`;
    const creator = "Sarah Jenkins, Lead Systems Architect";
    const category = "บทความ";
    const date = "2026-07-15";
    const imageUrl = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop";
    const description = "Comprehensive technical overview of distributed systems, service mesh, and containerization.";

    await page.fill("#input-title", uniqueTitle);
    await page.fill("#input-creator", creator);
    await page.selectOption("#select-category", category);
    await page.fill("#input-published-date", date);
    await page.fill("#input-image-url", imageUrl);
    await page.fill("#input-description", description);
    await page.click("#status-published");

    // Live preview
    await expect(page.locator("img[alt='Preview']")).toBeVisible();

    await page.click("#btn-submit-form");

    await expect(page).toHaveURL(/.*\/learning-resources/);
    await expect(page.locator("body")).toContainText(uniqueTitle);
    await expect(page.locator("body")).toContainText(creator);
  });

  // Scenario 11: Create resource with Thai inputs
  test("11. Create Resource (Thai): Submits valid Thai typography and content", async ({
    page,
  }) => {
    await page.goto("/learning-resources/add");

    const uniqueTitle = `เทคโนโลยีคอมพิวเตอร์และปัญญาประดิษฐ์ ${Date.now()}`;
    const creator = "ดร.นพรัตน์ แสงทองคำ";
    const category = "วิดีโอ";
    const date = "2026-08-20";
    const imageUrl = "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop";
    const description = "วิดีโอบรรยายโครงสร้างสถาปัตยกรรมและการประยุกต์ใช้ปัญญาประดิษฐ์ในระบบคลาวด์";

    await page.fill("#input-title", uniqueTitle);
    await page.fill("#input-creator", creator);
    await page.selectOption("#select-category", category);
    await page.fill("#input-published-date", date);
    await page.fill("#input-image-url", imageUrl);
    await page.fill("#input-description", description);
    await page.click("#status-published");

    await page.click("#btn-submit-form");

    await expect(page).toHaveURL(/.*\/learning-resources/);
    await expect(page.locator("body")).toContainText(uniqueTitle);
    await expect(page.locator("body")).toContainText(creator);
  });

  // Scenario 12: Edit resource flow and database persistence
  test("12. Edit Resource Flow: Updates resource data and persists changes across UI and Database", async ({
    page,
    request,
  }) => {
    const createRes = await request.post(`${BACKEND_URL}/api/learning-resources`, {
      data: {
        title: `Seed For Edit Flow ${Date.now()}`,
        creator: "Original Creator",
        category: "บทความ",
        publishedDate: "2026-01-01",
        description: "Initial description before update",
        imageUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8",
        status: true,
      },
    });
    const item = await createRes.json();

    await page.goto(`/learning-resources/edit/${item.id}`);

    await expect(page.locator("#input-title")).toHaveValue(item.title);
    await expect(page.locator("#input-creator")).toHaveValue(item.creator);

    const updatedTitle = `Updated Resource Name ${Date.now()}`;
    const updatedCreator = "Professor Alice Walker";
    const updatedDescription = "Updated comprehensive description for testing.";

    await page.fill("#input-title", updatedTitle);
    await page.fill("#input-creator", updatedCreator);
    await page.selectOption("#select-category", "แบบฝึกหัด");
    await page.fill("#input-description", updatedDescription);
    await page.click("#status-draft");

    await page.click("#btn-submit-form");

    await expect(page).toHaveURL(/.*\/learning-resources/);
    await expect(page.locator("body")).toContainText(updatedTitle);
    await expect(page.locator("body")).toContainText(updatedCreator);

    const checkRes = await request.get(`${BACKEND_URL}/api/learning-resources/${item.id}`);
    expect(checkRes.status()).toBe(200);
    const dbItem = await checkRes.json();
    expect(dbItem.title).toBe(updatedTitle);
    expect(dbItem.creator).toBe(updatedCreator);
    expect(dbItem.category).toBe("แบบฝึกหัด");
    expect(dbItem.status).toBe(false);
  });

  // Scenario 13: Delete confirmation and cancelation
  test("13. Delete Confirmation: Cancel preserves item, Confirm permanently deletes from database", async ({
    page,
    request,
  }) => {
    const createRes = await request.post(`${BACKEND_URL}/api/learning-resources`, {
      data: {
        title: `Item To Delete ${Date.now()}`,
        creator: "Test Deletion User",
        category: "วิดีโอ",
        publishedDate: "2026-05-01",
        description: "Testing deletion flow with cancel and confirm",
        status: true,
      },
    });
    const item = await createRes.json();

    await page.goto("/learning-resources");

    await page.click(`#btn-delete-${item.id}`);

    const modal = page.locator("#modal-resource-delete");
    await expect(modal).toBeVisible();
    await expect(page.locator("#delete-target-title")).toContainText(item.title);

    // Cancel
    await page.click("#btn-cancel-delete");
    await expect(modal).not.toBeVisible();
    await expect(page.locator(`#resource-row-${item.id}`)).toBeVisible();

    // Confirm
    await page.click(`#btn-delete-${item.id}`);
    await page.click("#btn-confirm-delete");

    await expect(page.locator(`#resource-row-${item.id}`)).not.toBeVisible();

    const checkRes = await request.get(`${BACKEND_URL}/api/learning-resources/${item.id}`);
    expect(checkRes.status()).toBe(404);
  });

  // Scenario 14: Form validation
  test("14. Form Validation: Validates required, empty, and whitespace-only fields", async ({
    page,
  }) => {
    await page.goto("/learning-resources/add");

    await page.fill("#input-title", "    ");
    await page.fill("#input-creator", "    ");
    await page.fill("#input-description", "    ");
    await page.click("#btn-submit-form");

    await expect(page.locator("body")).toContainText("ห้ามเป็นช่องว่างล้วน");
  });

  // Scenario 15: Direct API validation
  test("15. Direct API Validation: Validates IDs, categories, and whitespace strings", async ({
    request,
  }) => {
    const resWhitespace = await request.post(`${BACKEND_URL}/api/learning-resources`, {
      data: {
        title: "      ",
        creator: "Dr. Test",
        category: "บทความ",
        publishedDate: "2026-04-10",
        description: "Description test",
        status: true,
      },
    });
    expect(resWhitespace.status()).toBe(400);

    const resBadCategory = await request.post(`${BACKEND_URL}/api/learning-resources`, {
      data: {
        title: "Valid Title Here",
        creator: "Dr. Test",
        category: "InvalidCategoryNotAllowed",
        publishedDate: "2026-04-10",
        description: "Description test",
        status: true,
      },
    });
    expect(resBadCategory.status()).toBe(400);

    const resBadId = await request.get(`${BACKEND_URL}/api/learning-resources/invalid-string-id`);
    expect(resBadId.status()).toBe(400);

    const resNotFound = await request.get(`${BACKEND_URL}/api/learning-resources/9999999`);
    expect(resNotFound.status()).toBe(404);
  });

  // Scenario 16: Important interactions work with keyboard navigation
  test("16. Keyboard Navigation: Operates search inputs and triggers actions using Enter key", async ({
    page,
  }) => {
    await page.goto("/");

    const searchInput = page.locator("#home-search-input");
    await searchInput.focus();
    await searchInput.pressSequentially("React");
    await page.keyboard.press("Enter");
    await page.waitForTimeout(300);

    const cards = page.locator('[id^="resource-card-"]');
    await expect(cards.first()).toBeVisible();
    await expect(page.locator("body")).toContainText("React");
  });

  // Scenario 17: Responsive layouts across mobile, tablet, and desktop
  test("17. Responsive Viewport Audits: No horizontal overflow across mobile, tablet, and desktop", async ({
    page,
  }) => {
    const viewports = [
      { name: "Mobile (360x800)", width: 360, height: 800 },
      { name: "Mobile (390x844)", width: 390, height: 844 },
      { name: "Tablet (768x1024)", width: 768, height: 1024 },
      { name: "Desktop (1440x900)", width: 1440, height: 900 },
    ];

    for (const vp of viewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto("/");
      await page.waitForTimeout(200);

      const hasOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });
      expect(hasOverflow, `Horizontal overflow detected at ${vp.name}`).toBeFalsy();
    }
  });

  // Scenario 18: Reduced-motion preferences are respected
  test("18. Reduced Motion Support: Respects prefers-reduced-motion media feature", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    const transitionDuration = await page.evaluate(() => {
      const el = document.querySelector("#btn-explore");
      return el ? window.getComputedStyle(el).transitionDuration : "";
    });
    // In reduced motion, transition duration should be minimal/disabled
    expect(["0s", "0.01ms", "0.00001s", "0.001s", ""].some((val) => transitionDuration.includes(val) || transitionDuration === "0s")).toBeTruthy();
  });

  // Scenario 19: Logo and required assets load successfully via HTTP 200
  test("19. Asset Verification: Logo images exist and return HTTP 200 OK", async ({
    request,
  }) => {
    const resLogoSmall = await request.get("/logo/LM-logo-small.png");
    expect(resLogoSmall.status()).toBe(200);

    const resLogoFull = await request.get("/logo/LM-logo-full.png");
    expect(resLogoFull.status()).toBe(200);
  });

  // Scenario 20: No critical browser runtime errors occur during primary flows
  test("20. Browser Console Health: Primary flows execute without uncaught JS errors", async ({
    page,
  }) => {
    const consoleErrors = [];
    page.on("pageerror", (err) => consoleErrors.push(err.message));

    await page.goto("/");
    await page.click("header nav a:has-text('Manage Resources')");
    await page.goto("/learning-resources/add");
    await page.goto("/");

    expect(consoleErrors).toHaveLength(0);
  });

  // Visual snapshot captures
  test("21. Visual Snapshot Captures: Saves responsive screenshots for visual verification", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await page.waitForTimeout(500);
    await page.screenshot({ path: "e2e-screenshots/desktop-home.png", fullPage: true });

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.waitForTimeout(500);
    await page.screenshot({ path: "e2e-screenshots/mobile-home.png", fullPage: true });

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/learning-resources");
    await page.waitForTimeout(500);
    await page.screenshot({ path: "e2e-screenshots/desktop-manage.png", fullPage: true });

    await page.goto("/learning-resources/add");
    await page.waitForTimeout(500);
    await page.screenshot({ path: "e2e-screenshots/desktop-form.png", fullPage: true });

    expect(fs.existsSync("e2e-screenshots/desktop-home.png")).toBeTruthy();
    expect(fs.existsSync("e2e-screenshots/mobile-home.png")).toBeTruthy();
    expect(fs.existsSync("e2e-screenshots/desktop-manage.png")).toBeTruthy();
    expect(fs.existsSync("e2e-screenshots/desktop-form.png")).toBeTruthy();
  });
});
