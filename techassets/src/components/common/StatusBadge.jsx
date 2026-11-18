import React from 'react';
import { useI18n, statusLabel } from '../../i18n';

// `value` is the canonical (stored) status; the visible label follows the selected language.
export function StatusBadge({ value, size = 'default' }) {
  const { t } = useI18n();
  let tone = 'gray';
  const val = String(value || '').toLowerCase().trim();

  if (val.includes('uso') || val.includes('concluída') || val.includes('entrega') || val.includes('ativo') || val.includes('resolvido')) {
    tone = 'green';
  } else if (val.includes('disponível') || val.includes('transferência') || val.includes('abert')) {
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
      <span className="status-label">{statusLabel(t, value)}</span>
    </span>
  );
}
