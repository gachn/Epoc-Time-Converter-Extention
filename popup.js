const THEME_KEY = 'timeConverterTheme';
const TAB_KEY = 'timeConverterActiveTab';

const UNIT_MAP = {
  s: 'second', sec: 'second', secs: 'second', second: 'second', seconds: 'second',
  m: 'minute', min: 'minute', mins: 'minute', minute: 'minute', minutes: 'minute',
  h: 'hour', hr: 'hour', hrs: 'hour', hour: 'hour', hours: 'hour',
  d: 'day', day: 'day', days: 'day',
  w: 'week', week: 'week', weeks: 'week',
  month: 'month', months: 'month',
  y: 'year', yr: 'year', yrs: 'year', year: 'year', years: 'year',
};

function normalizeUnit(raw) {
  if (raw in UNIT_MAP) return UNIT_MAP[raw];
  const singular = raw.replace(/s$/, '');
  if (singular in UNIT_MAP) return UNIT_MAP[singular];
  throw new Error(`Unknown unit: ${raw}`);
}

function applyOffset(date, value, unit) {
  switch (unit) {
    case 'second': date.setSeconds(date.getSeconds() + value); break;
    case 'minute': date.setMinutes(date.getMinutes() + value); break;
    case 'hour': date.setHours(date.getHours() + value); break;
    case 'day': date.setDate(date.getDate() + value); break;
    case 'week': date.setDate(date.getDate() + value * 7); break;
    case 'month': date.setMonth(date.getMonth() + value); break;
    case 'year': date.setFullYear(date.getFullYear() + value); break;
    default: throw new Error(`Unknown unit: ${unit}`);
  }
}

/**
 * Parse a relative time expression into a Date.
 * @param {string} expression - e.g. "now + 2 days - 3 hours"
 * @returns {Date}
 */
function parseRelativeTime(expression) {
  const trimmed = expression.trim().toLowerCase();
  if (!trimmed) throw new Error('Empty expression');
  if (!/^now\b/.test(trimmed)) throw new Error('Expression must start with "now"');

  const result = new Date();
  const remainder = trimmed.replace(/^now\s*/, '');
  const offsetPattern = /([+-])\s*(\d+)\s*([a-z]+)/g;
  let match;
  let matched = false;

  while ((match = offsetPattern.exec(remainder)) !== null) {
    matched = true;
    const sign = match[1] === '+' ? 1 : -1;
    const value = parseInt(match[2], 10) * sign;
    const unit = normalizeUnit(match[3]);
    applyOffset(result, value, unit);
  }

  if (remainder.trim() && !matched) throw new Error('Invalid offset format');
  return result;
}

function getPreferredTheme() {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const icon = document.querySelector('.theme-icon');
  if (icon) icon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

function initTheme() {
  const theme = getPreferredTheme();
  applyTheme(theme);
  document.getElementById('theme-toggle').addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem(THEME_KEY, next);
  });
}

function switchTab(tabId) {
  document.querySelectorAll('.tab-btn').forEach((btn) => {
    const active = btn.dataset.tab === tabId;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-selected', active ? 'true' : 'false');
  });
  document.querySelectorAll('.tab-panel').forEach((panel) => {
    panel.classList.toggle('active', panel.id === tabId);
  });
  localStorage.setItem(TAB_KEY, tabId);
}

function initTabs() {
  const valid = ['relative-tab', 'epoch-tab', 'date-tab'];
  const saved = localStorage.getItem(TAB_KEY);
  const initial = valid.includes(saved) ? saved : 'relative-tab';
  switchTab(initial);

  document.querySelectorAll('.tab-btn').forEach((btn) => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });
}

function initLiveClock() {
  const secondsEl = document.getElementById('live-epoch-seconds');
  const msEl = document.getElementById('live-epoch-ms');
  if (!secondsEl || !msEl) return;

  function updateClock() {
    const now = Date.now();
    secondsEl.textContent = Math.floor(now / 1000).toString();
    msEl.textContent = now.toString();
  }

  updateClock();
  setInterval(updateClock, 100);
}

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTabs();
  initLiveClock();
});
