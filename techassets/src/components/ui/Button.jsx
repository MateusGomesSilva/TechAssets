import React from 'react';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  iconLeft: IconLeft,
  iconRight: IconRight,
  onClick,
  type = 'button',
  title,
  ...props
}) {
  const baseClass = 'btn';
  const variantClass = `btn-${variant}`;
  const sizeClass = size !== 'md' ? `btn-${size}` : '';
  const loadingClass = loading ? 'btn-loading' : '';

  return (
    <button
      type={type}
      className={`${baseClass} ${variantClass} ${sizeClass} ${loadingClass} ${className}`.trim()}
      disabled={disabled || loading}
      onClick={onClick}
      title={title}
      {...props}
    >
      {loading ? (
        <span className="btn-spinner" aria-hidden="true" />
      ) : (
        <>
          {IconLeft && <IconLeft size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} className="btn-icon-left" />}
          <span className="btn-text">{children}</span>
          {IconRight && <IconRight size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} className="btn-icon-right" />}
        </>
      )}
    </button>
  );
}

