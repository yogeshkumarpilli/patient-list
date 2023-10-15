/**
 * These test cases do not work.
 *
 * Try to find what's wrong and propose a way to fix them.
 *
 */

import { expect, test } from "@playwright/test";

test("should add a patient", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.locator(".chakra-button").nth(1).click();
  await page.locator(".chakra-input").nth(0).click();
  await page.keyboard.type("Atreides");
  await page.locator(".chakra-input").nth(1).click();
  await page.keyboard.type("Paul");
  await page.locator(".chakra-input").nth(2).click();
  await page.keyboard.type("10/10/1980");
  // Need to add the indications Selection from the drop down
  // Select 'Post_TAVI' from the dropdown using the <select> element's ID
  await page.locator('select[class="chakra-select css-9zgf1d"]').selectOption('post_tavi');
  // Modified the invite button click action
  await page.click("'Invite'")

  await expect(page.locator("tr").nth(1)).toContainText("Atreides Paul");
});

test("should add pediatric patient", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.locator(".chakra-button").nth(1).click();
  await page.locator(".chakra-input").nth(0).click();
  await page.keyboard.type("Atreides");
  await page.locator(".chakra-input").nth(1).click();
  await page.keyboard.type("Leto");
  await page.locator(".chakra-input").nth(2).click();
  await page.keyboard.type("10/10/20020");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await page.keyboard.press("P");
  await page.getByText("Invite").first().click();

  await expect(page.locator("tr").nth(1)).toContainText("Atreides Leto");
});
