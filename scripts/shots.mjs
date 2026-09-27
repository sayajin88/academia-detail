// Capturas de revisión: node scripts/shots.mjs <outDir> <base> <ruta> [ruta...]
// Hace captura completa en 1440 y 390 px y la trocea en teselas legibles.
import puppeteer from 'puppeteer-core';
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
const [outDir, base, ...routes] = process.argv.slice(2);
mkdirSync(outDir, { recursive: true });
const browser = await puppeteer.launch({ executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', args: ['--no-sandbox'] });
for (const route of routes) {
  const name = route === '/' ? 'home' : route.replace(/^\//, '').replace(/\//g, '_');
  for (const [tag, w, h, mobile] of [['d', 1440, 900, false], ['m', 390, 844, true]]) {
    const page = await browser.newPage();
    await page.setViewport({ width: w, height: h, deviceScaleFactor: 1, isMobile: mobile, hasTouch: mobile });
    await page.goto(base + route, { waitUntil: 'networkidle2', timeout: 60000 });
    // desplaza para disparar cargas diferidas
    await page.addStyleTag({ content: 'html{scroll-behavior:auto!important}' });
    await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); } window.scrollTo(0, 0); });
    await new Promise(r => setTimeout(r, 800));
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    const buf = await page.screenshot({ fullPage: true });
    const meta = await sharp(buf).metadata();
    const tileH = h * 2;
    const n = Math.ceil(meta.height / tileH);
    for (let i = 0; i < n; i++) {
      const top = i * tileH, height = Math.min(tileH, meta.height - top);
      await sharp(buf).extract({ left: 0, top, width: meta.width, height }).resize({ width: mobile ? 390 : 1000 }).jpeg({ quality: 72 }).toFile(`${outDir}/${name}-${tag}-${String(i + 1).padStart(2, '0')}.jpg`);
    }
    console.log(`${name} ${tag}: ${meta.height}px = ${(meta.height / h).toFixed(1)} pantallas, desbordamiento horizontal ${overflow}px`);
    await page.close();
  }
}
await browser.close();
