import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  Box,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { BrandLogo } from '../components/common/BrandLogo';
import { useI18n, formatPercent } from '../i18n';

export function LandingView({ assets = [], onNavigate, onRequestAccess }) {
  const { t, language } = useI18n();
  const rootRef = useRef(null);
  const stageRef = useRef(null);
  const videoRef = useRef(null);
  const quickRef = useRef(null);

  // Illustration figures come from the real inventory (not fixed numbers)
  const inOperation = assets.filter(
    (a) => a.status !== 'Em manutenção' && a.status !== 'Descartado'
  ).length;
  const operationalPct = formatPercent(inOperation, assets.length, language);

  useEffect(() => {
    const reducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Start background video playback cleanly
    const videoEl = videoRef.current;
    if (videoEl) {
      if (reducedMotion) {
        videoEl.pause();
      } else {
        videoEl.play().catch(() => {});
      }
    }

    if (reducedMotion) return undefined;

    const ctx = gsap.context(() => {
      // Base 3D depth layers for each hardware device
      gsap.set('.hardware-showcase-container', {
        transformPerspective: 1200,
        transformStyle: 'preserve-3d',
        rotationX: 6,
        rotationY: -9
      });

      gsap.set('.mock-display', { z: -26, transformStyle: 'preserve-3d' });
      gsap.set('.mock-laptop', { z: 32, transformStyle: 'preserve-3d' });
      gsap.set('.mock-tablet', { z: 54, transformStyle: 'preserve-3d' });
      gsap.set('.mock-phone', { z: 88, transformStyle: 'preserve-3d' });
      gsap.set('.mock-mouse', { z: 72, transformStyle: 'preserve-3d' });

      // 1. Entrance 3D Timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.landing-hero-animate', {
        y: 24,
        opacity: 0,
        rotationX: -12,
        transformPerspective: 900,
        duration: 0.65,
        stagger: 0.07,
        clearProps: 'opacity'
      })
        .from(
          '.hardware-showcase-container',
          {
            opacity: 0,
            scale: 0.92,
            rotationY: -22,
            rotationX: 15,
            duration: 0.85
          },
          0.12
        )
        .from(
          '.mock-display',
          { opacity: 0, y: 30, z: -100, rotationX: 12, duration: 0.75 },
          0.18
        )
        .from(
          '.mock-laptop',
          { opacity: 0, y: 36, z: -30, rotationY: -16, duration: 0.75 },
          0.26
        )
        .from(
          '.mock-tablet',
          { opacity: 0, y: 32, z: -15, rotationY: 18, duration: 0.7 },
          0.32
        )
        .from(
          '.mock-phone',
          { opacity: 0, y: 40, z: 12, rotationY: -14, rotationX: 10, duration: 0.7 },
          0.38
        )
        .from(
          '.mock-mouse',
          { opacity: 0, y: 22, scale: 0.75, duration: 0.6 },
          0.44
        );

      // 2. Continuous 3D orbital rings
      gsap.to('.orbit-ring-inner', {
        rotation: 360,
        duration: 22,
        repeat: -1,
        ease: 'none'
      });
      gsap.to('.orbit-ring-outer', {
        rotation: -360,
        duration: 34,
        repeat: -1,
        ease: 'none'
      });

      // 3. Organic 3D floating idle animations (staggered phases)
      gsap.to('.mock-display', {
        y: -8,
        rotationX: 2.5,
        rotationY: -3,
        duration: 4.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
      gsap.to('.mock-laptop', {
        y: -11,
        rotationX: -2.2,
        rotationY: 3.2,
        duration: 3.6,
        delay: 0.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
      gsap.to('.mock-tablet', {
        y: -13,
        rotationY: -5,
        rotationX: 3,
        duration: 3.9,
        delay: 0.9,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
      gsap.to('.mock-phone', {
        y: -15,
        rotationY: 6,
        rotationX: -3.5,
        duration: 3.1,
        delay: 0.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
      gsap.to('.mock-mouse', {
        y: -6,
        rotation: 4,
        duration: 2.9,
        delay: 0.6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
      gsap.to('.hardware-reflection-base', {
        scaleX: 1.08,
        opacity: 0.78,
        duration: 3.6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      // 4. Interactive 3D parallax driven by pointer position (canonical GSAP rotationX/rotationY)
      const stage = stageRef.current;
      if (stage) {
        quickRef.current = {
          stageRotY: gsap.quickTo(stage, 'rotationY', { duration: 0.6, ease: 'power3.out' }),
          stageRotX: gsap.quickTo(stage, 'rotationX', { duration: 0.6, ease: 'power3.out' }),
          displayX: gsap.quickTo('.mock-display', 'x', { duration: 0.75, ease: 'power3.out' }),
          laptopX: gsap.quickTo('.mock-laptop', 'x', { duration: 0.7, ease: 'power3.out' }),
          tabletX: gsap.quickTo('.mock-tablet', 'x', { duration: 0.65, ease: 'power3.out' }),
          phoneX: gsap.quickTo('.mock-phone', 'x', { duration: 0.55, ease: 'power3.out' }),
          mouseX: gsap.quickTo('.mock-mouse', 'x', { duration: 0.6, ease: 'power3.out' })
        };
      }
    }, rootRef);

    return () => {
      quickRef.current = null;
      ctx.revert();
    };
  }, []);

  const handleHeroMouseMove = (e) => {
    const q = quickRef.current;
    if (!q || window.innerWidth <= 900) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 .. 0.5
    const ny = (e.clientY - rect.top) / rect.height - 0.5;

    q.stageRotY(-9 + nx * 24);
    q.stageRotX(6 - ny * 18);
    q.displayX(nx * -10);
    q.laptopX(nx * 10);
    q.tabletX(nx * 16);
    q.phoneX(nx * 26);
    q.mouseX(nx * 20);
  };

  const handleHeroMouseLeave = () => {
    const q = quickRef.current;
    if (!q) return;
    q.stageRotY(-9);
    q.stageRotX(6);
    q.displayX(0);
    q.laptopX(0);
    q.tabletX(0);
    q.phoneX(0);
    q.mouseX(0);
  };

  return (
    <div
      className="landing-page-root"
      ref={rootRef}
      onMouseMove={handleHeroMouseMove}
      onMouseLeave={handleHeroMouseLeave}
    >
      {/* Background looping video generated from Nano Banana visual */}
      <div className="landing-video-backdrop" aria-hidden="true">
        <video
          ref={videoRef}
          className="landing-bg-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/media/hero-bg-poster.jpg"
        >
          <source src="/media/hero-bg.webm" type="video/webm" />
        </video>
        <div className="landing-video-scrim" />
      </div>

      {/* Background ambient lighting */}
      <div className="landing-ambient-glow glow-1" />
      <div className="landing-ambient-glow glow-2" />

      {/* Top navigation */}
      <header className="landing-navbar">
        <div className="landing-nav-inner">
          <BrandLogo variant="on-dark" size="default" clickable onClick={() => onNavigate('landing')} />

          <div className="landing-nav-actions">
            <button
              type="button"
              className="btn-outline-landing"
              onClick={() => onNavigate('login')}
            >
              {t('landing.login')}
            </button>
            <button
              type="button"
              className="btn-primary-landing"
              onClick={onRequestAccess}
            >
              {t('landing.requestAccess')}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="landing-hero-section">
        <div className="landing-hero-content">
          {/* Eyebrow tag */}
          <div className="landing-eyebrow-badge landing-hero-animate">
            <span className="eyebrow-dot" />
            {t('landing.badge')}
          </div>

          {/* Headline */}
          <h1 className="landing-hero-title landing-hero-animate">
            {t('landing.title1')} <span className="text-gradient-blue">{t('landing.titleAssets')}</span>
            <br />
            {t('landing.title2')} <span className="text-gradient-blue">{t('landing.titlePlace')}</span>
          </h1>

          {/* Subtitle */}
          <p className="landing-hero-subtitle landing-hero-animate">
            {t('landing.desc')}
          </p>

          {/* 3 Value propositions */}
          <div className="landing-features-row">
            <div className="landing-feature-item landing-hero-animate">
              <div className="feature-icon-box">
                <Box size={18} />
              </div>
              <div className="feature-text">
                <strong>{t('landing.feat1Title')}</strong>
                <span>{t('landing.feat1Desc')}</span>
              </div>
            </div>

            <div className="landing-feature-item landing-hero-animate">
              <div className="feature-icon-box">
                <ShieldCheck size={18} />
              </div>
              <div className="feature-text">
                <strong>{t('landing.feat2Title')}</strong>
                <span>{t('landing.feat2Desc')}</span>
              </div>
            </div>

            <div className="landing-feature-item landing-hero-animate">
              <div className="feature-icon-box">
                <Sparkles size={18} />
              </div>
              <div className="feature-text">
                <strong>{t('landing.feat3Title')}</strong>
                <span>{t('landing.feat3Desc')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Hardware 3D Visual Showcase (GSAP) */}
        <div className="landing-hero-visual">
          <div className="hardware-showcase-container" ref={stageRef}>
            {/* 3D Holographic Orbital Rings & Ambient Base */}
            <div className="hardware-orbit-plane" aria-hidden="true">
              <div className="orbit-ring orbit-ring-outer" />
              <div className="orbit-ring orbit-ring-inner" />
            </div>
            <div className="hardware-reflection-base" />

            {/* Desktop / Studio Display in Background */}
            <div className="mock-display">
              <div className="mock-screen">
                <div className="screen-wave-canvas">
                  <div className="wave-line wave-line-1" />
                  <div className="wave-line wave-line-2" />
                  <div className="screen-tech-badge">
                    <TrendingUp size={13} />
                    <span>{t('landing.mockOperational', { pct: operationalPct })}</span>
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
                      <span>{t('landing.mockAssets', { count: assets.length })}</span>
                      <small>{t('landing.mockRealtime')}</small>
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
                <div className="tablet-stat">{t('landing.mockInventoryOk')}</div>
              </div>
              <div className="tablet-stand-shadow" />
            </div>

            {/* Smartphone */}
            <div className="mock-phone">
              <div className="phone-screen">
                <div className="phone-notch" />
                <div className="phone-content">
                  <CheckCircle2 size={18} className="phone-check-icon" />
                  <span>{t('landing.mockVerified')}</span>
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
    </div>
  );
}
