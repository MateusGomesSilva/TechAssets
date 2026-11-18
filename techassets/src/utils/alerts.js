import { parseDate, startOfDay } from './dates.js';

export { parseDate };

export const WARRANTY_ALERT_DAYS = 30;

const norm = (v) => String(v ?? '').trim().toLowerCase();

const DISCARDED = new Set(['descartado', 'descarte']);
const FINISHED_MAINTENANCE = new Set(['concluída', 'concluida', 'cancelada']);
const NO_OWNER = new Set(['', '—', '-', '–', 'não atribuído', 'nao atribuido', 'sem responsável', 'sem responsavel', 'unassigned']);

// Discarded equipment left the inventory: it does not generate pending alerts.
export const isActiveAsset = (asset) => !DISCARDED.has(norm(asset?.status));

export const isPendingMaintenance = (m) => !FINISHED_MAINTENANCE.has(norm(m?.status));

export const hasNoOwner = (asset) => NO_OWNER.has(norm(asset?.person));

/**
 * Computes the dashboard alerts from the real records (assets + maintenance orders).
 * Every figure is derived on demand, so it follows any create / edit / transfer / delete.
 *
 * 1. Overdue maintenance: assets that have a pending maintenance order whose scheduled date has passed.
 *    Counted per asset (an asset with several overdue orders counts once).
 * 2. No owner: assets with no responsible person linked.
 * 3. Warranty ending: assets with a valid warranty expiring within the next 30 days.
 */
export function getAlertAssetIds(assets = [], maintenances = [], now = new Date()) {
  const today = startOfDay(now);
  const limit = new Date(today.getFullYear(), today.getMonth(), today.getDate() + WARRANTY_ALERT_DAYS);
  const active = assets.filter(isActiveAsset);
  const activeIds = new Set(active.map((a) => a.id));

  const overdue = new Set();
  maintenances.forEach((m) => {
    if (!m || !isPendingMaintenance(m) || !activeIds.has(m.assetId)) return;
    const scheduled = parseDate(m.date);
    if (scheduled && scheduled < today) overdue.add(m.assetId);
  });

  const unassigned = new Set(active.filter(hasNoOwner).map((a) => a.id));

  const warranty = new Set(
    active
      .filter((a) => {
        const end = parseDate(a.warranty);
        return end && end >= today && end <= limit;
      })
      .map((a) => a.id)
  );

  return { overdue, unassigned, warranty };
}

export function calculateAlerts(assets = [], maintenances = [], t = (k) => k, now = new Date()) {
  const { overdue, unassigned, warranty } = getAlertAssetIds(assets, maintenances, now);
  const overdueCount = overdue.size;
  const unassignedCount = unassigned.size;
  const warrantyCount = warranty.size;

  return [
    {
      id: 'ALT-OVERDUE-MAINT',
      type: 'maintenance',
      route: 'maintenances',
      count: overdueCount,
      tone: overdueCount > 0 ? 'danger' : 'neutral',
      text:
        overdueCount > 0
          ? t('alert.overdueMaintenance', { count: overdueCount })
          : t('alert.overdueMaintenanceOk'),
      subtext:
        overdueCount > 0 ? t('alert.overdueMaintenanceSub') : t('alert.overdueMaintenanceOkSub')
    },
    {
      id: 'ALT-UNASSIGNED',
      type: 'unassigned',
      route: 'assets',
      count: unassignedCount,
      tone: unassignedCount > 0 ? 'warning' : 'neutral',
      text:
        unassignedCount > 0
          ? t('alert.unassigned', { count: unassignedCount })
          : t('alert.unassignedOk'),
      subtext: unassignedCount > 0 ? t('alert.unassignedSub') : t('alert.unassignedOkSub')
    },
    {
      id: 'ALT-WARRANTY',
      type: 'warranty',
      route: 'assets',
      count: warrantyCount,
      tone: warrantyCount > 0 ? 'info' : 'neutral',
      text:
        warrantyCount > 0
          ? t('alert.warrantyExpiring', { count: warrantyCount })
          : t('alert.warrantyExpiringOk'),
      subtext:
        warrantyCount > 0 ? t('alert.warrantyExpiringSub') : t('alert.warrantyExpiringOkSub')
    }
  ];
}
