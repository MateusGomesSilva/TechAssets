import React from 'react';
import {
  TrendingUp,
  Laptop,
  Smartphone,
  Tablet,
  Monitor,
  Headphones,
  Tv,
  AlertTriangle,
  Clock3,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import {
  useI18n,
  categoryLabel,
  movementTypeLabel,
  formatMoment,
  formatPercent,
  resolveText
} from '../i18n';

const CATEGORY_ICONS = {
  Notebook: Laptop,
  Notebooks: Laptop,
  Celular: Smartphone,
  Celulares: Smartphone,
  Tablet: Tablet,
  Tablets: Tablet,
  Desktop: Monitor,
  Desktops: Monitor,
  Monitor: Tv,
  Monitores: Tv,
  Acessório: Headphones,
  Acessórios: Headphones
};

// Canonical category keys (stored values) + chart colors
const CATEGORY_DEFS = [
  { label: 'Notebooks', singular: 'Notebook', color: '#0d6efd' },
  { label: 'Celulares', singular: 'Celular', color: '#10b981' },
  { label: 'Tablets', singular: 'Tablet', color: '#8b5cf6' },
  { label: 'Desktops', singular: 'Desktop', color: '#f59e0b' },
  { label: 'Monitores', singular: 'Monitor', color: '#6366f1' },
  { label: 'Acessórios', singular: 'Acessório', color: '#14b8a6' }
];

function AlertIcon({ tone }) {
  if (tone === 'danger') return <AlertTriangle size={16} />;
  if (tone === 'warning') return <ShieldCheck size={16} />;
  if (tone === 'info') return <Clock3 size={16} />;
  return <CheckCircle2 size={16} />;
}

export function DashboardView({
  assets = [],
  movements = [],
  alerts = [],
  onNavigate,
  onSelectAsset,
  onSelectCategory
}) {
  const { t, language } = useI18n();

  // Dynamic KPI calculations based on real registered assets
  const totalAssets = assets.length;
  const inUseCount = assets.filter((a) => a.status === 'Em uso').length;
  const availableCount = assets.filter((a) => a.status === 'Disponível').length;
  const maintenanceCount = assets.filter((a) => a.status === 'Em manutenção').length;
  const pct = (n) => formatPercent(n, totalAssets, language);

  const isMatchCat = (catDef, itemCategory) => {
    if (!itemCategory) return false;
    const c = itemCategory.toLowerCase().trim();
    const singular = catDef.singular.toLowerCase();
    return (
      c === catDef.label.toLowerCase() ||
      c === singular ||
      c.startsWith(singular) ||
      (singular === 'acessório' && (c === 'acessorio' || c === 'acessorios'))
    );
  };

  // Dynamic category calculations
  const categoriesDonut = CATEGORY_DEFS.map((def) => {
    const count = assets.filter((a) => isMatchCat(def, a.category)).length;
    const percent = totalAssets > 0 ? Math.round((count / totalAssets) * 100) : 0;
    return { ...def, name: categoryLabel(t, def.label), count, percent };
  });

  // SVG donut segments
  let accumulatedDashOffset = 0;
  const donutSegments = categoriesDonut
    .filter((cat) => cat.count > 0)
    .map((cat) => {
      const dashLength = totalAssets > 0 ? (cat.count / totalAssets) * 390 : 0;
      const segment = {
        ...cat,
        strokeDasharray: `${dashLength} 390`,
        strokeDashoffset: -accumulatedDashOffset
      };
      accumulatedDashOffset += dashLength;
      return segment;
    });

  // Bar heights proportional to the real counts
  const maxCategoryCount = Math.max(1, ...categoriesDonut.map((c) => c.count));
  const categoryBars = categoriesDonut.map((cat) => ({
    ...cat,
    heightPercent: cat.count > 0 ? Math.max(15, Math.round((cat.count / maxCategoryCount) * 88)) : 6
  }));

  const assetById = new Map(assets.map((a) => [a.id, a]));

  return (
    <div className="view-container dashboard-view">
      {/* Page Title & Subtitle */}
      <div className="view-header">
        <div className="view-title-block">
          <h1 className="view-title">{t('dashboard.title')}</h1>
          <p className="view-subtitle">{t('dashboard.subtitle')}</p>
        </div>
        <div className="view-header-actions">
          <button className="btn btn-primary" onClick={() => onNavigate('new-asset')}>
            {t('dashboard.newAsset')}
          </button>
        </div>
      </div>

      {/* 4 Metric KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card" onClick={() => onNavigate('assets')}>
          <div className="kpi-header">
            <span className="kpi-title">{t('dashboard.totalAssets')}</span>
          </div>
          <div className="kpi-value-row">
            <span className="kpi-number">{totalAssets}</span>
          </div>
          <div className="kpi-trend positive">
            <TrendingUp size={14} />
            <span>{t('dashboard.registeredCount', { count: totalAssets })}</span>
          </div>
        </div>

        <div className="kpi-card" onClick={() => onNavigate('assets')}>
          <div className="kpi-header">
            <span className="kpi-title">{t('dashboard.inUse')}</span>
          </div>
          <div className="kpi-value-row">
            <span className="kpi-number text-success">{inUseCount}</span>
          </div>
          <div className="kpi-trend neutral">
            <span>{t('dashboard.pctOfTotal', { pct: pct(inUseCount) })}</span>
          </div>
        </div>

        <div className="kpi-card" onClick={() => onNavigate('assets')}>
          <div className="kpi-header">
            <span className="kpi-title">{t('dashboard.available')}</span>
          </div>
          <div className="kpi-value-row">
            <span className="kpi-number text-warning">{availableCount}</span>
          </div>
          <div className="kpi-trend neutral">
            <span>{t('dashboard.pctOfTotal', { pct: pct(availableCount) })}</span>
          </div>
        </div>

        <div className="kpi-card" onClick={() => onNavigate('maintenances')}>
          <div className="kpi-header">
            <span className="kpi-title">{t('dashboard.inMaintenance')}</span>
          </div>
          <div className="kpi-value-row">
            <span className="kpi-number text-purple">{maintenanceCount}</span>
          </div>
          <div className="kpi-trend neutral">
            <span>{t('dashboard.pctOfTotal', { pct: pct(maintenanceCount) })}</span>
          </div>
        </div>
      </div>

      {/* Middle Row: Inventory Summary Donut + Recent Movements */}
      <div className="dashboard-grid-row">
        <section className="dashboard-card card-donut">
          <div className="card-header-clean">
            <h2 className="card-title">{t('dashboard.inventorySummary')}</h2>
          </div>

          <div className="donut-chart-container">
            <div className="donut-svg-wrapper">
              <svg viewBox="0 0 160 160" className="donut-svg">
                <circle cx="80" cy="80" r="62" fill="transparent" className="donut-track" strokeWidth="22" />
                {donutSegments.map((seg, idx) => (
                  <circle
                    key={idx}
                    cx="80"
                    cy="80"
                    r="62"
                    fill="transparent"
                    stroke={seg.color}
                    strokeWidth="22"
                    strokeDasharray={seg.strokeDasharray}
                    strokeDashoffset={seg.strokeDashoffset}
                  />
                ))}
              </svg>
              <div className="donut-center-info">
                <span className="donut-total">{totalAssets}</span>
                <span className="donut-sub">{t('dashboard.total')}</span>
              </div>
            </div>

            <div className="donut-legend-list">
              {categoriesDonut.map((item, idx) => (
                <div
                  key={idx}
                  className="donut-legend-item"
                  onClick={() => onSelectCategory && onSelectCategory(item.label)}
                  title={t('dashboard.filterBy', { name: item.name })}
                  style={{ cursor: 'pointer' }}
                >
                  <span className="legend-dot" style={{ backgroundColor: item.color }} />
                  <span className="legend-name">{item.name}</span>
                  <span className="legend-count-pct">
                    <b>{item.count}</b> <small>({item.percent}%)</small>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Movements Section */}
        <section className="dashboard-card card-movements">
          <div className="card-header-clean">
            <h2 className="card-title">{t('dashboard.recentMovements')}</h2>
          </div>

          <div className="movements-list">
            {movements.slice(0, 6).map((mov) => {
              const asset = assetById.get(mov.assetId);
              const Icon = CATEGORY_ICONS[asset?.category] || Laptop;
              return (
                <div
                  key={mov.id}
                  className="movement-row"
                  onClick={() => asset && onSelectAsset && onSelectAsset(asset)}
                  style={asset ? { cursor: 'pointer' } : undefined}
                >
                  <div className="movement-device-icon">
                    <Icon size={18} />
                  </div>
                  <div className="movement-details">
                    <span className="movement-asset-name">{mov.assetName}</span>
                    <span className="movement-route-text">
                      {resolveText(t, mov.from)} → {resolveText(t, mov.to)}
                    </span>
                  </div>
                  <div className="movement-status-meta">
                    <span className={`movement-tag ${mov.tagTone}`}>
                      {movementTypeLabel(t, mov.type)}
                    </span>
                    <small className="movement-time">{formatMoment(mov.at, language, t)}</small>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="card-footer-action">
            <button className="card-action-link" onClick={() => onNavigate('movements')}>
              {t('dashboard.viewAll')}
            </button>
          </div>
        </section>
      </div>

      {/* Bottom Row: Alerts and pendencies + Assets by Category */}
      <div className="dashboard-grid-row">
        <section className="dashboard-card card-alerts">
          <div className="card-header-clean with-link">
            <h2 className="card-title">{t('dashboard.alerts')}</h2>
            <button className="card-header-link" onClick={() => onNavigate('maintenances')}>
              {t('dashboard.viewAllAlerts')}
            </button>
          </div>

          <div className="alerts-clean-list">
            {alerts.map((alt) => (
              <div
                key={alt.id}
                className={`alert-clean-item ${alt.count === 0 ? 'alert-clean-ok' : ''}`}
                onClick={() => onNavigate(alt.route || 'maintenances')}
              >
                <div className={`alert-avatar alert-avatar-${alt.tone}`}>
                  <AlertIcon tone={alt.tone} />
                </div>
                <div className="alert-content">
                  <span className="alert-main-text">{alt.text}</span>
                  <small className="alert-sub-text">{alt.subtext}</small>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Assets by Category Bar Chart */}
        <section className="dashboard-card card-barchart">
          <div className="card-header-clean with-link">
            <h2 className="card-title">{t('dashboard.assetsByCategory')}</h2>
            <button className="card-header-link" onClick={() => onNavigate('reports')}>
              {t('dashboard.viewReport')}
            </button>
          </div>

          <div className="bars-chart-container">
            <div className="bars-chart-grid">
              {categoryBars.map((bar, idx) => (
                <div
                  key={idx}
                  className="chart-bar-column"
                  onClick={() => onSelectCategory && onSelectCategory(bar.label)}
                  title={t('dashboard.barTitle', { name: bar.name, count: bar.count })}
                  style={{ cursor: 'pointer' }}
                >
                  <span className="bar-top-value">{bar.count}</span>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ height: `${bar.heightPercent}%` }} />
                  </div>
                  <span className="bar-label">{bar.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
