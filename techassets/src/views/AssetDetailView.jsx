import React, { useState } from 'react';
import {
  ChevronRight,
  Edit,
  ChevronDown,
  Maximize2,
  FileText,
  Clock,
  Wrench,
  Cpu,
  Layers,
  HardDrive,
  Monitor,
  Download,
  Plus,
  CheckCircle2,
  Share2,
  QrCode,
  Printer,
  Trash2,
  ArrowLeft
} from 'lucide-react';
import { StatusBadge } from '../components/common/StatusBadge';

export function AssetDetailView({
  asset,
  onBack,
  onNavigate,
  onNotify,
  maintenances = [],
  onOpenMaintenanceModal
}) {
  const [activeTab, setActiveTab] = useState('Resumo');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [showActionsDropdown, setShowActionsDropdown] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

  // Fallback if no asset selected
  const currentAsset = asset || {
    id: 'NB-0001',
    name: 'MacBook Pro 14”',
    category: 'Notebook',
    model: 'MacBook Pro 14” (M2 Pro)',
    serial: 'C02X1234XQ1',
    status: 'Em uso',
    person: 'João da Silva',
    location: 'Desenvolvimento',
    date: '12/03/2024',
    warranty: '12/03/2026',
    specs: {
      processor: 'Apple M2 Pro',
      ram: '16 GB',
      storage: '512 GB',
      os: 'macOS Sonoma'
    }
  };

  const assetMaintenances = maintenances.filter(
    (m) => m.assetId === currentAsset.id || m.assetName === currentAsset.name
  );

  const assetMovements = [
    { date: '12/03/2024 10:30', from: 'Estoque Central', to: 'Desenvolvimento', responsible: 'João da Silva', type: 'Entrega' },
    { date: '08/03/2024 14:15', from: 'Fornecedor Apple', to: 'Estoque Central', responsible: 'Almoxarifado TI', type: 'Entrada' }
  ];

  const documents = [
    { name: 'Nota Fiscal de Compra (NF-e 88291)', size: '1.2 MB', date: '10/03/2024' },
    { name: 'Termo de Responsabilidade e Entrega Assinado', size: '480 KB', date: '12/03/2024' },
    { name: 'Certificado de Garantia AppleCare', size: '820 KB', date: '12/03/2024' }
  ];

  return (
    <div className="view-container asset-detail-view">
      {/* Top Breadcrumbs (Matching 05-detalhes-do-ativo.png) */}
      <div className="detail-breadcrumb-bar">
        <button className="breadcrumb-back-btn" onClick={onBack}>
          <ArrowLeft size={16} />
        </button>
        <div className="breadcrumb-path">
          <span className="breadcrumb-segment" onClick={onBack}>Ativos</span>
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
          {/* Left Column: Interactive Product Photo Showcase */}
          <div className="detail-media-column">
            <div className="product-main-preview">
              {/* Modern CSS hardware preview with fluid glowing wave */}
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
                title="Ampliar visualização"
                onClick={() => onNotify && onNotify('Visualização em alta definição.')}
              >
                <Maximize2 size={16} />
              </button>
            </div>

            {/* 4 Thumbnails Gallery */}
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
                onClick={() => onNotify && onNotify('Galeria completa com 6 fotos registradas.')}
                title="Ver todas as fotos"
              >
                <Maximize2 size={14} />
              </button>
            </div>

            {/* Action Buttons under photo (Matching 05-detalhes-do-ativo.png) */}
            <div className="detail-photo-actions">
              <button
                className="btn-detail-edit"
                onClick={() => setShowEditModal(true)}
              >
                <Edit size={15} />
                <span>Editar</span>
              </button>

              <div className="dropdown-actions-wrapper">
                <button
                  className="btn-detail-more"
                  onClick={() => setShowActionsDropdown(!showActionsDropdown)}
                >
                  <span>Ações</span>
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
                      <span>Gerar QR Code / Etiqueta</span>
                    </button>
                    <button
                      className="dropdown-menu-item"
                      onClick={() => {
                        setShowActionsDropdown(false);
                        window.print();
                      }}
                    >
                      <Printer size={15} />
                      <span>Imprimir Ficha Técnica</span>
                    </button>
                    <button
                      className="dropdown-menu-item"
                      onClick={() => {
                        setShowActionsDropdown(false);
                        onNavigate('maintenances');
                      }}
                    >
                      <Wrench size={15} />
                      <span>Agendar Manutenção</span>
                    </button>
                    <div className="dropdown-divider" />
                    <button
                      className="dropdown-menu-item item-danger"
                      onClick={() => {
                        setShowActionsDropdown(false);
                        if (onNotify) onNotify('Ativo marcado para análise de descarte.');
                      }}
                    >
                      <Trash2 size={15} />
                      <span>Solicitar Descarte</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Specification Metadata (Matching 05-detalhes-do-ativo.png) */}
          <div className="detail-meta-column">
            <h1 className="detail-asset-name">{currentAsset.name}</h1>

            <div className="detail-fields-list">
              <div className="detail-field-row">
                <span className="field-label">Patrimônio</span>
                <span className="field-value font-mono">{currentAsset.id}</span>
              </div>
              <div className="detail-field-row">
                <span className="field-label">Categoria</span>
                <span className="field-value">{currentAsset.category}</span>
              </div>
              <div className="detail-field-row">
                <span className="field-label">Modelo</span>
                <span className="field-value">{currentAsset.model}</span>
              </div>
              <div className="detail-field-row">
                <span className="field-label">Número de série</span>
                <span className="field-value font-mono">{currentAsset.serial}</span>
              </div>
              <div className="detail-field-row">
                <span className="field-label">Estado</span>
                <span className="field-value">{currentAsset.status}</span>
              </div>
              <div className="detail-field-row">
                <span className="field-label">Responsável</span>
                <span className="field-value text-primary-link">{currentAsset.person || '—'}</span>
              </div>
              <div className="detail-field-row">
                <span className="field-label">Localização</span>
                <span className="field-value">{currentAsset.location || 'Estoque Central'}</span>
              </div>
              <div className="detail-field-row">
                <span className="field-label">Data de aquisição</span>
                <span className="field-value">{currentAsset.date || '12/03/2024'}</span>
              </div>
              <div className="detail-field-row">
                <span className="field-label">Garantia até</span>
                <span className="field-value">{currentAsset.warranty || '12/03/2026'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Tabs Section (Matching 05-detalhes-do-ativo.png) */}
      <div className="detail-tabs-section">
        <div className="tabs-header-bar">
          {['Resumo', 'Movimentações', 'Manutenções', 'Documentos'].map((tab) => (
            <button
              key={tab}
              className={`detail-tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              <span>{tab}</span>
              {tab === 'Manutenções' && assetMaintenances.length > 0 && (
                <span className="tab-badge-counter">{assetMaintenances.length}</span>
              )}
            </button>
          ))}
        </div>

        <div className="tab-content-container">
          {/* TAB 1: RESUMO (Hardware Specifications) */}
          {activeTab === 'Resumo' && (
            <div className="specs-grid-cards">
              <div className="spec-card">
                <span className="spec-card-label">Processador</span>
                <strong className="spec-card-value">
                  {currentAsset.specs?.processor || 'Apple M2 Pro'}
                </strong>
              </div>

              <div className="spec-card">
                <span className="spec-card-label">Memória RAM</span>
                <strong className="spec-card-value">
                  {currentAsset.specs?.ram || '16 GB'}
                </strong>
              </div>

              <div className="spec-card">
                <span className="spec-card-label">Armazenamento</span>
                <strong className="spec-card-value">
                  {currentAsset.specs?.storage || '512 GB'}
                </strong>
              </div>

              <div className="spec-card">
                <span className="spec-card-label">Sistema Operacional</span>
                <strong className="spec-card-value">
                  {currentAsset.specs?.os || 'macOS Sonoma'}
                </strong>
              </div>
            </div>
          )}

          {/* TAB 2: MOVIMENTAÇÕES */}
          {activeTab === 'Movimentações' && (
            <div className="tab-pane-movements">
              <div className="timeline-clean">
                {assetMovements.map((mov, idx) => (
                  <div key={idx} className="timeline-item">
                    <div className="timeline-dot" />
                    <div className="timeline-body">
                      <div className="timeline-meta">
                        <span className="timeline-type">{mov.type}</span>
                        <span className="timeline-date">{mov.date}</span>
                      </div>
                      <p className="timeline-route">
                        Origem: <b>{mov.from}</b> → Destino: <b>{mov.to}</b>
                      </p>
                      <small className="timeline-author">Responsável: {mov.responsible}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: MANUTENÇÕES */}
          {activeTab === 'Manutenções' && (
            <div className="tab-pane-maintenances">
              <div className="pane-header-actions">
                <p className="pane-subtitle">
                  Histórico de intervenções e manutenções registradas para este equipamento.
                </p>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => onNavigate('maintenances')}
                >
                  <Plus size={15} /> Nova manutenção
                </button>
              </div>

              <div className="table-responsive-container">
                <table className="clean-data-table">
                  <thead>
                    <tr>
                      <th>Data</th>
                      <th>Tipo</th>
                      <th>Descrição</th>
                      <th>Prestador</th>
                      <th>Custo</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assetMaintenances.length > 0 ? (
                      assetMaintenances.map((m) => (
                        <tr key={m.id}>
                          <td>{m.date}</td>
                          <td><b>{m.type}</b></td>
                          <td>{m.description}</td>
                          <td>{m.provider}</td>
                          <td>{m.cost}</td>
                          <td><StatusBadge value={m.status} size="sm" /></td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="td-empty-state">
                          Nenhuma manutenção pendente para este equipamento.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: DOCUMENTOS */}
          {activeTab === 'Documentos' && (
            <div className="tab-pane-documents">
              <div className="documents-list">
                {documents.map((doc, idx) => (
                  <div key={idx} className="document-item-row">
                    <div className="doc-icon">
                      <FileText size={20} />
                    </div>
                    <div className="doc-meta">
                      <span className="doc-name">{doc.name}</span>
                      <small className="doc-sub">{doc.size} • Anexado em {doc.date}</small>
                    </div>
                    <button
                      className="btn-doc-download"
                      onClick={() => onNotify && onNotify(`Download de ${doc.name} iniciado.`)}
                      title="Baixar arquivo"
                    >
                      <Download size={16} />
                      <span>Download</span>
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
              <h2>Etiqueta Patrimonial com QR Code</h2>
              <button className="modal-close-btn" onClick={() => setShowQrModal(false)}>×</button>
            </div>
            <div className="qr-modal-body">
              <div className="qr-sticker-preview">
                <div className="sticker-header">TECHASSETS • PATRIMÔNIO</div>
                <div className="sticker-qr-code">
                  <svg viewBox="0 0 100 100" width="120" height="120">
                    <rect width="100" height="100" fill="#fff" />
                    {/* Simulated QR Pattern */}
                    <path d="M10 10h25v25h-25zM15 15h15v15h-15zM65 10h25v25h-25zM70 15h15v15h-15zM10 65h25v25h-25zM15 70h15v15h-15zM45 10h10v10h-10zM45 30h10v10h-10zM10 45h10v10h-10zM30 45h15v15h-15zM55 45h20v10h-20zM85 45h10v20h-10zM45 65h15v15h-15zM70 65h10v25h-10zM85 75h10v15h-10z" fill="#0b1220" />
                  </svg>
                </div>
                <div className="sticker-code">{currentAsset.id}</div>
                <div className="sticker-name">{currentAsset.name}</div>
              </div>
              <div className="modal-actions-bar">
                <button className="btn btn-secondary" onClick={() => setShowQrModal(false)}>
                  Fechar
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    window.print();
                    setShowQrModal(false);
                  }}
                >
                  <Printer size={15} /> Imprimir Etiqueta
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
              <h2>Editar Informações do Ativo</h2>
              <button className="modal-close-btn" onClick={() => setShowEditModal(false)}>×</button>
            </div>
            <div className="modal-body-form">
              <div className="form-group">
                <label>Nome do Equipamento</label>
                <input defaultValue={currentAsset.name} />
              </div>
              <div className="form-group">
                <label>Responsável Atual</label>
                <input defaultValue={currentAsset.person} />
              </div>
              <div className="form-group">
                <label>Localização</label>
                <input defaultValue={currentAsset.location} />
              </div>
              <div className="form-group">
                <label>Estado</label>
                <select defaultValue={currentAsset.status}>
                  <option>Em uso</option>
                  <option>Disponível</option>
                  <option>Em manutenção</option>
                  <option>Descarte</option>
                </select>
              </div>
              <div className="modal-actions-bar">
                <button className="btn btn-secondary" onClick={() => setShowEditModal(false)}>
                  Cancelar
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setShowEditModal(false);
                    if (onNotify) onNotify('Alterações no ativo salvas com sucesso!');
                  }}
                >
                  Salvar Alterações
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

