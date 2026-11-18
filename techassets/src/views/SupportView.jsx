import React, { useState, useMemo } from 'react';
import {
  Mail,
  MessageSquare,
  BookOpen,
  ExternalLink,
  Plus,
  Search,
  Eye,
  Trash2,
  X,
  Download,
  CheckCircle2,
  Ticket
} from 'lucide-react';
import { StatusBadge } from '../components/common/StatusBadge';
import { useI18n, statusLabel, formatMoment } from '../i18n';

const STATUS_FILTERS = ['Todos', 'Aberto', 'Em andamento', 'Resolvido'];
const TICKET_STATUSES = ['Aberto', 'Em andamento', 'Resolvido'];
const TICKET_CATEGORIES = ['hardwareDefect', 'newHardware', 'accessSoftware', 'technicalQuestion'];
const TICKET_PRIORITIES = ['low', 'medium', 'high', 'critical'];

const EMPTY_FORM = {
  subject: '',
  category: 'hardwareDefect',
  priority: 'medium',
  assetId: '',
  description: ''
};

export function SupportView({
  assets = [],
  tickets = [],
  onAddTicket,
  onUpdateTicketStatus,
  onDeleteTicket,
  onSelectAsset,
  onNotify
}) {
  const { t, language } = useI18n();

  const [showTicketModal, setShowTicketModal] = useState(false);
  const [showManualModal, setShowManualModal] = useState(false);
  const [viewingTicketId, setViewingTicketId] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');

  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  const assetById = useMemo(() => new Map(assets.map((a) => [a.id, a])), [assets]);

  const viewingTicket = useMemo(
    () => tickets.find((tk) => tk.id === viewingTicketId) || null,
    [tickets, viewingTicketId]
  );

  const filteredTickets = useMemo(() => {
    const q = searchTerm.toLowerCase().trim();
    return tickets.filter((tk) => {
      const matchStatus = statusFilter === 'Todos' || tk.status === statusFilter;
      if (!matchStatus) return false;
      if (!q) return true;
      return (
        tk.id.toLowerCase().includes(q) ||
        tk.subject.toLowerCase().includes(q) ||
        tk.description.toLowerCase().includes(q) ||
        (tk.assetId && tk.assetId.toLowerCase().includes(q)) ||
        (tk.assetName && tk.assetName.toLowerCase().includes(q))
      );
    });
  }, [tickets, searchTerm, statusFilter]);

  const openNewTicketModal = () => {
    setForm(EMPTY_FORM);
    setErrors({});
    setShowTicketModal(true);
  };

  const handleSubmitTicket = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.subject.trim()) errs.subject = t('support.errSubject');
    if (form.description.trim().length < 10) errs.description = t('support.errDescription');
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const linkedAsset = form.assetId ? assetById.get(form.assetId) : null;
    const created = onAddTicket
      ? onAddTicket({
        ...form,
        assetId: linkedAsset ? linkedAsset.id : '',
        assetName: linkedAsset ? linkedAsset.name : ''
      })
      : null;

    setShowTicketModal(false);
    setForm(EMPTY_FORM);
    setErrors({});
    if (onNotify) {
      onNotify(t('support.ticketCreated', { id: created?.id || 'CHM-001' }));
    }
  };

  const handleStatusChange = (ticketId, nextStatus) => {
    if (onUpdateTicketStatus) onUpdateTicketStatus(ticketId, nextStatus);
    if (onNotify) {
      onNotify(
        t('support.ticketStatusUpdated', {
          id: ticketId,
          status: statusLabel(t, nextStatus)
        })
      );
    }
  };

  const handleDelete = (ticket) => {
    if (!window.confirm(t('support.ticketDeleteConfirm', { id: ticket.id }))) return;
    if (viewingTicketId === ticket.id) setViewingTicketId(null);
    if (onDeleteTicket) onDeleteTicket(ticket.id);
    if (onNotify) onNotify(t('support.ticketDeleted', { id: ticket.id }), 'info');
  };

  const handleDownloadManual = () => {
    const content = [
      `TECHASSETS - ${t('support.manualTitle')}`,
      '='.repeat(56),
      '',
      `1. ${t('support.manualSec1Title')}`,
      t('support.manualSec1Text'),
      '',
      `2. ${t('support.manualSec2Title')}`,
      t('support.manualSec2Text'),
      '',
      `3. ${t('support.manualSec3Title')}`,
      t('support.manualSec3Text'),
      '',
      `4. ${t('support.manualSec4Title')}`,
      t('support.manualSec4Text'),
      ''
    ].join('\n');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `techassets_manual_${language}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    if (onNotify) onNotify(t('support.manualDownloaded'));
  };

  return (
    <div className="view-container support-view">
      <div className="view-header">
        <div className="view-title-block">
          <h1 className="view-title">{t('support.title')}</h1>
          <p className="view-subtitle">{t('support.subtitle')}</p>
        </div>
        <div className="view-header-actions">
          <button type="button" className="btn btn-primary" onClick={openNewTicketModal}>
            <Plus size={16} />
            <span>{t('support.ticketBtn')}</span>
          </button>
        </div>
      </div>

      {/* Top Support Channels */}
      <div className="support-cards-grid">
        <div className="support-card">
          <BookOpen size={28} className="support-card-icon" />
          <h3>{t('support.manualTitle')}</h3>
          <p>{t('support.manualDesc')}</p>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => setShowManualModal(true)}
          >
            {t('support.manualBtn')} <ExternalLink size={13} />
          </button>
        </div>

        <div className="support-card">
          <MessageSquare size={28} className="support-card-icon" />
          <h3>{t('support.ticketTitle')}</h3>
          <p>{t('support.ticketDesc')}</p>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={openNewTicketModal}
          >
            <Plus size={14} /> {t('support.ticketBtn')}
          </button>
        </div>

        <div className="support-card">
          <Mail size={28} className="support-card-icon" />
          <h3>{t('support.contactTitle')}</h3>
          <p>
            {t('support.contactEmail')}: ti-patrimonio@empresa.com.br
            <br />
            {t('support.contactPhone')}
          </p>
          <a
            className="btn btn-secondary btn-sm"
            href="mailto:ti-patrimonio@empresa.com.br"
            onClick={() => onNotify && onNotify(t('support.contactNotify'))}
          >
            {t('support.contactBtn')}
          </a>
        </div>
      </div>

      {/* Support Tickets Tracking Panel */}
      <section className="maintenance-table-card support-tickets-section">
        <div className="support-tickets-header">
          <div>
            <h2 className="card-title">{t('support.ticketsListTitle')}</h2>
            <p className="pane-subtitle">
              {t('support.ticketsCount', { count: tickets.length })}
            </p>
          </div>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={openNewTicketModal}
          >
            <Plus size={14} /> {t('support.newTicket')}
          </button>
        </div>

        <div className="maintenance-filter-bar">
          <div className="toolbar-search-box search-sm">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder={t('support.searchTickets')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="type-filter-pills">
            {STATUS_FILTERS.map((st) => (
              <button
                key={st}
                type="button"
                className={`category-pill ${statusFilter === st ? 'active' : ''}`}
                onClick={() => setStatusFilter(st)}
              >
                {statusLabel(t, st)}
              </button>
            ))}
          </div>
        </div>

        <div className="table-responsive-container">
          <table className="clean-data-table">
            <thead>
              <tr>
                <th>{t('support.colProtocol')}</th>
                <th>{t('support.colSubject')}</th>
                <th>{t('support.colType')}</th>
                <th>{t('support.colPriority')}</th>
                <th>{t('support.colDate')}</th>
                <th>{t('support.colStatus')}</th>
                <th className="th-actions">{t('assets.colActions')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.length > 0 ? (
                filteredTickets.map((tk) => (
                  <tr
                    key={tk.id}
                    className="table-row-hover"
                    onClick={() => setViewingTicketId(tk.id)}
                  >
                    <td>
                      <span className="asset-id-code">{tk.id}</span>
                    </td>
                    <td>
                      <strong>{tk.subject}</strong>
                      {tk.assetId && (
                        <small className="maintenance-asset-tag">
                          {tk.assetName} ({tk.assetId})
                        </small>
                      )}
                    </td>
                    <td>{t(`support.cat.${tk.category}`)}</td>
                    <td>
                      <span className={`priority-pill priority-${tk.priority}`}>
                        {t(`support.priority.${tk.priority}`)}
                      </span>
                    </td>
                    <td>{formatMoment(tk.createdAt, language, t)}</td>
                    <td>
                      <StatusBadge value={tk.status} size="sm" />
                    </td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <div className="action-buttons-group">
                        <button
                          type="button"
                          className="btn-action-icon"
                          title={t('support.viewTicket')}
                          aria-label={t('support.viewTicket')}
                          onClick={() => setViewingTicketId(tk.id)}
                        >
                          <Eye size={16} />
                        </button>
                        {tk.status !== 'Resolvido' && (
                          <button
                            type="button"
                            className="btn-action-icon"
                            title={t('support.markResolved')}
                            aria-label={t('support.markResolved')}
                            onClick={() => handleStatusChange(tk.id, 'Resolvido')}
                          >
                            <CheckCircle2 size={16} />
                          </button>
                        )}
                        <button
                          type="button"
                          className="btn-action-icon btn-action-danger"
                          title={t('support.deleteTicket')}
                          aria-label={t('support.deleteTicket')}
                          onClick={() => handleDelete(tk)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="td-empty-state">
                    <div className="support-empty-state">
                      <Ticket size={28} className="support-empty-icon" />
                      <p>
                        {tickets.length === 0
                          ? t('support.ticketsEmpty')
                          : t('support.ticketsEmptyFiltered')}
                      </p>
                      {tickets.length === 0 ? (
                        <button
                          type="button"
                          className="btn btn-primary btn-sm"
                          onClick={openNewTicketModal}
                        >
                          <Plus size={14} /> {t('support.openFirstTicket')}
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn-reset-filters"
                          onClick={() => {
                            setSearchTerm('');
                            setStatusFilter('Todos');
                          }}
                        >
                          {t('assets.resetFilters')}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Modal: Open New Support Ticket */}
      {showTicketModal && (
        <div className="modal-backdrop-scrim" onClick={() => setShowTicketModal(false)}>
          <div className="modal-box-card" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <div className="modal-header">
              <div className="modal-title-group">
                <h2>{t('support.modalTitle')}</h2>
                <p className="modal-subtitle">{t('support.modalSubtitle')}</p>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setShowTicketModal(false)}
                aria-label={t('common.close')}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmitTicket}>
              <div className="modal-body-form">
                <div className="form-group">
                  <label htmlFor="ticket-subject">{t('support.fieldSubject')}</label>
                  <input
                    id="ticket-subject"
                    type="text"
                    placeholder={t('support.fieldSubjectPlaceholder')}
                    value={form.subject}
                    onChange={(e) => {
                      setForm({ ...form, subject: e.target.value });
                      if (errors.subject) setErrors({ ...errors, subject: undefined });
                    }}
                    className={errors.subject ? 'input-error' : ''}
                    required
                  />
                  {errors.subject && <span className="field-error-msg">{errors.subject}</span>}
                </div>

                <div className="form-row-2col">
                  <div className="form-group">
                    <label htmlFor="ticket-category">{t('support.fieldCategory')}</label>
                    <select
                      id="ticket-category"
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                    >
                      {TICKET_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {t(`support.cat.${cat}`)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="ticket-priority">{t('support.fieldPriority')}</label>
                    <select
                      id="ticket-priority"
                      value={form.priority}
                      onChange={(e) => setForm({ ...form, priority: e.target.value })}
                    >
                      {TICKET_PRIORITIES.map((prio) => (
                        <option key={prio} value={prio}>
                          {t(`support.priority.${prio}`)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="ticket-asset">{t('support.fieldAsset')}</label>
                  <select
                    id="ticket-asset"
                    value={form.assetId}
                    onChange={(e) => setForm({ ...form, assetId: e.target.value })}
                  >
                    <option value="">{t('support.fieldAssetNone')}</option>
                    {assets.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.name} ({a.id})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="ticket-description">{t('support.fieldDescription')}</label>
                  <textarea
                    id="ticket-description"
                    rows={4}
                    placeholder={t('support.fieldDescriptionPlaceholder')}
                    value={form.description}
                    onChange={(e) => {
                      setForm({ ...form, description: e.target.value });
                      if (errors.description) setErrors({ ...errors, description: undefined });
                    }}
                    className={errors.description ? 'input-error' : ''}
                    required
                  />
                  {errors.description && (
                    <span className="field-error-msg">{errors.description}</span>
                  )}
                </div>
              </div>

              <div className="modal-actions-bar">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowTicketModal(false)}
                >
                  {t('common.cancel')}
                </button>
                <button type="submit" className="btn btn-primary">
                  <MessageSquare size={15} />
                  <span>{t('support.submitTicket')}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: View & Manage Ticket Details */}
      {viewingTicket && (
        <div className="modal-backdrop-scrim" onClick={() => setViewingTicketId(null)}>
          <div className="modal-box-card" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <div className="modal-header">
              <div className="modal-title-group">
                <h2>
                  {viewingTicket.id} — {viewingTicket.subject}
                </h2>
                <p className="modal-subtitle">
                  {t('support.openedBy', {
                    name: viewingTicket.requester || '—',
                    date: formatMoment(viewingTicket.createdAt, language, t)
                  })}
                </p>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setViewingTicketId(null)}
                aria-label={t('common.close')}
              >
                <X size={18} />
              </button>
            </div>

            <div className="modal-body-form">
              <div className="ticket-detail-grid">
                <div className="review-item">
                  <span>{t('support.colType')}</span>
                  <b>{t(`support.cat.${viewingTicket.category}`)}</b>
                </div>
                <div className="review-item">
                  <span>{t('support.colPriority')}</span>
                  <div>
                    <span className={`priority-pill priority-${viewingTicket.priority}`}>
                      {t(`support.priority.${viewingTicket.priority}`)}
                    </span>
                  </div>
                </div>
                <div className="review-item">
                  <span>{t('support.colStatus')}</span>
                  <div>
                    <StatusBadge value={viewingTicket.status} size="sm" />
                  </div>
                </div>
                <div className="review-item">
                  <span>{t('support.linkedAsset')}</span>
                  {viewingTicket.assetId && assetById.get(viewingTicket.assetId) ? (
                    <button
                      type="button"
                      className="card-header-link ticket-asset-link"
                      onClick={() => {
                        const target = assetById.get(viewingTicket.assetId);
                        setViewingTicketId(null);
                        if (onSelectAsset && target) onSelectAsset(target);
                      }}
                    >
                      {viewingTicket.assetName} ({viewingTicket.assetId})
                    </button>
                  ) : (
                    <b>{viewingTicket.assetId ? `${viewingTicket.assetName} (${viewingTicket.assetId})` : '—'}</b>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label>{t('support.fieldDescriptionLabel')}</label>
                <div className="ticket-description-box">{viewingTicket.description}</div>
              </div>

              <div className="form-group">
                <label htmlFor="ticket-detail-status">{t('support.updateStatus')}</label>
                <select
                  id="ticket-detail-status"
                  value={viewingTicket.status}
                  onChange={(e) => handleStatusChange(viewingTicket.id, e.target.value)}
                >
                  {TICKET_STATUSES.map((st) => (
                    <option key={st} value={st}>
                      {statusLabel(t, st)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="modal-actions-bar">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setViewingTicketId(null)}
              >
                {t('common.close')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Asset Management Manual */}
      {showManualModal && (
        <div className="modal-backdrop-scrim" onClick={() => setShowManualModal(false)}>
          <div className="modal-box-card" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <div className="modal-header">
              <div className="modal-title-group">
                <h2>{t('support.manualTitle')}</h2>
                <p className="modal-subtitle">{t('support.manualModalSubtitle')}</p>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setShowManualModal(false)}
                aria-label={t('common.close')}
              >
                <X size={18} />
              </button>
            </div>

            <div className="manual-sections-list">
              <div className="manual-section-item">
                <h4>1. {t('support.manualSec1Title')}</h4>
                <p>{t('support.manualSec1Text')}</p>
              </div>
              <div className="manual-section-item">
                <h4>2. {t('support.manualSec2Title')}</h4>
                <p>{t('support.manualSec2Text')}</p>
              </div>
              <div className="manual-section-item">
                <h4>3. {t('support.manualSec3Title')}</h4>
                <p>{t('support.manualSec3Text')}</p>
              </div>
              <div className="manual-section-item">
                <h4>4. {t('support.manualSec4Title')}</h4>
                <p>{t('support.manualSec4Text')}</p>
              </div>
            </div>

            <div className="modal-actions-bar">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowManualModal(false)}
              >
                {t('common.close')}
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleDownloadManual}
              >
                <Download size={15} />
                <span>{t('support.manualDownloadBtn')}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
