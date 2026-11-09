import React from 'react';

export function StatusBadge({ value, size = 'default' }) {
  let tone = 'gray';
  const val = String(value || '').toLowerCase().trim();

  if (val.includes('uso') || val.includes('concluída') || val.includes('entrega') || val.includes('ativo')) {
    tone = 'green';
  } else if (val.includes('disponível') || val.includes('transferência') || val.includes('aberta')) {
    tone = 'blue';
  } else if (val.includes('manutenção') || val.includes('andamento') || val.includes('atrasad') || val.includes('pendente')) {
    tone = 'orange';
  } else if (val.includes('descarte') || val.includes('descartado') || val.includes('cancelad')) {
    tone = 'gray';
  } else if (val.includes('agendad') || val.includes('preventiva')) {
    tone = 'purple';
  }

  return (
    <span className={`status-pill status-${tone} ${size === 'sm' ? 'status-sm' : ''}`}>
      <span className="status-dot" />
      <span className="status-label">{value}</span>
    </span>
  );
}

