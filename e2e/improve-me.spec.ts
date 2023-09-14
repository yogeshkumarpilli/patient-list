import { test, expect } from "@playwright/test";

/**
 * This test runs but can be improved
 *
 * Find ways to improve this test
 */

test.describe("Patients", () => {
  test("should have patient Laurence Fournier", async ({ page }) => {
    await page.goto("http://localhost:5173/");
    const line = page.locator("tr", { hasText: "Laurence Fournier" });
    const cells = line.locator("td");
    await expect(cells.nth(0)).toHaveText("Laurence Fournier");
    await expect(cells.nth(1)).toHaveText("Post TAVI");
    await expect(cells.nth(2)).toHaveText("21");
    await expect(cells.nth(3)).toHaveText("3/12/2023");
  });

  test("should have patient Françoise Fournier", async ({ page }) => {
    await page.goto("http://localhost:5173/");
    const line = page.locator("tr", { hasText: "Françoise Fournier" });
    const cells = line.locator("td");
    await expect(cells.nth(0)).toHaveText("Françoise Fournier");
    await expect(cells.nth(1)).toHaveText("Post PVC Ablation");
    await expect(cells.nth(2)).toHaveText("31");
    await expect(cells.nth(3)).toHaveText("3/18/2023");
  });

  test("should have patient Clotilde Sanchez", async ({ page }) => {
    await page.goto("http://localhost:5173/");
    const line = page.locator("tr", { hasText: "Clotilde Sanchez" });
    const cells = line.locator("td");
    await expect(cells.nth(0)).toHaveText("Clotilde Sanchez");
    await expect(cells.nth(1)).toHaveText("Palpitations");
    await expect(cells.nth(2)).toHaveText("38");
    await expect(cells.nth(3)).toHaveText("1/25/2023");
  });
});

test.describe("Filters", () => {
  test("should filter by patient name", async ({ page }) => {
    await page.goto("http://localhost:5173/");
    await page.waitForTimeout(2000);
    await page.mouse.click(120, 175);
    await page.keyboard.type("rou");

    const lines = page.locator("tr");
    await expect(lines).toHaveCount(4);
    await expect(lines.nth(1)).toContainText("Célestin Roussel");
    await expect(lines.nth(2)).toContainText("Ascension Roussel");
    await expect(lines.nth(3)).toContainText("Christiane Rousseau");
  });

  test("should filter by indication", async ({ page }) => {
    await page.goto("http://localhost:5173/");
    await page.waitForTimeout(2000);
    await page.mouse.click(120, 175);
    await page.keyboard.press("Tab");
    await page.keyboard.press("P");
    await page.keyboard.press("P");

    const lines = page.locator("tr");
    await expect(lines.nth(1).locator("td").nth(1)).toHaveText("Palpitations");
    await expect(lines.nth(2).locator("td").nth(1)).toHaveText("Palpitations");
    await expect(lines.nth(3).locator("td").nth(1)).toHaveText("Palpitations");
    await expect(lines.nth(4).locator("td").nth(1)).toHaveText("Palpitations");
    await expect(lines.nth(5).locator("td").nth(1)).toHaveText("Palpitations");
    await expect(lines.nth(6).locator("td").nth(1)).toHaveText("Palpitations");
    await expect(lines.nth(7).locator("td").nth(1)).toHaveText("Palpitations");
    await expect(lines.nth(8).locator("td").nth(1)).toHaveText("Palpitations");
    await expect(lines.nth(9).locator("td").nth(1)).toHaveText("Palpitations");
    await expect(lines.nth(10).locator("td").nth(1)).toHaveText("Palpitations");
  });
});
