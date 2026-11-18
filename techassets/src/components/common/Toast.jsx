import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useI18n } from '../../i18n';

export function Toast({ toast, onDismiss }) {
  const { t } = useI18n();
  if (!toast || !toast.message) return null;

  const type = toast.type || 'success';
  const Icon = type === 'error' ? AlertCircle : type === 'info' ? Info : CheckCircle2;

  return (
    <div className={`toast-container toast-${type}`} role="status" aria-live="polite">
      <div className="toast-icon">
        <Icon size={18} />
      </div>
      <div className="toast-content">
        <p className="toast-message">{toast.message}</p>
      </div>
      {onDismiss && (
        <button className="toast-close" onClick={onDismiss} aria-label={t('toast.close')}>
          <X size={15} />
        </button>
      )}
    </div>
  );
}
