import React from 'react';
import {
  Laptop,
  Smartphone,
  Tablet,
  Monitor,
  Headphones,
  Tv,
  Search,
  Box,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { BrandLogo } from '../components/common/BrandLogo';

export function LandingView({ onNavigate, onSelectCategory }) {
  const navItems = [
    { label: 'Início', active: true, action: () => onNavigate('landing') },
    { label: 'Ativos', action: () => onNavigate('assets') },
    { label: 'Notebooks', action: () => onSelectCategory('Notebooks') },
    { label: 'Celulares', action: () => onSelectCategory('Celulares') },
    { label: 'Tablets', action: () => onSelectCategory('Tablets') },
    { label: 'Desktops', action: () => onSelectCategory('Desktops') },
    { label: 'Monitores', action: () => onSelectCategory('Monitores') },
    { label: 'Acessórios', action: () => onSelectCategory('Acessórios') },
    { label: 'Suporte', action: () => onNavigate('support') }
  ];

  const categoryStats = [
    { name: 'Notebooks', count: '128 ativos', icon: Laptop, key: 'Notebooks' },
    { name: 'Celulares', count: '196 ativos', icon: Smartphone, key: 'Celulares' },
    { name: 'Tablets', count: '94 ativos', icon: Tablet, key: 'Tablets' },
    { name: 'Desktops', count: '72 ativos', icon: Monitor, key: 'Desktops' },
    { name: 'Monitores', count: '34 ativos', icon: Tv, key: 'Monitores' },
    { name: 'Acessórios', count: '64 ativos', icon: Headphones, key: 'Acessórios' }
  ];

  return (
    <div className="landing-page-root">
      {/* Background ambient lighting */}
      <div className="landing-ambient-glow glow-1" />
      <div className="landing-ambient-glow glow-2" />

      {/* Top navigation */}
      <header className="landing-navbar">
        <div className="landing-nav-inner">
          <BrandLogo variant="light" size="default" clickable onClick={() => onNavigate('landing')} />

          <nav className="landing-nav-links">
            {navItems.map((item, idx) => (
              <button
                key={idx}
                className={`landing-nav-link ${item.active ? 'active' : ''}`}
                onClick={item.action}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="landing-nav-actions">
            <button
              className="landing-icon-btn"
              title="Buscar ativos"
              onClick={() => onNavigate('assets')}
              aria-label="Buscar"
            >
              <Search size={18} />
            </button>
            <button
              className="btn-outline-landing"
              onClick={() => onNavigate('login')}
            >
              Entrar
            </button>
            <button
              className="btn-primary-landing"
              onClick={() => onNavigate('dashboard')}
            >
              Solicitar acesso
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="landing-hero-section">
        <div className="landing-hero-content">
          {/* Eyebrow tag */}
          <div className="landing-eyebrow-badge">
            <span className="eyebrow-dot" />
            GESTÃO INTELIGENTE DE ATIVOS DE TI
          </div>

          {/* Headline */}
          <h1 className="landing-hero-title">
            Todos os seus <span className="text-gradient-blue">ativos.</span>
            <br />
            Em um só <span className="text-gradient-blue">lugar.</span>
          </h1>

          {/* Subtitle */}
          <p className="landing-hero-subtitle">
            Controle, rastreie e acompanhe seus equipamentos de TI com praticidade,
            segurança e eficiência.
          </p>

          {/* 3 Value propositions */}
          <div className="landing-features-row">
            <div className="landing-feature-item">
              <div className="feature-icon-box">
                <Box size={18} />
              </div>
              <div className="feature-text">
                <strong>Visão completa</strong>
                <span>Tenha uma visão 360° dos seus ativos.</span>
              </div>
            </div>

            <div className="landing-feature-item">
              <div className="feature-icon-box">
                <ShieldCheck size={18} />
              </div>
              <div className="feature-text">
                <strong>Mais controle</strong>
                <span>Rastreie movimentações, estados e localização.</span>
              </div>
            </div>

            <div className="landing-feature-item">
              <div className="feature-icon-box">
                <Sparkles size={18} />
              </div>
              <div className="feature-text">
                <strong>Decisões melhores</strong>
                <span>Informações confiáveis para decisões estratégicas.</span>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="landing-cta-group">
            <button
              className="btn-hero-primary"
              onClick={() => onNavigate('dashboard')}
            >
              Explorar ativos
              <ArrowRight size={17} />
            </button>
            <button
              className="btn-hero-secondary"
              onClick={() => onNavigate('assets')}
            >
              Ver inventário
            </button>
          </div>
        </div>

        {/* Hero Hardware Visual Showcase */}
        <div className="landing-hero-visual">
          <div className="hardware-showcase-container">
            {/* Ambient surface light */}
            <div className="hardware-reflection-base" />

            {/* Desktop / Studio Display in Background */}
            <div className="mock-display">
              <div className="mock-screen">
                <div className="screen-wave-canvas">
                  <div className="wave-line wave-line-1" />
                  <div className="wave-line wave-line-2" />
                  <div className="screen-tech-badge">
                    <TrendingUp size={13} />
                    <span>99.8% Ativos em Operação</span>
                  </div>
                </div>
              </div>
              <div className="mock-display-stand" />
              <div className="mock-display-foot" />
            </div>

            {/* Laptop in foreground */}
            <div className="mock-laptop">
              <div className="mock-laptop-lid">
                <div className="mock-laptop-screen">
                  <div className="laptop-wave-canvas">
                    <div className="laptop-inner-brand">TECHASSETS</div>
                    <div className="laptop-live-stats">
                      <span>1.248 Ativos</span>
                      <small>Gerenciados em tempo real</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mock-laptop-base">
                <div className="mock-trackpad" />
              </div>
            </div>

            {/* Tablet with stand */}
            <div className="mock-tablet">
              <div className="tablet-screen">
                <div className="tablet-wave-canvas" />
                <div className="tablet-stat">Inventário OK</div>
              </div>
              <div className="tablet-stand-shadow" />
            </div>

            {/* Smartphone */}
            <div className="mock-phone">
              <div className="phone-screen">
                <div className="phone-notch" />
                <div className="phone-content">
                  <CheckCircle2 size={18} className="phone-check-icon" />
                  <span>Ativo Verificado</span>
                </div>
              </div>
            </div>

            {/* Precision Mouse */}
            <div className="mock-mouse">
              <div className="mouse-wheel" />
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Category Summary Strip (Matching 01-banner-pagina-inicial.png) */}
      <section className="landing-category-strip-wrapper">
        <div className="landing-category-strip">
          {categoryStats.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                className="category-strip-card"
                onClick={() => onSelectCategory(cat.key)}
                role="button"
                tabIndex={0}
                title={`Ver todos os ${cat.name}`}
              >
                <div className="category-strip-icon">
                  <Icon size={22} />
                </div>
                <div className="category-strip-meta">
                  <strong className="category-name">{cat.name}</strong>
                  <span className="category-count">{cat.count}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

