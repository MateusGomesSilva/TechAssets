import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { BrandLogo } from '../components/common/BrandLogo';

export function LoginView({ onLoginSuccess, onNavigate, onNotify }) {
  const [email, setEmail] = useState('joao.silva@empresa.com');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Por favor, informe seu e-mail.');
      return;
    }
    if (!password) {
      setError('Por favor, digite sua senha.');
      return;
    }

    setLoading(true);
    setError('');

    // Simulate responsive authentication flow
    setTimeout(() => {
      setLoading(false);
      if (onNotify) onNotify('Autenticado com sucesso! Bem-vindo de volta.');
      onLoginSuccess();
    }, 600);
  };

  const handleMicrosoftLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (onNotify) onNotify('Autenticado via Microsoft SSO.');
      onLoginSuccess();
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
          <BrandLogo variant="light" size="default" clickable onClick={() => onNavigate('landing')} />
          <h1 className="login-card-title">Bem-vindo(a)!</h1>
          <p className="login-card-subtitle">
            Entre para continuar gerenciando os ativos de TI da sua empresa.
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
            <label htmlFor="email">E-mail</label>
            <div className="input-with-icon">
              <input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <div className="input-with-action">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Ocultar senha' : 'Exibir senha'}
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
              <span>Lembrar-me</span>
            </label>
            <button
              type="button"
              className="forgot-password-link"
              onClick={() => onNotify && onNotify('Link de recuperação enviado para seu e-mail cadastrado.')}
            >
              Esqueceu sua senha?
            </button>
          </div>

          <button
            type="submit"
            className="btn-login-submit"
            disabled={loading}
          >
            {loading ? (
              <span className="spinner-loader" />
            ) : (
              <span>Entrar</span>
            )}
          </button>
        </form>

        <div className="login-divider">
          <span>ou continue com</span>
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
          <span>Entrar com Microsoft</span>
        </button>

        <div className="login-footer">
          <span>Não tem uma conta?</span>{' '}
          <button
            type="button"
            className="signup-link"
            onClick={() => onNavigate('dashboard')}
          >
            Solicitar acesso
          </button>
        </div>

        {/* Demo Fast Access helper */}
        <div className="login-demo-helper">
          <small>Ambiente de Demonstração Corporativa</small>
          <button
            type="button"
            className="demo-quick-btn"
            onClick={() => {
              setEmail('joao.silva@empresa.com');
              setPassword('123456');
              onLoginSuccess();
            }}
          >
            <Check size={14} /> Entrar direto como Administrador
          </button>
        </div>
      </div>
    </div>
  );
}

