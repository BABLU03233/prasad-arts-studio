import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aQ2kAAAAASUVORK5CYII=', 'base64');

async function fillBaseEnquiry(page) {
  const form = page.getByRole('form', { name: 'Project enquiry' });
  await form.getByLabel('Your name').fill('Asha Rao');
  await form.getByLabel('Phone number', { exact: false }).fill('90597 16009');
  await form.getByLabel('What are we creating?').selectOption('Wall Murals');
  return form;
}

async function openOptionalDetails(form) {
  const disclosure = form.locator('details');
  if (await disclosure.getAttribute('open') === null) await disclosure.locator('summary').click();
  return disclosure;
}

test.beforeEach(async ({ page }) => {
  // Tests inspect the outgoing message; they never contact the business.
  await page.route('https://wa.me/**', (route) => route.abort());
  await page.goto('/');
});

test('required enquiry errors are announced, focused and linked to fields', async ({ page }) => {
  const form = page.getByRole('form', { name: 'Project enquiry' });
  await form.getByRole('button', { name: 'Prepare my enquiry' }).click();
  const summary = form.getByRole('alert');
  await expect(summary).toBeFocused();
  await expect(summary.getByRole('link')).toHaveCount(3);
  await expect(form.getByLabel('Your name')).toHaveAttribute('aria-invalid', 'true');
  await summary.getByRole('link', { name: /Your name/ }).click();
  await expect(form.getByLabel('Your name')).toBeFocused();
  await expect(page.getByRole('link', { name: /Open WhatsApp & send/ })).toHaveCount(0);
});

test('complete enquiry prepares a Unicode-safe WhatsApp review and edit preserves values', async ({ page }) => {
  const form = await fillBaseEnquiry(page);
  await form.getByLabel('Your name').fill('ఆశ & Asha');
  await openOptionalDetails(form);
  await form.getByLabel('When do you need it?').fill('2027-04-15');
  await form.getByLabel('Project location').fill('Kukatpally, Hyderabad');
  await form.getByLabel('Approximate budget').selectOption({ label: '₹25,000 – ₹50,000' });
  await form.getByLabel('WhatsApp number', { exact: true }).fill('+44 7700 900123');
  await form.getByLabel('Email address').fill('asha@example.com');
  await form.getByLabel('Tell us about your idea').fill('A floral mural: 50% blue + gold? 🌸');
  await form.getByLabel('Have a reference image?').setInputFiles({ name: 'flowers & leaves.png', mimeType: 'image/png', buffer: png });
  await expect(form.getByAltText('Your selected project reference')).toBeVisible();
  await form.getByRole('button', { name: 'Prepare my enquiry' }).click();
  await expect(page.getByRole('heading', { name: 'Your idea is ready to share.' })).toBeFocused();
  const outgoing = page.getByRole('link', { name: /Open WhatsApp & send/ });
  const url = new URL(await outgoing.getAttribute('href'));
  expect(url.origin).toBe('https://wa.me');
  expect(url.pathname).toBe('/919059716009');
  expect(url.searchParams.size).toBe(1);
  const message = url.searchParams.get('text');
  for (const value of ['ఆశ & Asha', '+919059716009', 'Wall Murals', '2027-04-15', 'Kukatpally, Hyderabad', '₹25,000 – ₹50,000', '+447700900123', 'asha@example.com', '50% blue + gold? 🌸', 'flowers & leaves.png']) expect(message).toContain(value);
  await expect(page.getByText('Nothing has been sent yet.', { exact: false })).toBeVisible();
  await expect(page.getByText('Remember to attach your reference image in WhatsApp.', { exact: false })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Prefer a call?' })).toHaveAttribute('href', 'tel:+919059716009');
  await page.getByRole('button', { name: 'Edit my enquiry' }).click();
  await expect(form.getByLabel('Your name')).toBeFocused();
  await expect(form.getByLabel('Your name')).toHaveValue('ఆశ & Asha');
  await expect(form.getByLabel('What are we creating?')).toHaveValue('Wall Murals');
  await expect(form.getByLabel('Email address')).toHaveValue('asha@example.com');
  await expect(form.getByAltText('Your selected project reference')).toBeVisible();
});

test('invalid optional contacts prevent preparation and open the detail disclosure', async ({ page }) => {
  const form = await fillBaseEnquiry(page);
  await openOptionalDetails(form);
  await form.getByLabel('Email address').fill('incorrect@');
  await form.getByLabel('WhatsApp number', { exact: true }).fill('123');
  await form.locator('summary').click();
  await form.getByRole('button', { name: 'Prepare my enquiry' }).click();
  await expect(form.locator('details')).toHaveAttribute('open', '');
  await expect(form.getByRole('alert')).toBeFocused();
  await expect(form.getByLabel('Email address')).toHaveAttribute('aria-invalid', 'true');
  await expect(form.getByLabel('WhatsApp number', { exact: true })).toHaveAttribute('aria-invalid', 'true');
});

test('reference upload rejects unsupported formats and oversized files, and can be removed', async ({ page }) => {
  const form = await fillBaseEnquiry(page);
  await openOptionalDetails(form);
  const upload = form.getByLabel('Have a reference image?');
  await upload.setInputFiles({ name: 'vector.svg', mimeType: 'image/svg+xml', buffer: Buffer.from('<svg/>') });
  await expect(form.getByText('Choose a JPG, PNG, or WebP image.', { exact: true })).toBeVisible();
  await upload.setInputFiles({ name: 'oversized.png', mimeType: 'image/png', buffer: Buffer.alloc(8 * 1024 * 1024 + 1) });
  await expect(form.getByText('Choose an image smaller than 8 MB.', { exact: true })).toBeVisible();
  await form.getByRole('button', { name: 'Remove this file' }).click();
  await form.getByRole('button', { name: 'Prepare my enquiry' }).click();
  await expect(page.getByRole('heading', { name: 'Your idea is ready to share.' })).toBeVisible();
});

test('gallery filters update projects and lightbox navigation restores focus on Escape', async ({ page }) => {
  const gallery = page.locator('#work');
  // In "All work" the lead piece renders as a feature, the rest as a masonry wall.
  await expect(gallery.locator('.project-feature')).toHaveCount(1);
  await expect(gallery.locator('.project-card')).toHaveCount(24);
  await gallery.getByRole('button', { name: 'Events & sets', exact: true }).click();
  await expect(gallery.locator('.project-feature')).toHaveCount(0);
  await expect(gallery.locator('.project-card')).toHaveCount(4);
  await expect(gallery.getByRole('button', { name: 'Events & sets', exact: true })).toHaveAttribute('aria-pressed', 'true');
  const firstCard = gallery.locator('.project-card').first();
  await firstCard.click();
  const dialog = page.getByRole('dialog', { name: 'Step into a story.' });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('button', { name: 'Close dialog' })).toBeFocused();
  await dialog.getByRole('button', { name: 'Next artwork' }).click();
  await expect(page.getByRole('dialog', { name: 'Make room for wonder.' })).toBeVisible();
  await page.getByRole('button', { name: 'Previous artwork' }).click();
  await expect(dialog).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(firstCard).toBeFocused();
  await gallery.getByRole('button', { name: 'Sculptures', exact: true }).click();
  await expect(gallery.locator('.project-card')).toHaveCount(6);
  await gallery.getByRole('button', { name: 'Reliefs', exact: true }).click();
  await expect(gallery.locator('.project-card')).toHaveCount(7);
  await gallery.getByRole('button', { name: 'All work', exact: true }).click();
  await expect(gallery.locator('.project-card')).toHaveCount(24);
});

test('lightbox arrow keys navigate immediately after opening', async ({ page }) => {
  await page.getByRole('button', { name: /View A form takes flight/ }).click();
  await expect(page.getByRole('dialog', { name: 'A form takes flight.' })).toBeVisible();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('dialog', { name: 'Stillness, in relief.' })).toBeVisible();
  await page.keyboard.press('ArrowLeft');
  await expect(page.getByRole('dialog', { name: 'A form takes flight.' })).toBeVisible();
});

test('edited artwork includes an accessible original-photo toggle that resets per artwork', async ({ page }) => {
  await page.getByRole('button', { name: /View Colour, in full bloom/ }).click();
  const dialog = page.getByRole('dialog', { name: 'Colour, in full bloom.' });
  const image = dialog.locator('.lightbox-image img');
  const editedSource = await image.getAttribute('src');
  await dialog.getByRole('button', { name: 'View original photo' }).click();
  await expect(dialog.getByRole('button', { name: 'View studio edit' })).toHaveAttribute('aria-pressed', 'true');
  expect(await image.getAttribute('src')).not.toBe(editedSource);
  await dialog.getByRole('button', { name: 'Next artwork' }).click();
  await expect(page.getByRole('button', { name: 'View studio edit' })).toHaveCount(0);
  await page.getByRole('button', { name: 'Previous artwork' }).click();
  await expect(dialog.getByRole('button', { name: 'View original photo' })).toHaveAttribute('aria-pressed', 'false');
  await expect(image).toHaveAttribute('src', editedSource);
});

test('service enquiry selects the matching form option', async ({ page }) => {
  const services = page.locator('#services');
  await services.getByRole('button', { name: /Settings that tell a story/ }).click();
  await services.getByRole('button', { name: 'Enquire about this' }).click();
  await expect(page.getByRole('form', { name: 'Project enquiry' }).getByLabel('What are we creating?')).toHaveValue('Event & Movie Sets');
  await expect(page.locator('#contact-title')).toBeFocused();
});

test('reselecting the same service updates a manually changed form selection', async ({ page }) => {
  const services = page.locator('#services');
  const selection = page.getByRole('form', { name: 'Project enquiry' }).getByLabel('What are we creating?');
  await services.getByRole('button', { name: /Settings that tell a story/ }).click();
  await services.getByRole('button', { name: 'Enquire about this' }).click();
  await expect(selection).toHaveValue('Event & Movie Sets');
  await selection.selectOption('Wall Murals');
  await services.getByRole('button', { name: 'Enquire about this' }).click();
  await expect(selection).toHaveValue('Event & Movie Sets');
});

test('mobile navigation and fixed contact actions are usable', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const menu = page.getByRole('button', { name: 'Open navigation' });
  await expect(menu).toBeVisible();
  await menu.click();
  const dialog = page.getByRole('dialog', { name: 'EXPLORE PRASAD ARTS' });
  await expect(dialog).toBeVisible();
  await expect(menu).toHaveAttribute('aria-expanded', 'true');
  await dialog.getByRole('link', { name: /Work/ }).click();
  await expect(dialog).not.toBeVisible();
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await expect(page).toHaveURL(/#work$/);
  const contact = page.getByRole('navigation', { name: 'Quick contact' });
  await expect(contact.getByRole('link', { name: 'Call', exact: true })).toHaveAttribute('href', 'tel:+919059716009');
  await expect(contact.getByRole('link', { name: 'WhatsApp', exact: true })).toHaveAttribute('href', /^https:\/\/wa\.me\/919059716009\?text=/);
  await contact.getByRole('link', { name: 'Enquire', exact: true }).click();
  await expect(page).toHaveURL(/#enquire$/);
  await expect(page.getByRole('form', { name: 'Project enquiry' })).toBeVisible();
});

for (const width of [360, 390, 768, 1440]) {
  test(`layout has no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.locator('#enquire').scrollIntoViewIfNeeded();
    const dimensions = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, body: document.body.scrollWidth, document: document.documentElement.scrollWidth }));
    expect(dimensions.body).toBeLessThanOrEqual(dimensions.viewport + 1);
    expect(dimensions.document).toBeLessThanOrEqual(dimensions.viewport + 1);
  });
}

test('reduced motion removes animation while retaining readable content', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Ideas, brought to life.' })).toBeVisible();
  const motion = await page.evaluate(() => ({
    scroll: getComputedStyle(document.documentElement).scrollBehavior,
    animation: getComputedStyle(document.querySelector('.hero-line')).animationName,
    hiddenHeadings: [...document.querySelectorAll('.reveal')].filter((el) => getComputedStyle(el).opacity === '0').length,
  }));
  expect(motion.scroll).toBe('auto');
  expect(motion.animation).toBe('none');
  expect(motion.hiddenHeadings).toBe(0);
});

for (const width of [390, 1440]) {
  test(`WCAG accessibility audit at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.reload();
    await page.evaluate(() => document.fonts.ready);
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    await testInfo.attach('axe-results', { body: JSON.stringify(results.violations, null, 2), contentType: 'application/json' });
    expect(results.violations).toEqual([]);
  });
}

test('prepared enquiry with long message is keyboard accessible', async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const form = await fillBaseEnquiry(page);
  await openOptionalDetails(form);
  await form.getByLabel('Tell us about your idea').fill('A custom wall mural for our celebration.\n'.repeat(25));
  await form.getByRole('button', { name: 'Prepare my enquiry' }).click();
  await expect(page.getByRole('heading', { name: 'Your idea is ready to share.' })).toBeFocused();
  const results = await new AxeBuilder({ page }).include('.enquiry-review').withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
  await testInfo.attach('enquiry-review-axe', { body: JSON.stringify(results.violations, null, 2), contentType: 'application/json' });
  expect(results.violations).toEqual([]);
});

test('optional enquiry details and lightbox have no detectable WCAG violations', async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const form = await fillBaseEnquiry(page);
  await openOptionalDetails(form);
  const formResults = await new AxeBuilder({ page }).include('.enquiry').withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
  await testInfo.attach('enquiry-details-axe', { body: JSON.stringify(formResults.violations, null, 2), contentType: 'application/json' });
  expect(formResults.violations).toEqual([]);
  await page.locator('#work .project-card').first().click();
  const dialogResults = await new AxeBuilder({ page }).include('.project-modal').withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
  await testInfo.attach('lightbox-axe', { body: JSON.stringify(dialogResults.violations, null, 2), contentType: 'application/json' });
  expect(dialogResults.violations).toEqual([]);
});
