import React, { useState, useMemo } from 'react';
import { Plus, Search, ChevronRight, ArrowLeft, X, TrendingUp } from 'lucide-react';
import { StatusBadge } from '../components/common/StatusBadge';
import { useI18n, maintTypeLabel, statusLabel, formatDate } from '../i18n';
import { isPendingMaintenance } from '../utils/alerts';
import {
  parseDate,
  parseCurrency,
  formatBRL,
  startOfDay,
  toStorageDate,
  toInputDate
} from '../utils/dates';

const TYPE_FILTERS = ['Todos', 'Preventiva', 'Corretiva'];
const MAINT_TYPES = ['Preventiva', 'Corretiva', 'Upgrade'];
const MAINT_STATUSES = ['Concluída', 'Em andamento', 'Agendada'];

const emptyRecord = (assetId) => ({
  assetId,
  date: toStorageDate(new Date()),
  type: 'Preventiva',
  description: '',
  provider: '',
  cost: 'R$ 0,00',
  status: 'Concluída'
});

export function MaintenanceView({
  assets = [],
  maintenances = [],
  onAddMaintenance,
  onBack,
  onNotify
}) {
  const { t, language } = useI18n();
  const [showModal, setShowModal] = useState(false);
  const [filterType, setFilterType] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [newRecord, setNewRecord] = useState(() => emptyRecord(assets[0]?.id || ''));

  const assetById = useMemo(() => new Map(assets.map((a) => [a.id, a])), [assets]);

  const filtered = maintenances.filter((m) => {
    const q = searchTerm.toLowerCase();
    const matchType = filterType === 'Todos' || m.type === filterType;
    const matchSearch =
      m.description.toLowerCase().includes(q) ||
      m.provider.toLowerCase().includes(q) ||
      (m.assetName && m.assetName.toLowerCase().includes(q)) ||
      (m.assetId && m.assetId.toLowerCase().includes(q));
    return matchType && matchSearch;
  });

  // KPIs computed from the real maintenance records
  const kpis = useMemo(() => {
    const today = startOfDay();
    const inCurrentMonth = (m) => {
      const d = parseDate(m.date);
      return d && d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
    };
    const pending = maintenances.filter(isPendingMaintenance);
    return {
      open: pending.length,
      completedMonth: maintenances.filter((m) => !isPendingMaintenance(m) && m.status === 'Concluída' && inCurrentMonth(m)).length,
      costMonth: maintenances.filter(inCurrentMonth).reduce((sum, m) => sum + parseCurrency(m.cost), 0),
      overdue: pending.filter((m) => {
        const d = parseDate(m.date);
        return d && d < today;
      }).length
    };
  }, [maintenances]);

  const openModal = () => {
    setNewRecord(emptyRecord(assets[0]?.id || ''));
    setShowModal(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const asset = assetById.get(newRecord.assetId);
    if (!asset) {
      if (onNotify) onNotify(t('maint.errAsset'), 'error');
      return;
    }
    if (!newRecord.description.trim() || !newRecord.provider.trim()) {
      if (onNotify) onNotify(t('maint.errFields'), 'error');
      return;
    }

    const nextNumber =
      maintenances.reduce((max, m) => Math.max(max, parseInt(String(m.id).replace(/\D/g, ''), 10) || 0), 0) + 1;

    onAddMaintenance({
      id: `MNT-${String(nextNumber).padStart(3, '0')}`,
      ...newRecord,
      description: newRecord.description.trim(),
      provider: newRecord.provider.trim(),
      assetName: asset.name
    });
    setShowModal(false);
    if (onNotify) onNotify(t('maint.saveSuccess'));
  };

  return (
    <div className="view-container maintenance-view">
      {/* Breadcrumb */}
      <div className="detail-breadcrumb-bar">
        {onBack && (
          <button className="breadcrumb-back-btn" onClick={onBack} aria-label={t('common.back')}>
            <ArrowLeft size={16} />
          </button>
        )}
        <div className="breadcrumb-path">
          <span className="breadcrumb-segment" onClick={onBack}>
            {t('nav.allAssets')}
          </span>
          <ChevronRight size={14} className="breadcrumb-sep" />
          <span className="breadcrumb-current">{t('nav.maintenances')}</span>
        </div>
        <div className="breadcrumb-action-right">
          <button className="btn btn-primary" onClick={openModal}>
            <Plus size={16} />
            <span>{t('maint.newOrder')}</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Summary */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">{t('maint.kpiOpen')}</span>
          </div>
          <div className="kpi-value-row">
            <span className="kpi-number text-warning">{kpis.open}</span>
          </div>
          <div className="kpi-trend neutral">
            <span>{t('maint.kpiOpenSub')}</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">{t('maint.kpiCompletedMonth')}</span>
          </div>
          <div className="kpi-value-row">
            <span className="kpi-number text-success">{kpis.completedMonth}</span>
          </div>
          <div className="kpi-trend positive">
            <TrendingUp size={14} />
            <span>{t('maint.kpiCompletedSub')}</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">{t('maint.kpiCostMonth')}</span>
          </div>
          <div className="kpi-value-row">
            <span className="kpi-number">{formatBRL(kpis.costMonth)}</span>
          </div>
          <div className="kpi-trend neutral">
            <span>{t('maint.kpiCostSub')}</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">{t('maint.kpiOverdue')}</span>
          </div>
          <div className="kpi-value-row">
            <span className="kpi-number text-purple">{kpis.overdue}</span>
          </div>
          <div className="kpi-trend neutral">
            <span>{t('maint.kpiOverdueSub')}</span>
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="maintenance-table-card">
        <div className="maintenance-filter-bar">
          <div className="toolbar-search-box search-sm">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder={t('maint.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="type-filter-pills">
            {TYPE_FILTERS.map((type) => (
              <button
                key={type}
                className={`category-pill ${filterType === type ? 'active' : ''}`}
                onClick={() => setFilterType(type)}
              >
                {maintTypeLabel(t, type)}
              </button>
            ))}
          </div>
        </div>

        <div className="table-responsive-container">
          <table className="clean-data-table maintenance-table">
            <thead>
              <tr>
                <th>{t('maint.colDate')}</th>
                <th>{t('maint.colType')}</th>
                <th>{t('maint.colDescription')}</th>
                <th>{t('maint.colProvider')}</th>
                <th>{t('maint.colCost')}</th>
                <th>{t('maint.colStatus')}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map((row) => (
                  <tr key={row.id} className="table-row-hover">
                    <td className="td-date">{formatDate(row.date, language)}</td>
                    <td className="td-type">
                      <span className={`type-tag type-${String(row.type).toLowerCase()}`}>
                        {maintTypeLabel(t, row.type)}
                      </span>
                    </td>
                    <td className="td-description">
                      <strong>{row.description}</strong>
                      {row.assetName && (
                        <small className="maintenance-asset-tag">
                          {row.assetName} ({row.assetId})
                        </small>
                      )}
                    </td>
                    <td className="td-provider">{row.provider}</td>
                    <td className="td-cost">{row.cost}</td>
                    <td className="td-status">
                      <StatusBadge value={row.status} size="sm" />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="td-empty-state">
                    {t('maint.empty')}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: New Maintenance */}
      {showModal && (
        <div className="modal-backdrop-scrim" onClick={() => setShowModal(false)}>
          <div className="modal-box-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{t('maint.modalTitle')}</h2>
              <button
                className="modal-close-btn"
                onClick={() => setShowModal(false)}
                aria-label={t('common.close')}
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSave}>
              <div className="modal-body-form">
                <div className="form-group">
                  <label htmlFor="maint-asset">{t('maint.asset')}</label>
                  <select
                    id="maint-asset"
                    value={newRecord.assetId}
                    onChange={(e) => setNewRecord({ ...newRecord, assetId: e.target.value })}
                    required
                  >
                    {assets.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.name} ({a.id})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-row-2col">
                  <div className="form-group">
                    <label htmlFor="maint-type">{t('maint.type')}</label>
                    <select
                      id="maint-type"
                      value={newRecord.type}
                      onChange={(e) => setNewRecord({ ...newRecord, type: e.target.value })}
                    >
                      {MAINT_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {maintTypeLabel(t, type)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="maint-date">{t('maint.date')}</label>
                    <input
                      id="maint-date"
                      type="date"
                      value={toInputDate(newRecord.date)}
                      onChange={(e) =>
                        e.target.value && setNewRecord({ ...newRecord, date: toStorageDate(e.target.value) })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="maint-description">{t('maint.description')}</label>
                  <textarea
                    id="maint-description"
                    rows={3}
                    placeholder={t('maint.descriptionPlaceholder')}
                    value={newRecord.description}
                    onChange={(e) => setNewRecord({ ...newRecord, description: e.target.value })}
                    required
                  />
                </div>

                <div className="form-row-2col">
                  <div className="form-group">
                    <label htmlFor="maint-provider">{t('maint.provider')}</label>
                    <input
                      id="maint-provider"
                      placeholder={t('maint.providerPlaceholder')}
                      value={newRecord.provider}
                      onChange={(e) => setNewRecord({ ...newRecord, provider: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="maint-cost">{t('maint.costEstimate')}</label>
                    <input
                      id="maint-cost"
                      placeholder={t('maint.costPlaceholder')}
                      value={newRecord.cost}
                      onChange={(e) => setNewRecord({ ...newRecord, cost: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="maint-status">{t('maint.status')}</label>
                  <select
                    id="maint-status"
                    value={newRecord.status}
                    onChange={(e) => setNewRecord({ ...newRecord, status: e.target.value })}
                  >
                    {MAINT_STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {statusLabel(t, s)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="modal-actions-bar">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  {t('common.cancel')}
                </button>
                <button type="submit" className="btn btn-primary">
                  {t('maint.save')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
