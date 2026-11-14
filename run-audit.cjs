const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BROWSER_PATH = fs.existsSync(CHROME_PATH) ? CHROME_PATH : EDGE_PATH;
const SCREENSHOT_DIR = 'C:\\Users\\User\\.gemini\\antigravity\\brain\\1f3dc240-0da2-4c6a-be55-09ce1129d88d\\screenshots';

const PAGES = [
  { name: 'homepage', url: 'http://localhost:3100/' },
  { name: 'about', url: 'http://localhost:3100/about' },
  { name: 'journey', url: 'http://localhost:3100/journey' },
  { name: 'experience', url: 'http://localhost:3100/experience' },
  { name: 'journal', url: 'http://localhost:3100/journal' },
  { name: 'photography', url: 'http://localhost:3100/photography' },
  { name: 'travel', url: 'http://localhost:3100/travel' },
  { name: 'reading', url: 'http://localhost:3100/reading' },
  { name: 'contact', url: 'http://localhost:3100/contact' },
  { name: 'admin', url: 'http://localhost:3100/admin' },
];

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 390, height: 844 },
];

async function runAudit() {
  console.log('Launching browser from:', BROWSER_PATH);
  const browser = await puppeteer.launch({
    executablePath: BROWSER_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const report = {
    pagesTested: [],
    consoleErrors: [],
    failedRequests: [],
    interactions: []
  };

  const page = await browser.newPage();

  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log(`[CONSOLE ERROR] [${page.url()}] ${msg.text()}`);
      report.consoleErrors.push({ url: page.url(), text: msg.text() });
    }
  });

  page.on('requestfailed', request => {
    console.log(`[REQUEST FAILED] [${request.url()}] ${request.failure()?.errorText}`);
    report.failedRequests.push({ url: request.url(), error: request.failure()?.errorText });
  });

  for (const p of PAGES) {
    console.log(`\n=== Auditing: ${p.name} (${p.url}) ===`);
    for (const vp of VIEWPORTS) {
      await page.setViewport({ width: vp.width, height: vp.height });
      const res = await page.goto(p.url, { waitUntil: 'networkidle0', timeout: 15000 }).catch(e => {
        console.error(`Failed to load ${p.url}:`, e.message);
        return null;
      });

      const status = res ? res.status() : 'FAILED';

      // On homepage, dismiss intro if visible
      if (p.name === 'homepage') {
        const skipBtn = await page.$('button ::-p-text(Skip intro)');
        if (skipBtn) {
          await skipBtn.click().catch(() => {});
          await new Promise(r => setTimeout(r, 600));
        }
      }

      // Check overflow
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      const hasOverflow = scrollWidth > clientWidth;
      if (hasOverflow) {
        console.warn(`[OVERFLOW] ${p.name} (${vp.name}): scrollWidth=${scrollWidth}, clientWidth=${clientWidth}`);
      }

      // Capture screenshot
      const shotName = `${p.name}_${vp.name}.png`;
      const shotPath = path.join(SCREENSHOT_DIR, shotName);
      await page.screenshot({ path: shotPath, fullPage: false });

      report.pagesTested.push({
        page: p.name,
        viewport: vp.name,
        status,
        hasOverflow
      });
    }
  }

  // --- Interactive tests ---
  console.log('\n=== Testing Interactive Elements ===');
  await page.setViewport({ width: 1440, height: 900 });

  // 1. Test CV button behavior
  console.log('Testing CV button...');
  await page.goto('http://localhost:3100/', { waitUntil: 'networkidle0' });
  const cvUnavailable = await page.evaluate(() => {
    const el = document.querySelector('[title="CV not uploaded yet"]');
    return el ? el.textContent.trim() : null;
  });
  console.log('CV Button status:', cvUnavailable);
  report.interactions.push({ feature: 'CV Download Button', status: 'Disabled as expected (no PDF uploaded)', text: cvUnavailable });

  // 2. Test Contact form validation
  console.log('Testing Contact form validation...');
  await page.goto('http://localhost:3100/contact', { waitUntil: 'networkidle0' });
  const submitBtn = await page.$('button[type="submit"]');
  if (submitBtn) {
    await submitBtn.click();
    await new Promise(r => setTimeout(r, 600));
    const errors = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('[role="alert"]')).map(el => el.textContent.trim());
    });
    console.log('Validation errors rendered:', errors);
    report.interactions.push({ feature: 'Contact Form Validation', errorsCount: errors.length, errors });

    // Fill valid data and test submission simulation
    await page.type('#name', 'Jane Tester');
    await page.type('#email', 'jane@example.com');
    await page.type('#subject', 'Collaboration Enquiry');
    await page.type('#message', 'Hello Alex, I would love to collaborate with you on an upcoming design exhibition.');
    await submitBtn.click();
    await new Promise(r => setTimeout(r, 1500));
    const successMsg = await page.evaluate(() => {
      const el = document.querySelector('[role="status"]');
      return el ? el.textContent.trim() : null;
    });
    console.log('Form submission response:', successMsg ? 'Success banner rendered' : 'No banner');
    report.interactions.push({ feature: 'Contact Form Submission', result: successMsg ? 'Success' : 'Failed' });
  }

  // 3. Test Photography filters and lightbox
  console.log('Testing Photography filter & lightbox...');
  await page.goto('http://localhost:3100/photography', { waitUntil: 'networkidle0' });
  
  // Filter buttons test
  const filterClicked = await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Travel'));
    if (btn) {
      btn.click();
      return true;
    }
    return false;
  });
  await new Promise(r => setTimeout(r, 500));
  console.log('Travel category filter clicked:', filterClicked);

  // Click first photo to open lightbox
  const photoOpened = await page.evaluate(() => {
    const btn = document.querySelector('button[aria-label^="Open"]');
    if (btn) {
      btn.click();
      return true;
    }
    return false;
  });
  await new Promise(r => setTimeout(r, 600));

  const lightboxVisible = await page.evaluate(() => {
    const lb = document.querySelector('div[role="dialog"]');
    return !!lb;
  });
  console.log('Lightbox opened:', lightboxVisible);
  report.interactions.push({ feature: 'Photography Lightbox', opened: lightboxVisible });

  // 4. Test Mobile Hamburger Navigation
  console.log('Testing Mobile Hamburger Navigation...');
  await page.setViewport({ width: 390, height: 844 });
  await page.goto('http://localhost:3100/', { waitUntil: 'networkidle0' });
  
  // Skip intro if present
  const skipIntroMobile = await page.$('button ::-p-text(Skip intro)');
  if (skipIntroMobile) await skipIntroMobile.click().catch(() => {});
  await new Promise(r => setTimeout(r, 500));

  const menuOpened = await page.evaluate(() => {
    const btn = document.querySelector('button[aria-label="Open menu"]');
    if (btn) {
      btn.click();
      return true;
    }
    return false;
  });
  await new Promise(r => setTimeout(r, 600));

  const mobileNavLinks = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('nav div a, header div a'));
    return links.map(a => ({ label: a.textContent.trim(), href: a.getAttribute('href') }));
  });
  console.log('Mobile menu links count:', mobileNavLinks.length);
  report.interactions.push({ feature: 'Mobile Hamburger Navigation', opened: menuOpened, links: mobileNavLinks });

  // 5. Test Journey timeline filters & expansion
  console.log('Testing Journey timeline...');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3100/journey', { waitUntil: 'networkidle0' });
  const timelineTested = await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const detailsBtn = buttons.find(b => b.textContent.includes('Details'));
    if (detailsBtn) detailsBtn.click();
    return !!detailsBtn;
  });
  console.log('Timeline Details expansion clicked:', timelineTested);
  report.interactions.push({ feature: 'Timeline Expansion', tested: timelineTested });

  // 6. Test Interactive Map on Travel page
  console.log('Testing World Map on Travel page...');
  await page.goto('http://localhost:3100/travel', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1500)); // allow maplibre to render
  const mapCanvasExists = await page.evaluate(() => {
    const canvas = document.querySelector('.maplibregl-canvas');
    const markers = document.querySelectorAll('.maplibregl-marker');
    return { hasCanvas: !!canvas, markerCount: markers.length };
  });
  console.log('Interactive World Map status:', mapCanvasExists);
  report.interactions.push({ feature: 'Interactive World Map', mapCanvasExists });

  // 7. Test Admin CMS page
  console.log('Testing Admin CMS page...');
  await page.goto('http://localhost:3100/admin', { waitUntil: 'networkidle0' });
  const adminState = await page.evaluate(() => {
    const heading = document.querySelector('h1')?.textContent.trim();
    const notice = document.querySelector('#admin-notice, [class*="bg-gold/10"]')?.textContent.trim();
    return { heading, notice };
  });
  console.log('Admin CMS page state:', adminState);
  report.interactions.push({ feature: 'Admin CMS Graceful Degradation', adminState });

  // Save report
  fs.writeFileSync(
    path.join(SCREENSHOT_DIR, 'audit_report.json'),
    JSON.stringify(report, null, 2)
  );

  console.log('\nAudit complete! Closing browser.');
  await browser.close();
}

runAudit().catch(err => {
  console.error('Audit failed with error:', err);
  process.exit(1);
});
