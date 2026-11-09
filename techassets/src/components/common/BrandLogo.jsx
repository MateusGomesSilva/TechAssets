import React from 'react';

export function BrandLogo({ variant = 'dark', size = 'default', clickable = false, onClick }) {
  const isLight = variant === 'light'; // e.g. for light header or dark on white card
  
  return (
    <div 
      className={`brand-container ${clickable ? 'clickable' : ''}`}
      onClick={clickable ? onClick : undefined}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
    >
      <div className={`brand-mark ${size === 'small' ? 'mark-sm' : ''}`}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 12L12 22L22 12L12 2Z" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 6.5L6.5 12L12 17.5L17.5 12L12 6.5Z" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <span className={`brand-text ${isLight ? 'text-light' : 'text-brand'}`}>
        TECH<b>ASSETS</b>
      </span>
    </div>
  );
}

