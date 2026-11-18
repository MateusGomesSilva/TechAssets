import React from 'react';

// Official mark: "TECH" + "ASSETS". Both words always render; colors come from CSS tokens
// (see `.brand-tech` / `.brand-assets` in styles.css) so contrast is correct in light, dark
// and on the dark landing page (variant "on-dark").
export function BrandLogo({ variant = 'default', size = 'default', clickable = false, onClick }) {
  const isDarkSurface = variant === 'on-dark' || variant === 'dark-bg' || variant === 'light';

  const handleKeyDown = (e) => {
    if (clickable && onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className={`brand-container ${isDarkSurface ? 'brand-dark-surface' : ''} ${clickable ? 'clickable' : ''}`}
      onClick={clickable ? onClick : undefined}
      onKeyDown={handleKeyDown}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      aria-label="TECHASSETS"
    >
      <div className={`brand-mark ${size === 'small' ? 'mark-sm' : ''}`} aria-hidden="true">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 12L12 22L22 12L12 2Z" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 6.5L6.5 12L12 17.5L17.5 12L12 6.5Z" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <span className="brand-text" aria-hidden="true">
        <span className="brand-tech">TECH</span>
        <span className="brand-assets">ASSETS</span>
      </span>
    </div>
  );
}
