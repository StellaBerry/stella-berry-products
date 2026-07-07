// Role Garden WebUI ドキュメント用スクリーンショット撮影
//
// 前提:
//   1. CDPつきブラウザが起動していること (--remote-debugging-port=9222)
//   2. Role Garden WebUI 本体が http://127.0.0.1:7880 で起動していること
//
// 動作: 新規タブを開いて各画面を閲覧・撮影するだけ。送信や設定変更は行わない。
// 出力: ../../src/assets/screenshots/*.png (サイトの素材フォルダへ直接保存)
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(HERE, '../../src/assets/screenshots');
const CDP = 'http://127.0.0.1:9222';
const APP = 'http://127.0.0.1:7880/';
const DM_PARTNER = process.env.RGW_SHOOT_PARTNER || 'あかり';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function reachable(url) {
  try { await fetch(url, { signal: AbortSignal.timeout(3000) }); return true; }
  catch { return false; }
}

// ---- 前提チェック(わかりやすいエラーで止める) ----
if (!(await reachable(`${CDP}/json/version`))) {
  console.error('[NG] CDPつきブラウザ(ポート9222)が見つかりません。');
  console.error('     --remote-debugging-port=9222 付きでブラウザを起動してから再実行してください。');
  process.exit(1);
}
if (!(await reachable(APP))) {
  console.error('[NG] Role Garden WebUI (127.0.0.1:7880) が起動していません。');
  console.error('     ランチャーからアプリを起動してから再実行してください。');
  process.exit(1);
}
fs.mkdirSync(OUT, { recursive: true });

const browser = await puppeteer.connect({ browserURL: CDP, defaultViewport: null });
const page = await browser.newPage();

async function shot(name) {
  await sleep(250);
  await page.screenshot({ path: path.join(OUT, `${name}.png`) });
  console.log('  撮影:', `${name}.png`);
}

async function gotoView(view) {
  const clicked = await page.evaluate((v) => {
    const btn = document.querySelector(`.nav-item[data-view="${v}"]`) || document.querySelector(`.bottom-item[data-view="${v}"]`);
    if (btn) { btn.click(); return true; }
    return false;
  }, view);
  if (!clicked) throw new Error(`ナビが見つかりません: ${view}`);
  await sleep(900);
}

async function openDmConversation() {
  await gotoView('dm');
  await sleep(600);
  const picked = await page.evaluate((partnerName) => {
    const rows = [...document.querySelectorAll('#partnerList .conversation-row')];
    const row = rows.find((r) => (r.textContent || '').includes(partnerName)) || rows[0];
    if (row) { row.click(); return (row.textContent || '').trim().slice(0, 30); }
    return null;
  }, DM_PARTNER);
  console.log('  DM相手:', picked ?? '(見つからず)');
  await sleep(1200);
}

console.log(`出力先: ${OUT}`);
console.log('--- デスクトップ (1280x800) ---');
await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 2 });
await page.goto(APP, { waitUntil: 'networkidle2', timeout: 30000 });
await page.waitForSelector('.view.active', { timeout: 15000 });
await sleep(1500);

await gotoView('timeline');
await shot('timeline-desktop');
await gotoView('profile');
await shot('profile-desktop');
await gotoView('followers');
await shot('followers-desktop');
await gotoView('notifications');
await shot('notifications-desktop');
await gotoView('worlds');
await shot('worlds-desktop');
await gotoView('analysis');
await shot('analysis-desktop');
await gotoView('settings');
await shot('settings-desktop');
await openDmConversation();
await shot('dm-desktop');

console.log('--- モバイル (390x844) ---');
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
await page.goto(APP, { waitUntil: 'networkidle2', timeout: 30000 });
await page.waitForSelector('.view.active', { timeout: 15000 });
await sleep(1500);

await gotoView('timeline');
await shot('timeline-mobile');
await openDmConversation();
await shot('dm-mobile');

await page.close(); // 撮影用に開いたタブだけ閉じる
await browser.disconnect();
console.log('完了しました。');
