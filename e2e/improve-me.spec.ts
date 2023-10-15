
/**
 * This test runs but can be improved
 *
 * Find ways to improve this test
 */
import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:5173/";

test.describe("Patients", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  const testCases = [
    { name: "Laurence Fournier", indication: "Post TAVI", age: "21", date: "3/12/2023" },
    { name: "Françoise Fournier", indication: "Post PVC Ablation", age: "31", date: "3/18/2023" },
    { name: "Clotilde Sanchez", indication: "Palpitations", age: "38", date: "1/25/2023" },
  ];

  for (const testCase of testCases) {
    test(`should have patient ${testCase.name}`, async ({ page }) => {
      const line = page.locator(`tr:has-text("${testCase.name}")`);
      const cells = line.locator("td");

      await expect(cells.nth(0)).toHaveText(testCase.name);
      await expect(cells.nth(1)).toHaveText(testCase.indication);
      await expect(cells.nth(2)).toHaveText(testCase.age);
      await expect(cells.nth(3)).toHaveText(testCase.date);
    });
  }
});

test.describe("Filters", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test("should filter by patient name", async ({ page }) => {
    await page.locator('xpath=//input[@class="chakra-input css-179hgeo"]').fill("rou")

    const lines = page.locator("tr");
    await expect(lines).toHaveCount(4);
    await expect(lines.nth(1)).toContainText("Célestin Roussel");
    await expect(lines.nth(2)).toContainText("Ascension Roussel");
    await expect(lines.nth(3)).toContainText("Christiane Rousseau");
  });

  test("should filter by indication", async ({ page }) => {
    await page.locator('select[class="chakra-select css-9zgf1d"]').selectOption('palpitations');
    
    const lines = page.locator("tr");
    for (let i = 1; i <= 10; i++) {
      await expect(lines.nth(i).locator("td").nth(1)).toHaveText("Palpitations");
    }
  });
});
