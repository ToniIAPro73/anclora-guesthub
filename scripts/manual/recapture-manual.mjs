#!/usr/bin/env node
/**
 * Recaptura QA-safe de las capturas del manual de usuario, dirigida por
 * docs/manual/screenshots.manifest.json (mismo mecanismo en todos los repos Anclora).
 *
 * Reglas (contratos .anclora/PRODUCTION_RUNTIME.md):
 *  - Solo identidad QA persistente del repo (QA_PERSISTENT_IDENTITY); nunca cuentas reales.
 *  - El script no siembra ni borra datos. Reutiliza los datos QA existentes.
 *  - Las pantallas "auto" solo navegan y fotografían. Las "assisted" las prepara el
 *    operador en el navegador (con la cuenta QA) y se capturan al pulsar Enter.
 *
 * Uso:
 *   node --env-file=<env> scripts/manual/recapture-manual.mjs [--only a.png,b.png] [--auto-only] [--list]
 * Variables: MANUAL_APP_URL, MANUAL_QA_EMAIL, MANUAL_QA_PASSWORD y las de "roles" del manifiesto.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import readline from 'node:readline/promises';
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const manifestPath = path.join(root, 'docs', 'manual', 'screenshots.manifest.json');
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
const args = process.argv.slice(2);
const only = args.includes('--only') ? new Set(args[args.indexOf('--only') + 1].split(',')) : null;
const autoOnly = args.includes('--auto-only');

const screens = manifest.screens.filter((s) => s.mode !== 'static' && (!only || only.has(s.file)) && (!autoOnly || s.mode === 'auto'));
if (args.includes('--list')) {
  for (const s of manifest.screens) console.log(`${s.status.padEnd(12)} ${s.mode.padEnd(9)} ${s.role.padEnd(10)} ${s.file}  — ${s.instructions}`);
  process.exit(0);
}

const BASE = (process.env.MANUAL_APP_URL ?? manifest.app_url_default).replace(/\/$/, '');
const outDir = path.join(root, manifest.screenshots_dir);
mkdirSync(outDir, { recursive: true });

function credentials(role) {
  const cfg = manifest.roles[role];
  if (!cfg) throw new Error(`Rol desconocido en el manifiesto: ${role}`);
  const email = process.env[cfg.email_env] ?? cfg.default_email;
  const password = process.env[cfg.password_env];
  if (!email || !manifest.qa_domains.some((d) => email.toLowerCase().endsWith(d))) {
    throw new Error(`${cfg.email_env}: solo identidades QA (${manifest.qa_domains.join(', ')}); recibido "${email ?? ''}".`);
  }
  return { email, password };
}

async function loadChromium() {
  const require = createRequire(pathToFileURL(path.join(root, 'package.json')));
  for (const id of ['playwright', '@playwright/test', 'playwright-core', './qa/e2e-acceptance/node_modules/playwright-core']) {
    try {
      const resolved = id.startsWith('./') ? path.join(root, id, 'index.mjs') : require.resolve(id);
      if (id.startsWith('./') && !existsSync(resolved)) continue;
      const mod = await import(pathToFileURL(resolved).href);
      if (mod.chromium) return mod.chromium;
    } catch { /* siguiente candidato */ }
  }
  throw new Error('No se encontró Playwright en el repo. Instala las dependencias del repo (npm ci) y npx playwright install chromium.');
}

const needsOperator = screens.some((s) => s.mode === 'assisted') || Object.values(manifest.roles).some((r) => r.login === 'manual');
const chromium = await loadChromium();
const browser = await chromium.launch({ headless: !needsOperator });
const rl = needsOperator ? readline.createInterface({ input: process.stdin, output: process.stdout }) : null;
const contexts = new Map();
const results = [];

async function pageFor(role, viewport) {
  const key = `${role}:${viewport.width}x${viewport.height}`;
  if (contexts.has(key)) return contexts.get(key);
  const ctx = await browser.newContext({ viewport, deviceScaleFactor: manifest.device_scale_factor ?? 1 });
  if (manifest.cookies?.length) {
    const host = new URL(BASE).hostname;
    await ctx.addCookies(manifest.cookies.map((c) => ({ path: '/', domain: host, ...c })));
  }
  const page = await ctx.newPage();
  if (role !== 'guest') {
    const cfg = manifest.roles[role];
    const cred = credentials(role);
    if (cfg.login === 'form') {
      if (!cred.password) throw new Error(`Falta ${cfg.password_env}.`);
      await page.goto(`${BASE}${cfg.login_path}`, { waitUntil: 'networkidle' });
      await page.locator(cfg.selectors.email).fill(cred.email);
      await page.locator(cfg.selectors.password).fill(cred.password);
      await page.locator(cfg.selectors.submit).click();
      await page.waitForURL(new RegExp(cfg.success_url), { timeout: 30000 });
    } else {
      await page.goto(`${BASE}${cfg.login_path}`, { waitUntil: 'load' });
      await rl.question(`Inicia sesión como ${cred.email} (rol ${role}) en el navegador y pulsa Enter… `);
    }
  }
  contexts.set(key, page);
  return page;
}

for (const s of screens) {
  const viewport = s.viewport ?? manifest.viewport;
  try {
    const page = await pageFor(s.role, viewport);
    if (s.path) {
      const target = s.path.replace(/\$\{(\w+)\}/g, (_, name) => {
        if (!process.env[name]) throw new Error(`Falta ${name} (necesario para ${s.path}).`);
        return process.env[name];
      });
      await page.goto(`${BASE}${target}`, { waitUntil: 'networkidle' });
    }
    if (s.mode === 'assisted') {
      await rl.question(`\n[${s.file}] ${s.instructions}\n  Prepara la pantalla y pulsa Enter para capturar… `);
    } else {
      await page.waitForTimeout(800);
    }
    await page.screenshot({ path: path.join(outDir, s.file), fullPage: Boolean(s.full_page) });
    results.push({ file: s.file, result: 'CAPTURED', at: new Date().toISOString() });
    console.log(`✓ ${s.file}`);
  } catch (error) {
    results.push({ file: s.file, result: 'FAILED', error: error.message.split('\n')[0] });
    console.error(`✗ ${s.file}: ${error.message.split('\n')[0]}`);
  }
}

rl?.close();
await browser.close();
const logPath = path.join(root, 'tmp', 'manual-recapture-log.json');
mkdirSync(path.dirname(logPath), { recursive: true });
writeFileSync(logPath, JSON.stringify({ base: BASE, results }, null, 2));
console.log(`\n${results.filter((r) => r.result === 'CAPTURED').length}/${results.length} capturas. Registro: ${path.relative(root, logPath)}`);
if (results.some((r) => r.result === 'FAILED')) process.exitCode = 1;
