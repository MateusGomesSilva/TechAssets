import { TRANSLATIONS, DEFAULT_LANGUAGE } from './translations.js';
import { parseDate } from '../utils/dates.js';

const PLURAL_RE = /\{(\w+),\s*plural,\s*one\s*\{([^}]*)\}\s*other\s*\{([^}]*)\}\}/g;

// Builds the translate function for a language.
// Supports {variables} and {count, plural, one {...} other {...}}.
// Falls back to pt-BR (default language) and finally to the key itself.
export function createTranslator(language) {
  const dict = TRANSLATIONS[language] || TRANSLATIONS[DEFAULT_LANGUAGE];
  const fallback = TRANSLATIONS[DEFAULT_LANGUAGE];

  return function t(key, params = {}) {
    let text = dict[key] ?? fallback[key] ?? key;
    text = text.replace(PLURAL_RE, (_, name, one, other) =>
      Number(params[name]) === 1 ? one : other
    );
    Object.keys(params).forEach((name) => {
      text = text.split(`{${name}}`).join(String(params[name]));
    });
    return text;
  };
}

// ---------------------------------------------------------------------------
// Formatting
// ---------------------------------------------------------------------------
export function formatDate(value, language) {
  const d = parseDate(value);
  if (!d) return value ? String(value) : '—';
  return new Intl.DateTimeFormat(language, { day: '2-digit', month: '2-digit', year: 'numeric' }).format(d);
}

export function formatNumber(value, language, options = {}) {
  return new Intl.NumberFormat(language, options).format(value);
}

export function formatPercent(part, total, language) {
  const pct = total > 0 ? (part / total) * 100 : 0;
  return formatNumber(pct, language, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

// Formats an ISO timestamp as "Today, 10:30" / "Yesterday, 16:45" / "22/01/2024, 11:00"
export function formatMoment(iso, language, t, now = new Date()) {
  const d = parseDate(iso);
  if (!d) return iso ? String(iso) : '';
  const time = new Intl.DateTimeFormat(language, { hour: '2-digit', minute: '2-digit' }).format(d);
  const dayStart = (x) => new Date(x.getFullYear(), x.getMonth(), x.getDate()).getTime();
  const diffDays = Math.round((dayStart(now) - dayStart(d)) / 86400000);
  if (diffDays === 0) return `${t('time.today')}, ${time}`;
  if (diffDays === 1) return `${t('time.yesterday')}, ${time}`;
  return `${formatDate(d, language)}, ${time}`;
}

// ---------------------------------------------------------------------------
// Domain labels. Records are stored with canonical (pt-BR) values — e.g. "Em uso",
// "Notebook", "Preventiva" — and translated only when rendered.
// Proper names, brands, models and asset codes are never passed through these maps.
// ---------------------------------------------------------------------------
const norm = (v) => String(v ?? '').toLowerCase().trim();

const CATEGORY_KEYS = {
  todos: 'cat.all',
  notebook: 'cat.notebook',
  notebooks: 'cat.notebooks',
  celular: 'cat.cellphone',
  celulares: 'cat.cellphones',
  tablet: 'cat.tablet',
  tablets: 'cat.tablets',
  desktop: 'cat.desktop',
  desktops: 'cat.desktops',
  monitor: 'cat.monitor',
  monitores: 'cat.monitors',
  'acessório': 'cat.accessory',
  acessorio: 'cat.accessory',
  'acessórios': 'cat.accessories',
  acessorios: 'cat.accessories'
};

const STATUS_KEYS = {
  todos: 'status.all',
  'em uso': 'status.inUse',
  'disponível': 'status.available',
  disponivel: 'status.available',
  'em manutenção': 'status.maintenance',
  descartado: 'status.discarded',
  descarte: 'status.discarded',
  'concluída': 'status.completed',
  concluida: 'status.completed',
  'em andamento': 'status.inProgress',
  agendada: 'status.scheduled',
  pendente: 'status.pending',
  cancelada: 'status.cancelled',
  aberto: 'status.open',
  resolvido: 'status.resolved'
};

const MAINT_TYPE_KEYS = {
  todos: 'status.all',
  preventiva: 'maint.preventive',
  corretiva: 'maint.corrective',
  upgrade: 'maint.upgrade'
};

const MOVEMENT_TYPE_KEYS = {
  'transferência': 'movements.typeTransfer',
  transferencia: 'movements.typeTransfer',
  entrega: 'movements.typeDelivery',
  'manutenção': 'movements.typeMaintenance',
  manutencao: 'movements.typeMaintenance',
  entrada: 'movements.typeEntry'
};

const PROFILE_TYPE_KEYS = { admin: 'profile.type.admin', administrador: 'profile.type.admin' };

const labelFrom = (map) => (t, value) => {
  const key = map[norm(value)];
  return key ? t(key) : value;
};

export const categoryLabel = labelFrom(CATEGORY_KEYS);
export const statusLabel = labelFrom(STATUS_KEYS);
export const maintTypeLabel = labelFrom(MAINT_TYPE_KEYS);
export const movementTypeLabel = labelFrom(MOVEMENT_TYPE_KEYS);
export const profileTypeLabel = labelFrom(PROFILE_TYPE_KEYS);

// "—" (no value) and i18n placeholders stored in movement routes
export function resolveText(t, value) {
  if (value && typeof value === 'object' && value.i18n) return t(value.i18n);
  return value || '—';
}

