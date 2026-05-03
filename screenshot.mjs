import puppeteer from 'puppeteer';
import { mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIR = join(__dirname, 'temporary screenshots');
if (!existsSync(DIR)) await mkdir(DIR);

const url = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] ? `-${process.argv[3]}` : '';

let n = 1;
while (existsSync(join(DIR, `screenshot-${n}${label}.png`))) n++;
const out = join(DIR, `screenshot-${n}${label}.png`);

const browser = await puppeteer.launch({
  executablePath: 'C:/Users/peigu/.cache/puppeteer/chrome/win64-147.0.7727.57/chrome-win64/chrome.exe',
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto(url, { waitUntil: 'networkidle2' });
await page.screenshot({ path: out, fullPage: true });
await browser.close();
console.log('Saved:', out);
