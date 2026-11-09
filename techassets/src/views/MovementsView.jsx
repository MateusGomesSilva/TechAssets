import React from 'react';
import { ArrowLeftRight, ArrowLeft, Download, Plus, Clock } from 'lucide-react';

export function MovementsView({ movements = [], onBack, onNotify }) {
  return (
    <div className="view-container movements-view">
      <div className="view-header">
        <div className="view-title-block">
          <h1 className="view-title">Movimentações</h1>
          <p className="view-subtitle">Histórico de transferências, entregas e alterações de responsabilidade.</p>
        </div>
        <div className="view-header-actions">
          <button
            className="btn btn-primary"
            onClick={() => onNotify && onNotify('Nova movimentação registrada com sucesso!')}
          >
            <Plus size={16} /> Nova movimentação
          </button>
        </div>
      </div>

      <div className="card-full-panel">
        <div className="timeline-clean">
          {movements.map((m) => (
            <div key={m.id} className="timeline-item">
              <div className="timeline-dot" />
              <div className="timeline-body">
                <div className="timeline-meta">
                  <span className={`movement-tag ${m.tagTone}`}>{m.type}</span>
                  <span className="timeline-date">{m.time}</span>
                </div>
                <h3 className="movement-asset-name">{m.assetName}</h3>
                <p className="timeline-route">
                  {m.route}
                </p>
                <small className="timeline-author">Código do ativo: {m.assetId}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

