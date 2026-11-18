const DARK_QUERY = '(prefers-color-scheme: dark)';
const META_COLOR = { light: '#0d6efd', dark: '#0b1220' };

// Resolves the user's choice ('light' | 'dark' | 'system') to the theme actually rendered.
export function resolveTheme(choice) {
  if (choice === 'dark') return 'dark';
  if (choice === 'system') {
    return typeof window !== 'undefined' && window.matchMedia && window.matchMedia(DARK_QUERY).matches
      ? 'dark'
      : 'light';
  }
  return 'light';
}

// Applies the theme to the whole document (single source of truth: <html data-theme>).
export function applyTheme(choice) {
  const resolved = resolveTheme(choice);
  const root = document.documentElement;
  root.setAttribute('data-theme', resolved);
  root.setAttribute('data-theme-choice', choice);
  root.style.colorScheme = resolved;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', META_COLOR[resolved]);
  return resolved;
}

// Notifies when the OS / browser appearance changes (used only while choice === 'system').
export function subscribeSystemTheme(onChange) {
  if (typeof window === 'undefined' || !window.matchMedia) return () => { };
  const mq = window.matchMedia(DARK_QUERY);
  const handler = () => onChange(mq.matches ? 'dark' : 'light');
  if (mq.addEventListener) {
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }
  mq.addListener(handler);
  return () => mq.removeListener(handler);
}
