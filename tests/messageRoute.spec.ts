import { test, expect } from '@playwright/experimental-ct-react';

test.describe('/conversations', () => {
  test('can be reached from /home-page', async ({ page }) => {
    await page.goto('http://localhost:3000/home-page');
    await page
      .getByRole('link', { name: 'Image of Red Nike Trainers' })
      .click();
    await page.getByRole('button', { name: 'MESSAGE' }).click();
    await expect(
      page.locator('.conversation-height > div:nth-child(3)')
    ).toBeVisible();
  });

  test('can send message', async ({ page }) => {
    await page.goto('http://localhost:3000/conversations');
    await page.getByPlaceholder('Type your message here').click();
    await page.getByPlaceholder('Type your message here').press('CapsLock');
    await page.getByPlaceholder('Type your message here').fill('Nice shoes');
    await page.locator('form').getByRole('button').click();
    await expect(page.getByText('Nice shoes')).toBeVisible();
  });

  // test('displays latest messages in CurrentConversation', async({page})=>{
  // ...
  // })

  // test('allows user to delete an existing conversation', async ({page})=>{
  // ...
  // })
});
