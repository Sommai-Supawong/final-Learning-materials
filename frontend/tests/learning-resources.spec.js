import { test, expect } from "@playwright/test";

test.describe("Learning Resources — Mandatory 14 Quality & Specification Scenarios", () => {
  const BACKEND_URL = "http://localhost:5000";

  // Scenario 1: Load page & display data
  test("1. Load page & display data: Successfully loads showcase with resource cards", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Learning materials/);
    await expect(page.locator("#resources-cards-grid")).toBeVisible();

    const cards = page.locator('[id^="resource-card-"]');
    await expect(cards.first()).toBeVisible();
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(1);

    const firstCard = cards.first();
    await expect(firstCard.locator("img")).toBeVisible();
    await expect(firstCard.locator("h3")).not.toBeEmpty();
  });

  // Scenario 2: Successfully create a new resource (expect 201)
  test("2. Successfully create a new resource (expect 201): Submits valid resource data", async ({
    request,
    page,
  }) => {
    const timestamp = Date.now();
    const newResource = {
      title: `E2E Spec Resource ${timestamp}`,
      creator: "Dr. Elizabeth Stone",
      category: "บทความ",
      publishedDate: "2026-06-20",
      description: "Comprehensive automated test resource for E2E validation.",
      imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800",
      status: true,
    };

    const res = await request.post(`${BACKEND_URL}/api/learning-resources`, {
      data: newResource,
    });
    expect(res.status()).toBe(201);
    const createdItem = await res.json();
    expect(createdItem.id).toBeDefined();
    expect(createdItem.title).toBe(newResource.title);

    // Verify UI reflects newly created resource
    await page.goto("/learning-resources");
    await expect(page.locator("body")).toContainText(newResource.title);
  });

  // Scenario 3: Fail to create (Validation): Send empty spaces for title (expect 400)
  test("3. Fail to create (Validation): Send empty spaces for title (expect 400)", async ({
    request,
  }) => {
    const invalidPayload = {
      title: "       ",
      creator: "Valid Creator Name",
      category: "บทความ",
      publishedDate: "2026-06-20",
      description: "Valid description body for testing validation rules.",
      status: true,
    };

    const res = await request.post(`${BACKEND_URL}/api/learning-resources`, {
      data: invalidPayload,
    });
    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.message || JSON.stringify(body)).toContain("ช่องว่างล้วน");
  });

  // Scenario 4: Fail to create (Validation): Send invalid category (expect 400)
  test("4. Fail to create (Validation): Send invalid category (expect 400)", async ({
    request,
  }) => {
    const invalidPayload = {
      title: "Valid Title Test",
      creator: "Valid Creator Name",
      category: "NotAnAllowedCategory123",
      publishedDate: "2026-06-20",
      description: "Valid description body for testing validation rules.",
      status: true,
    };

    const res = await request.post(`${BACKEND_URL}/api/learning-resources`, {
      data: invalidPayload,
    });
    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.message || JSON.stringify(body)).toContain("หมวดหมู่");
  });

  // Scenario 5: View resource details (all fields display correctly)
  test("5. View resource details: Displays all metadata fields in reading view modal", async ({
    page,
  }) => {
    await page.goto("/");

    const firstReadBtn = page.locator('button[id^="btn-read-card-"]').first();
    await expect(firstReadBtn).toBeVisible();
    await firstReadBtn.click();

    const modal = page.locator("#modal-reading-view");
    await expect(modal).toBeVisible();

    // Verify all fields are displayed
    await expect(page.locator("#reading-modal-title")).not.toBeEmpty();
    await expect(page.locator("#reading-modal-creator")).not.toBeEmpty();
    await expect(page.locator("#reading-modal-date")).not.toBeEmpty();
    await expect(page.locator("#reading-modal-description")).not.toBeEmpty();

    // Close modal
    await page.click("#btn-close-reading");
    await expect(modal).not.toBeVisible();
  });

  // Scenario 6: Edit a resource successfully (UI and DB match)
  test("6. Edit a resource successfully: Updates resource fields with UI and DB persistence", async ({
    page,
    request,
  }) => {
    // 1. Seed item for edit
    const seed = await request.post(`${BACKEND_URL}/api/learning-resources`, {
      data: {
        title: `Seed Before Edit ${Date.now()}`,
        creator: "Original Author",
        category: "วิดีโอ",
        publishedDate: "2026-05-10",
        description: "Initial description before performing edit test.",
        status: true,
      },
    });
    const item = await seed.json();

    // 2. Perform edit via form UI
    await page.goto(`/learning-resources/edit/${item.id}`);

    const updatedTitle = `Edited Successfully ${Date.now()}`;
    const updatedCreator = "Professor Robert Miller";
    const updatedDesc = "Updated description persisted across UI and Database.";

    await page.fill("#input-title", updatedTitle);
    await page.fill("#input-creator", updatedCreator);
    await page.selectOption("#select-category", "แบบฝึกหัด");
    await page.fill("#input-description", updatedDesc);
    await page.click("#status-draft");
    await page.click("#btn-submit-form");

    // 3. Verify in UI
    await expect(page).toHaveURL(/.*\/learning-resources/);
    await expect(page.locator("body")).toContainText(updatedTitle);

    // 4. Verify in DB
    const dbCheck = await request.get(`${BACKEND_URL}/api/learning-resources/${item.id}`);
    expect(dbCheck.status()).toBe(200);
    const dbItem = await dbCheck.json();
    expect(dbItem.title).toBe(updatedTitle);
    expect(dbItem.creator).toBe(updatedCreator);
    expect(dbItem.category).toBe("แบบฝึกหัด");
    expect(dbItem.status).toBe(false);
  });

  // Scenario 7: Cancel delete operation (data remains)
  test("7. Cancel delete operation: Cancelling dialog preserves resource in UI and DB", async ({
    page,
    request,
  }) => {
    const seed = await request.post(`${BACKEND_URL}/api/learning-resources`, {
      data: {
        title: `Item Preserve On Cancel ${Date.now()}`,
        creator: "Preserve Creator",
        category: "บทความ",
        publishedDate: "2026-03-01",
        description: "This item must not be deleted when cancel is pressed.",
        status: true,
      },
    });
    const item = await seed.json();

    await page.goto("/learning-resources");
    await page.click(`#btn-delete-${item.id}`);

    const modal = page.locator("#modal-resource-delete");
    await expect(modal).toBeVisible();

    // Cancel deletion
    await page.click("#btn-cancel-delete");
    await expect(modal).not.toBeVisible();
    await expect(page.locator(`#resource-row-${item.id}`)).toBeVisible();

    // Verify still in DB
    const dbCheck = await request.get(`${BACKEND_URL}/api/learning-resources/${item.id}`);
    expect(dbCheck.status()).toBe(200);
  });

  // Scenario 8: Confirm delete operation (data removed from UI and DB)
  test("8. Confirm delete operation: Confirming deletion removes item from UI and DB", async ({
    page,
    request,
  }) => {
    const seed = await request.post(`${BACKEND_URL}/api/learning-resources`, {
      data: {
        title: `Item To Delete Permanent ${Date.now()}`,
        creator: "Delete Target Creator",
        category: "วิดีโอ",
        publishedDate: "2026-04-01",
        description: "This item must be permanently deleted.",
        status: true,
      },
    });
    const item = await seed.json();

    await page.goto("/learning-resources");
    await page.click(`#btn-delete-${item.id}`);
    await page.click("#btn-confirm-delete");

    // Verify removed from UI
    await expect(page.locator(`#resource-row-${item.id}`)).not.toBeVisible();

    // Verify removed from DB (404)
    const dbCheck = await request.get(`${BACKEND_URL}/api/learning-resources/${item.id}`);
    expect(dbCheck.status()).toBe(404);
  });

  // Scenario 9: Search by partial title AND filter by category simultaneously
  test("9. Search by partial title AND filter by category simultaneously", async ({
    page,
    request,
  }) => {
    const uniqueKey = `SpecSearch_${Date.now()}`;
    await request.post(`${BACKEND_URL}/api/learning-resources`, {
      data: {
        title: `React Performance Guide ${uniqueKey}`,
        creator: "Author Search Test",
        category: "บทความ",
        publishedDate: "2026-01-10",
        description: "Search target item matching both keyword and category.",
        status: true,
      },
    });

    await page.goto("/");
    await page.fill("#home-search-input", uniqueKey);
    await page.click("#cat-filter-บทความ");
    await page.click("#home-btn-search");
    await page.waitForTimeout(300);

    const cards = page.locator('[id^="resource-card-"]');
    await expect(cards.first()).toBeVisible();
    await expect(page.locator("body")).toContainText(uniqueKey);
    await expect(page.locator("body")).toContainText("บทความ");
  });

  // Scenario 10: Search not found (expect 200 with empty state/message)
  test("10. Search not found: Expect 200 with empty array and graceful empty state UI", async ({
    page,
    request,
  }) => {
    const nonExistentKeyword = `RANDOM_NONEXISTENT_KEYWORD_${Date.now()}`;

    // 1. API Verification
    const apiRes = await request.get(
      `${BACKEND_URL}/api/learning-resources?search=${nonExistentKeyword}`
    );
    expect(apiRes.status()).toBe(200);
    const data = await apiRes.json();
    expect(Array.isArray(data)).toBeTruthy();
    expect(data.length).toBe(0);

    // 2. UI Verification
    await page.goto("/");
    await page.fill("#home-search-input", nonExistentKeyword);
    await page.click("#home-btn-search");
    await page.waitForTimeout(300);

    await expect(page.locator("body")).toContainText("ไม่พบสื่อการเรียนรู้ที่ตรงกับเงื่อนไข");
  });

  // Scenario 11: Read, Edit, or Delete a non-existent ID (expect 404)
  test("11. Read, Edit, or Delete a non-existent ID (expect 404)", async ({
    request,
  }) => {
    const nonExistentId = 99999999;

    const resGet = await request.get(`${BACKEND_URL}/api/learning-resources/${nonExistentId}`);
    expect(resGet.status()).toBe(404);

    const resPut = await request.put(`${BACKEND_URL}/api/learning-resources/${nonExistentId}`, {
      data: { title: "Attempt Update Nonexistent" },
    });
    expect(resPut.status()).toBe(404);

    const resDelete = await request.delete(`${BACKEND_URL}/api/learning-resources/${nonExistentId}`);
    expect(resDelete.status()).toBe(404);
  });

  // Scenario 12: Send a non-positive integer ID (expect 400)
  test("12. Send a non-positive integer ID (expect 400)", async ({
    request,
  }) => {
    const resString = await request.get(`${BACKEND_URL}/api/learning-resources/invalid-string-id`);
    expect(resString.status()).toBe(400);

    const resNegative = await request.get(`${BACKEND_URL}/api/learning-resources/-5`);
    expect(resNegative.status()).toBe(400);

    const resZero = await request.get(`${BACKEND_URL}/api/learning-resources/0`);
    expect(resZero.status()).toBe(400);
  });

  // Scenario 13: Data persistence check (Refresh page, data remains)
  test("13. Data persistence check: Refreshing the page retains persisted data", async ({
    page,
    request,
  }) => {
    const uniqueTitle = `Persistence Verification ${Date.now()}`;
    await request.post(`${BACKEND_URL}/api/learning-resources`, {
      data: {
        title: uniqueTitle,
        creator: "Persistence Specialist",
        category: "บทความ",
        publishedDate: "2026-02-15",
        description: "Checking that page reload maintains database data.",
        status: true,
      },
    });

    await page.goto("/");
    await expect(page.locator("body")).toContainText(uniqueTitle);

    // Refresh page
    await page.reload();
    await page.waitForTimeout(300);
    await expect(page.locator("body")).toContainText(uniqueTitle);
  });

  // Scenario 14: API Error handling (Simulate backend failure, UI shows graceful error)
  test("14. API Error handling: Simulates backend failure and validates graceful error UI", async ({
    page,
  }) => {
    // Intercept backend call and simulate server 500 error
    await page.route("**/api/learning-resources*", (route) => {
      route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ message: "Simulated Internal Server Failure 500" }),
      });
    });

    await page.goto("/");

    // Verify graceful error state is rendered and no crash occurs
    await expect(page.locator("body")).toContainText(/Simulated Internal Server Failure 500|Unable to connect|ไม่สามารถเชื่อมต่อ/);
    await expect(page.locator("button:has-text('Retry')")).toBeVisible();
  });
});
