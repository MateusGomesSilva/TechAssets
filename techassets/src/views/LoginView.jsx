import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { BrandLogo } from '../components/common/BrandLogo';
import { useI18n } from '../i18n';

export function LoginView({ onLoginSuccess, onNavigate, onRequestAccess, onNotify }) {
  const { t } = useI18n();
  const [email, setEmail] = useState('joao.silva@empresa.com');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError(t('login.errorEmail'));
      return;
    }
    if (!password) {
      setError(t('login.errorPassword'));
      return;
    }

    setLoading(true);
    setError('');

    // Simulate responsive authentication flow
    setTimeout(() => {
      setLoading(false);
      if (onNotify) onNotify(t('login.successNotify'));
      onLoginSuccess(email);
    }, 600);
  };

  const handleMicrosoftLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (onNotify) onNotify(t('login.ssoNotify'));
      onLoginSuccess(email);
    }, 700);
  };

  return (
    <div className="login-page-root">
      {/* Background subtle technical waves */}
      <div className="login-bg-pattern">
        <svg className="login-wave-svg" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-100 650 C 300 450, 700 850, 1540 400" stroke="#0d6efd" strokeWidth="1.5" strokeOpacity="0.12" fill="none"/>
          <path d="M-100 700 C 400 500, 800 900, 1540 450" stroke="#0d6efd" strokeWidth="1" strokeOpacity="0.08" fill="none"/>
          <path d="M-100 750 C 500 550, 900 950, 1540 500" stroke="#0d6efd" strokeWidth="0.8" strokeOpacity="0.05" fill="none"/>
        </svg>
      </div>

      <div className="login-card-container">
        {/* Brand header */}
        <div className="login-card-header">
          <BrandLogo size="default" clickable onClick={() => onNavigate('landing')} />
          <h1 className="login-card-title">{t('login.welcome')}</h1>
          <p className="login-card-subtitle">
            {t('login.subtitle')}
          </p>
        </div>

        {error && (
          <div className="login-error-banner">
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">{t('login.email')}</label>
            <div className="input-with-icon">
              <input
                id="email"
                type="email"
                placeholder={t('login.emailPlaceholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">{t('login.password')}</label>
            <div className="input-with-action">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder={t('login.passwordPlaceholder')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? t('login.hidePassword') : t('login.showPassword')}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="login-row-options">
            <label className="remember-checkbox-label">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>{t('login.rememberMe')}</span>
            </label>
            <button
              type="button"
              className="forgot-password-link"
              onClick={() => onNotify && onNotify(t('login.forgotPasswordNotify'), 'info')}
            >
              {t('login.forgotPassword')}
            </button>
          </div>

          <button
            type="submit"
            className="btn-login-submit"
            disabled={loading}
          >
            {loading ? (
              <span className="btn-spinner" aria-label={t('login.submitting')} />
            ) : (
              <span>{t('login.submit')}</span>
            )}
          </button>
        </form>

        <div className="login-divider">
          <span>{t('login.or')}</span>
        </div>

        {/* Microsoft SSO button */}
        <button
          type="button"
          className="btn-microsoft-sso"
          onClick={handleMicrosoftLogin}
          disabled={loading}
        >
          {/* Microsoft 4-color square icon */}
          <svg width="20" height="20" viewBox="0 0 21 21">
            <rect x="1" y="1" width="9" height="9" fill="#f25022"/>
            <rect x="11" y="1" width="9" height="9" fill="#7fba00"/>
            <rect x="1" y="11" width="9" height="9" fill="#00a4ef"/>
            <rect x="11" y="11" width="9" height="9" fill="#ffb900"/>
          </svg>
          <span>{t('login.ssoMicrosoft')}</span>
        </button>

        <div className="login-footer">
          <span>{t('login.noAccount')}</span>{' '}
          <button
            type="button"
            className="signup-link"
            onClick={onRequestAccess}
          >
            {t('landing.requestAccess')}
          </button>
        </div>

        {/* Demo Fast Access helper */}
        <div className="login-demo-helper">
          <small>TECHASSETS Enterprise</small>
          <button
            type="button"
            className="demo-quick-btn"
            onClick={() => {
              setEmail('joao.silva@empresa.com');
              setPassword('123456');
              onLoginSuccess('joao.silva@empresa.com');
            }}
          >
            <Check size={14} /> {t('login.demoAdmin')}
          </button>
        </div>
      </div>
    </div>
  );
}
