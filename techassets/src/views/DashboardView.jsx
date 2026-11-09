import React from 'react';
import {
  TrendingUp,
  Laptop,
  Smartphone,
  Tablet,
  Monitor,
  Headphones,
  Tv,
  ArrowRight,
  AlertTriangle,
  Clock3,
  ShieldCheck,
  Package,
  Layers,
  CheckCircle2,
  Wrench
} from 'lucide-react';

export function DashboardView({
  assets = [],
  movements = [],
  alerts = [],
  onNavigate,
  onSelectAsset,
  onSelectCategory
}) {
  const categoryIconMap = {
    'Notebook': Laptop,
    'Notebooks': Laptop,
    'Celular': Smartphone,
    'Celulares': Smartphone,
    'Tablet': Tablet,
    'Tablets': Tablet,
    'Desktop': Monitor,
    'Desktops': Monitor,
    'Monitor': Tv,
    'Monitores': Tv,
    'Acessório': Headphones,
    'Acessórios': Headphones
  };

  const categoriesDonut = [
    { label: 'Notebooks', count: 512, percent: 41, color: '#0d6efd' },
    { label: 'Celulares', count: 342, percent: 27, color: '#10b981' },
    { label: 'Desktops', count: 198, percent: 16, color: '#f59e0b' },
    { label: 'Monitores', count: 128, percent: 10, color: '#6366f1' },
    { label: 'Acessórios', count: 68, percent: 5, color: '#14b8a6' }
  ];

  const categoryBars = [
    { label: 'Notebooks', count: 512, heightPercent: 95 },
    { label: 'Celulares', count: 342, heightPercent: 65 },
    { label: 'Tablets', count: 94, heightPercent: 25 },
    { label: 'Desktops', count: 72, heightPercent: 19 },
    { label: 'Monitores', count: 34, heightPercent: 12 },
    { label: 'Acessórios', count: 64, heightPercent: 17 }
  ];

  return (
    <div className="view-container dashboard-view">
      {/* Page Title & Subtitle */}
      <div className="view-header">
        <div className="view-title-block">
          <h1 className="view-title">Dashboard</h1>
          <p className="view-subtitle">Visão geral dos seus ativos</p>
        </div>
        <div className="view-header-actions">
          <button
            className="btn btn-primary"
            onClick={() => onNavigate('new-asset')}
          >
            + Novo ativo
          </button>
        </div>
      </div>

      {/* 4 Metric KPI Cards */}
      <div className="kpi-grid">
        {/* KPI 1 */}
        <div className="kpi-card" onClick={() => onNavigate('assets')}>
          <div className="kpi-header">
            <span className="kpi-title">Total de ativos</span>
          </div>
          <div className="kpi-value-row">
            <span className="kpi-number">1.248</span>
          </div>
          <div className="kpi-trend positive">
            <TrendingUp size={14} />
            <span>+12% este mês</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="kpi-card" onClick={() => onNavigate('assets')}>
          <div className="kpi-header">
            <span className="kpi-title">Em uso</span>
          </div>
          <div className="kpi-value-row">
            <span className="kpi-number text-success">856</span>
          </div>
          <div className="kpi-trend neutral">
            <span>68,6% do total</span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="kpi-card" onClick={() => onNavigate('assets')}>
          <div className="kpi-header">
            <span className="kpi-title">Disponíveis</span>
          </div>
          <div className="kpi-value-row">
            <span className="kpi-number text-warning">256</span>
          </div>
          <div className="kpi-trend neutral">
            <span>20,5% do total</span>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="kpi-card" onClick={() => onNavigate('maintenances')}>
          <div className="kpi-header">
            <span className="kpi-title">Em manutenção</span>
          </div>
          <div className="kpi-value-row">
            <span className="kpi-number text-purple">136</span>
          </div>
          <div className="kpi-trend neutral">
            <span>10,9% do total</span>
          </div>
        </div>
      </div>

      {/* Middle Row: Inventory Summary Donut + Recent Movements */}
      <div className="dashboard-grid-row">
        {/* Inventory Donut Section */}
        <section className="dashboard-card card-donut">
          <div className="card-header-clean">
            <h2 className="card-title">Resumo do inventário</h2>
          </div>

          <div className="donut-chart-container">
            {/* SVG Donut Chart */}
            <div className="donut-svg-wrapper">
              <svg viewBox="0 0 160 160" className="donut-svg">
                {/* Background Track */}
                <circle cx="80" cy="80" r="62" fill="transparent" stroke="#f1f5f9" strokeWidth="22" />
                {/* 512 (41%) Notebooks */}
                <circle
                  cx="80" cy="80" r="62" fill="transparent"
                  stroke="#0d6efd" strokeWidth="22"
                  strokeDasharray="160 390" strokeDashoffset="0"
                />
                {/* 342 (27%) Celulares */}
                <circle
                  cx="80" cy="80" r="62" fill="transparent"
                  stroke="#10b981" strokeWidth="22"
                  strokeDasharray="105 390" strokeDashoffset="-160"
                />
                {/* 198 (16%) Desktops */}
                <circle
                  cx="80" cy="80" r="62" fill="transparent"
                  stroke="#f59e0b" strokeWidth="22"
                  strokeDasharray="62 390" strokeDashoffset="-265"
                />
                {/* 128 (10%) Monitores */}
                <circle
                  cx="80" cy="80" r="62" fill="transparent"
                  stroke="#6366f1" strokeWidth="22"
                  strokeDasharray="39 390" strokeDashoffset="-327"
                />
                {/* 68 (5%) Acessórios */}
                <circle
                  cx="80" cy="80" r="62" fill="transparent"
                  stroke="#14b8a6" strokeWidth="22"
                  strokeDasharray="20 390" strokeDashoffset="-366"
                />
              </svg>
              <div className="donut-center-info">
                <span className="donut-total">1.248</span>
                <span className="donut-sub">Total</span>
              </div>
            </div>

            {/* Legend list */}
            <div className="donut-legend-list">
              {categoriesDonut.map((item, idx) => (
                <div
                  key={idx}
                  className="donut-legend-item"
                  onClick={() => onSelectCategory && onSelectCategory(item.label)}
                  title={`Filtrar por ${item.label}`}
                >
                  <span className="legend-dot" style={{ backgroundColor: item.color }} />
                  <span className="legend-name">{item.label}</span>
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
            <h2 className="card-title">Movimentações recentes</h2>
          </div>

          <div className="movements-list">
            {movements.map((mov) => {
              const Icon = categoryIconMap[mov.assetName] || Laptop;
              return (
                <div key={mov.id} className="movement-row">
                  <div className="movement-device-icon">
                    <Icon size={18} />
                  </div>
                  <div className="movement-details">
                    <span className="movement-asset-name">{mov.assetName}</span>
                    <span className="movement-route-text">{mov.route}</span>
                  </div>
                  <div className="movement-status-meta">
                    <span className={`movement-tag ${mov.tagTone}`}>
                      {mov.type}
                    </span>
                    <small className="movement-time">{mov.time}</small>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="card-footer-action">
            <button
              className="card-action-link"
              onClick={() => onNavigate('movements')}
            >
              Ver todas
            </button>
          </div>
        </section>
      </div>

      {/* Bottom Row: Alerts and pendencies + Assets by Category */}
      <div className="dashboard-grid-row">
        {/* Alerts and Pendencies */}
        <section className="dashboard-card card-alerts">
          <div className="card-header-clean with-link">
            <h2 className="card-title">Alertas e pendências</h2>
            <button
              className="card-header-link"
              onClick={() => onNavigate('maintenances')}
            >
              Ver todos
            </button>
          </div>

          <div className="alerts-clean-list">
            {alerts.map((alt) => (
              <div
                key={alt.id}
                className="alert-clean-item"
                onClick={() => onNavigate('maintenances')}
              >
                <div className={`alert-avatar alert-avatar-${alt.tone}`}>
                  {alt.tone === 'danger' ? (
                    <AlertTriangle size={16} />
                  ) : alt.tone === 'warning' ? (
                    <ShieldCheck size={16} />
                  ) : (
                    <Clock3 size={16} />
                  )}
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
            <h2 className="card-title">Ativos por categoria</h2>
            <button
              className="card-header-link"
              onClick={() => onNavigate('reports')}
            >
              Ver relatório
            </button>
          </div>

          <div className="bars-chart-container">
            <div className="bars-chart-grid">
              {categoryBars.map((bar, idx) => (
                <div
                  key={idx}
                  className="chart-bar-column"
                  onClick={() => onSelectCategory && onSelectCategory(bar.label)}
                  title={`${bar.label}: ${bar.count} ativos`}
                >
                  <span className="bar-top-value">{bar.count}</span>
                  <div className="bar-track">
                    <div
                      className="bar-fill"
                      style={{ height: `${bar.heightPercent}%` }}
                    />
                  </div>
                  <span className="bar-label">{bar.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

