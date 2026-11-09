import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export function Toast({ toast, onDismiss }) {
  if (!toast || !toast.message) return null;

  const type = toast.type || 'success';
  const Icon = type === 'error' ? AlertCircle : type === 'info' ? Info : CheckCircle2;

  return (
    <div className={`toast-container toast-${type}`}>
      <div className="toast-icon">
        <Icon size={18} />
      </div>
      <div className="toast-content">
        <p className="toast-message">{toast.message}</p>
      </div>
      {onDismiss && (
        <button className="toast-close" onClick={onDismiss} aria-label="Fechar notificação">
          <X size={15} />
        </button>
      )}
    </div>
  );
}

