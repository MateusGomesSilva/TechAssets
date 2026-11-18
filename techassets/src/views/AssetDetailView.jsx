import React, { useState, useEffect } from 'react';
import {
  ChevronRight,
  Edit,
  ChevronDown,
  Maximize2,
  FileText,
  Wrench,
  Download,
  Plus,
  QrCode,
  Printer,
  Trash2,
  ArrowLeft
} from 'lucide-react';
import { StatusBadge } from '../components/common/StatusBadge';
import {
  useI18n,
  categoryLabel,
  statusLabel,
  maintTypeLabel,
  movementTypeLabel,
  formatDate,
  formatMoment,
  resolveText
} from '../i18n';
import { toInputDate } from '../utils/dates';

const TABS = ['summary', 'movements', 'maintenances', 'documents'];
const EDIT_STATUSES = ['Em uso', 'Disponível', 'Em manutenção', 'Descartado'];

// Sample attachments (names are translated, brands / document numbers are not)
const DOCUMENTS = [
  { key: 'detail.doc1', size: '1.2 MB', date: '10/03/2024' },
  { key: 'detail.doc2', size: '480 KB', date: '12/03/2024' },
  { key: 'detail.doc3', size: '820 KB', date: '12/03/2024' }
];

export function AssetDetailView({
  asset,
  onBack,
  onNavigate,
  onNotify,
  onUpdateAsset,
  maintenances = [],
  movements = []
}) {
  const { t, language } = useI18n();
  const [activeTab, setActiveTab] = useState('summary');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [showActionsDropdown, setShowActionsDropdown] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', person: '', location: '', status: 'Em uso', warranty: '' });

  // Load the form with the current record whenever the modal opens
  useEffect(() => {
    if (showEditModal && asset) {
      setEditForm({
        name: asset.name || '',
        person: asset.person === '—' ? '' : asset.person || '',
        location: asset.location || '',
        status: asset.status || 'Em uso',
        warranty: toInputDate(asset.warranty)
      });
    }
  }, [showEditModal, asset]);

  if (!asset) {
    return (
      <div className="view-container asset-detail-view">
        <div className="card-full-panel empty-detail-panel">
          <p>{t('detail.notFound')}</p>
          <button className="btn btn-primary" onClick={onBack}>
            <ArrowLeft size={15} /> {t('detail.back')}
          </button>
        </div>
      </div>
    );
  }

  const currentAsset = asset;
  const assetMaintenances = maintenances.filter((m) => m.assetId === currentAsset.id);
  const assetMovements = movements.filter((m) => m.assetId === currentAsset.id);

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editForm.name.trim() || !editForm.location.trim()) {
      if (onNotify) onNotify(t('detail.editRequired'), 'error');
      return;
    }
    const ok = onUpdateAsset ? onUpdateAsset(currentAsset.id, editForm) : false;
    setShowEditModal(false);
    if (onNotify && ok) onNotify(t('detail.editSuccess'));
  };

  return (
    <div className="view-container asset-detail-view">
      {/* Top Breadcrumbs */}
      <div className="detail-breadcrumb-bar">
        <button className="breadcrumb-back-btn" onClick={onBack} aria-label={t('detail.back')}>
          <ArrowLeft size={16} />
        </button>
        <div className="breadcrumb-path">
          <span className="breadcrumb-segment" onClick={onBack}>
            {t('nav.allAssets')}
          </span>
          <ChevronRight size={14} className="breadcrumb-sep" />
          <span className="breadcrumb-current">
            {currentAsset.name} ({currentAsset.id})
          </span>
        </div>
        <div className="breadcrumb-status-wrapper">
          <StatusBadge value={currentAsset.status} />
        </div>
      </div>

      {/* Main Detail Header Card */}
      <div className="asset-detail-card">
        <div className="detail-grid-layout">
          {/* Left Column: Product Photo Showcase */}
          <div className="detail-media-column">
            <div className="product-main-preview">
              <div className="laptop-preview-stage">
                <div className="laptop-device-body">
                  <div className="laptop-screen-frame">
                    <div className="laptop-screen-display">
                      <div className="fluid-wave-bg">
                        <div className="fluid-wave wave-1" />
                        <div className="fluid-wave wave-2" />
                        <div className="fluid-center-logo">
                          <span className="logo-pill">{currentAsset.name}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="laptop-base-chassis" />
                </div>
              </div>

              <button
                className="btn-expand-preview"
                title={t('detail.expandPreview')}
                aria-label={t('detail.expandPreview')}
                onClick={() => onNotify && onNotify(t('detail.hdPreview'))}
              >
                <Maximize2 size={16} />
              </button>
            </div>

            {/* Thumbnails Gallery */}
            <div className="product-thumbnails-strip">
              {[0, 1, 2, 3].map((idx) => (
                <div
                  key={idx}
                  className={`thumbnail-box ${selectedPhotoIndex === idx ? 'active' : ''}`}
                  onClick={() => setSelectedPhotoIndex(idx)}
                >
                  <div className="mini-thumb-screen" />
                </div>
              ))}
              <button
                className="thumbnail-more-btn"
                onClick={() => onNotify && onNotify(t('detail.galleryInfo'))}
                title={t('detail.viewAllPhotos')}
                aria-label={t('detail.viewAllPhotos')}
              >
                <Maximize2 size={14} />
              </button>
            </div>

            {/* Action Buttons under photo */}
            <div className="detail-photo-actions">
              <button className="btn-detail-edit" onClick={() => setShowEditModal(true)}>
                <Edit size={15} />
                <span>{t('detail.edit')}</span>
              </button>

              <div className="dropdown-actions-wrapper">
                <button
                  className="btn-detail-more"
                  onClick={() => setShowActionsDropdown(!showActionsDropdown)}
                >
                  <span>{t('detail.actions')}</span>
                  <ChevronDown size={14} />
                </button>

                {showActionsDropdown && (
                  <div className="actions-dropdown-menu">
                    <button
                      className="dropdown-menu-item"
                      onClick={() => {
                        setShowActionsDropdown(false);
                        setShowQrModal(true);
                      }}
                    >
                      <QrCode size={15} />
                      <span>{t('detail.generateQr')}</span>
                    </button>
                    <button
                      className="dropdown-menu-item"
                      onClick={() => {
                        setShowActionsDropdown(false);
                        window.print();
                      }}
                    >
                      <Printer size={15} />
                      <span>{t('detail.printSheet')}</span>
                    </button>
                    <button
                      className="dropdown-menu-item"
                      onClick={() => {
                        setShowActionsDropdown(false);
                        onNavigate('maintenances');
                      }}
                    >
                      <Wrench size={15} />
                      <span>{t('detail.scheduleMaint')}</span>
                    </button>
                    <div className="dropdown-divider" />
                    <button
                      className="dropdown-menu-item item-danger"
                      onClick={() => {
                        setShowActionsDropdown(false);
                        if (onNotify) onNotify(t('detail.discardInfo'));
                      }}
                    >
                      <Trash2 size={15} />
                      <span>{t('detail.requestDiscard')}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Specification Metadata */}
          <div className="detail-meta-column">
            <h1 className="detail-asset-name">{currentAsset.name}</h1>

            <div className="detail-fields-list">
              <div className="detail-field-row">
                <span className="field-label">{t('assets.colId')}</span>
                <span className="field-value font-mono">{currentAsset.id}</span>
              </div>
              <div className="detail-field-row">
                <span className="field-label">{t('assets.colCategory')}</span>
                <span className="field-value">{categoryLabel(t, currentAsset.category)}</span>
              </div>
              <div className="detail-field-row">
                <span className="field-label">{t('detail.model')}</span>
                <span className="field-value">{currentAsset.model || '—'}</span>
              </div>
              <div className="detail-field-row">
                <span className="field-label">{t('detail.serial')}</span>
                <span className="field-value font-mono">{currentAsset.serial || '—'}</span>
              </div>
              <div className="detail-field-row">
                <span className="field-label">{t('assets.colStatus')}</span>
                <span className="field-value">{statusLabel(t, currentAsset.status)}</span>
              </div>
              <div className="detail-field-row">
                <span className="field-label">{t('assets.colPerson')}</span>
                <span className="field-value text-primary-link">{currentAsset.person || '—'}</span>
              </div>
              <div className="detail-field-row">
                <span className="field-label">{t('assets.colLocation')}</span>
                <span className="field-value">{currentAsset.location || '—'}</span>
              </div>
              <div className="detail-field-row">
                <span className="field-label">{t('detail.acquisitionDate')}</span>
                <span className="field-value">{formatDate(currentAsset.date, language)}</span>
              </div>
              <div className="detail-field-row">
                <span className="field-label">{t('detail.warrantyUntil')}</span>
                <span className="field-value">{formatDate(currentAsset.warranty, language)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Tabs Section */}
      <div className="detail-tabs-section">
        <div className="tabs-header-bar">
          {TABS.map((tab) => (
            <button
              key={tab}
              className={`detail-tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              <span>{t(`detail.tab.${tab}`)}</span>
              {tab === 'maintenances' && assetMaintenances.length > 0 && (
                <span className="tab-badge-counter">{assetMaintenances.length}</span>
              )}
            </button>
          ))}
        </div>

        <div className="tab-content-container">
          {/* TAB 1: SUMMARY (Hardware Specifications) */}
          {activeTab === 'summary' && (
            <div className="specs-grid-cards">
              <div className="spec-card">
                <span className="spec-card-label">{t('detail.processor')}</span>
                <strong className="spec-card-value">{currentAsset.specs?.processor || '—'}</strong>
              </div>
              <div className="spec-card">
                <span className="spec-card-label">{t('detail.ram')}</span>
                <strong className="spec-card-value">{currentAsset.specs?.ram || '—'}</strong>
              </div>
              <div className="spec-card">
                <span className="spec-card-label">{t('detail.storage')}</span>
                <strong className="spec-card-value">{currentAsset.specs?.storage || '—'}</strong>
              </div>
              <div className="spec-card">
                <span className="spec-card-label">{t('detail.os')}</span>
                <strong className="spec-card-value">{currentAsset.specs?.os || '—'}</strong>
              </div>
            </div>
          )}

          {/* TAB 2: MOVEMENTS (real records of this asset) */}
          {activeTab === 'movements' && (
            <div className="tab-pane-movements">
              {assetMovements.length > 0 ? (
                <div className="timeline-clean">
                  {assetMovements.map((mov) => (
                    <div key={mov.id} className="timeline-item">
                      <div className="timeline-dot" />
                      <div className="timeline-body">
                        <div className="timeline-meta">
                          <span className="timeline-type">{movementTypeLabel(t, mov.type)}</span>
                          <span className="timeline-date">{formatMoment(mov.at, language, t)}</span>
                        </div>
                        <p className="timeline-route">
                          {t('detail.origin')}: <b>{resolveText(t, mov.from)}</b> → {t('detail.destination')}:{' '}
                          <b>{resolveText(t, mov.to)}</b>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-dash">{t('detail.noMovements')}</p>
              )}
            </div>
          )}

          {/* TAB 3: MAINTENANCES */}
          {activeTab === 'maintenances' && (
            <div className="tab-pane-maintenances">
              <div className="pane-header-actions">
                <p className="pane-subtitle">{t('detail.maintSubtitle')}</p>
                <button className="btn btn-primary btn-sm" onClick={() => onNavigate('maintenances')}>
                  <Plus size={15} /> {t('detail.newMaintenance')}
                </button>
              </div>

              <div className="table-responsive-container">
                <table className="clean-data-table">
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
                    {assetMaintenances.length > 0 ? (
                      assetMaintenances.map((m) => (
                        <tr key={m.id}>
                          <td>{formatDate(m.date, language)}</td>
                          <td>
                            <b>{maintTypeLabel(t, m.type)}</b>
                          </td>
                          <td>{m.description}</td>
                          <td>{m.provider}</td>
                          <td>{m.cost}</td>
                          <td>
                            <StatusBadge value={m.status} size="sm" />
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="td-empty-state">
                          {t('detail.noMaintenance')}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: DOCUMENTS */}
          {activeTab === 'documents' && (
            <div className="tab-pane-documents">
              <div className="documents-list">
                {DOCUMENTS.map((doc) => (
                  <div key={doc.key} className="document-item-row">
                    <div className="doc-icon">
                      <FileText size={20} />
                    </div>
                    <div className="doc-meta">
                      <span className="doc-name">{t(doc.key)}</span>
                      <small className="doc-sub">
                        {doc.size} • {t('detail.attachedOn', { date: formatDate(doc.date, language) })}
                      </small>
                    </div>
                    <button
                      className="btn-doc-download"
                      onClick={() => onNotify && onNotify(t('detail.downloadStarted', { name: t(doc.key) }))}
                      title={t('detail.downloadFile')}
                    >
                      <Download size={16} />
                      <span>{t('detail.download')}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* QR Code Modal */}
      {showQrModal && (
        <div className="modal-backdrop-scrim" onClick={() => setShowQrModal(false)}>
          <div className="modal-box-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{t('detail.qrTitle')}</h2>
              <button
                className="modal-close-btn"
                onClick={() => setShowQrModal(false)}
                aria-label={t('common.close')}
              >
                ×
              </button>
            </div>
            <div className="qr-modal-body">
              <div className="qr-sticker-preview">
                <div className="sticker-header">{t('detail.qrHeader')}</div>
                <div className="sticker-qr-code">
                  <svg viewBox="0 0 100 100" width="120" height="120">
                    <rect width="100" height="100" fill="#fff" />
                    <path d="M10 10h25v25h-25zM15 15h15v15h-15zM65 10h25v25h-25zM70 15h15v15h-15zM10 65h25v25h-25zM15 70h15v15h-15zM45 10h10v10h-10zM45 30h10v10h-10zM10 45h10v10h-10zM30 45h15v15h-15zM55 45h20v10h-20zM85 45h10v20h-10zM45 65h15v15h-15zM70 65h10v25h-10zM85 75h10v15h-10z" fill="#0b1220" />
                  </svg>
                </div>
                <div className="sticker-code">{currentAsset.id}</div>
                <div className="sticker-name">{currentAsset.name}</div>
              </div>
              <div className="modal-actions-bar">
                <button className="btn btn-secondary" onClick={() => setShowQrModal(false)}>
                  {t('common.close')}
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    window.print();
                    setShowQrModal(false);
                  }}
                >
                  <Printer size={15} /> {t('detail.printLabel')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Edit Modal */}
      {showEditModal && (
        <div className="modal-backdrop-scrim" onClick={() => setShowEditModal(false)}>
          <div className="modal-box-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{t('detail.editTitle')}</h2>
              <button
                className="modal-close-btn"
                onClick={() => setShowEditModal(false)}
                aria-label={t('common.close')}
              >
                ×
              </button>
            </div>
            <form className="modal-body-form" onSubmit={handleSaveEdit}>
              <div className="form-group">
                <label htmlFor="edit-name">{t('detail.editName')}</label>
                <input
                  id="edit-name"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="edit-person">{t('detail.editPerson')}</label>
                <input
                  id="edit-person"
                  value={editForm.person}
                  placeholder={t('detail.editPersonPlaceholder')}
                  onChange={(e) => setEditForm({ ...editForm, person: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="edit-location">{t('assets.colLocation')}</label>
                <input
                  id="edit-location"
                  value={editForm.location}
                  onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="edit-status">{t('assets.colStatus')}</label>
                <select
                  id="edit-status"
                  value={editForm.status}
                  onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                >
                  {EDIT_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {statusLabel(t, s)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="edit-warranty">{t('detail.warrantyUntil')}</label>
                <input
                  id="edit-warranty"
                  type="date"
                  value={editForm.warranty}
                  onChange={(e) => setEditForm({ ...editForm, warranty: e.target.value })}
                />
              </div>
              <div className="modal-actions-bar">
                <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>
                  {t('common.cancel')}
                </button>
                <button type="submit" className="btn btn-primary">
                  {t('detail.saveChanges')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
