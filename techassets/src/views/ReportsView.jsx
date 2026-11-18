import React from 'react';
import { TrendingUp, Download, Printer } from 'lucide-react';
import { useI18n, formatNumber, formatPercent } from '../i18n';
import { parseCurrency, formatBRL } from '../utils/dates';

export function ReportsView({ assets = [], onNotify }) {
  const { t, language } = useI18n();

  const total = assets.length;
  const inUse = assets.filter((a) => a.status === 'Em uso').length;
  const available = assets.filter((a) => a.status === 'Disponível').length;
  const maintenance = assets.filter((a) => a.status === 'Em manutenção').length;
  const inventoriedValue = assets
    .filter((a) => a.status !== 'Descartado')
    .reduce((sum, a) => sum + parseCurrency(a.cost), 0);

  const handleExportPdf = () => {
    // The browser print dialog offers "Save as PDF"
    if (onNotify) onNotify(t('reports.pdfHint'), 'info');
    window.setTimeout(() => window.print(), 400);
  };

  return (
    <div className="view-container reports-view">
      <div className="view-header">
        <div className="view-title-block">
          <h1 className="view-title">{t('reports.title')}</h1>
          <p className="view-subtitle">{t('reports.subtitle')}</p>
        </div>
        <div className="view-header-actions">
          <button className="btn btn-secondary" onClick={() => window.print()}>
            <Printer size={16} /> {t('reports.print')}
          </button>
          <button className="btn btn-primary" onClick={handleExportPdf}>
            <Download size={16} /> {t('reports.exportPdf')}
          </button>
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <span className="kpi-title">{t('reports.utilizationRate')}</span>
          <span className="kpi-number text-success">
            {total ? Math.round((inUse / total) * 100) : 0}%
          </span>
          <div className="kpi-trend positive">
            <TrendingUp size={14} />
            <span>{t('reports.healthyAlloc')}</span>
          </div>
        </div>

        <div className="kpi-card">
          <span className="kpi-title">{t('reports.activeValue')}</span>
          <span className="kpi-number">{formatBRL(inventoriedValue)}</span>
          <div className="kpi-trend neutral">
            <span>{t('reports.inventoriedValue')}</span>
          </div>
        </div>

        <div className="kpi-card">
          <span className="kpi-title">{t('reports.availability')}</span>
          <span className="kpi-number text-warning">
            {t('reports.equipments', { count: available })}
          </span>
          <div className="kpi-trend neutral">
            <span>{t('reports.readyOnboarding')}</span>
          </div>
        </div>

        <div className="kpi-card">
          <span className="kpi-title">{t('reports.repairIndex')}</span>
          <span className="kpi-number text-purple">
            {t('reports.equipments', { count: maintenance })}
          </span>
          <div className="kpi-trend neutral">
            <span>{t('reports.ofFleet', { pct: formatPercent(maintenance, total, language) })}</span>
          </div>
        </div>
      </div>

      <div className="card-full-panel">
        <h3 className="card-title">{t('reports.execSummary')}</h3>
        <p className="text-muted-dash">
          {t('reports.execText', { total: formatNumber(total, language) })}
        </p>
      </div>
    </div>
  );
}
