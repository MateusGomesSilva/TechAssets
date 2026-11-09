import React from 'react';

export function Skeleton({
  variant = 'text',
  width,
  height,
  className = '',
  count = 1
}) {
  const elements = Array.from({ length: count });

  const getStyle = () => {
    const s = {};
    if (width) s.width = width;
    if (height) s.height = height;
    return s;
  };

  return (
    <>
      {elements.map((_, idx) => (
        <div
          key={idx}
          className={`skeleton skeleton-${variant} ${className}`.trim()}
          style={getStyle()}
          aria-hidden="true"
        />
      ))}
    </>
  );
}

export function SkeletonCard() {
  return (
    <div className="skeleton-card-wrapper">
      <Skeleton variant="rect" height="120px" />
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Skeleton variant="text" width="60%" height="16px" />
        <Skeleton variant="text" width="90%" height="12px" />
        <Skeleton variant="text" width="40%" height="12px" />
      </div>
    </div>
  );
}

export function SkeletonTableRow({ columns = 7 }) {
  return (
    <tr className="skeleton-row">
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i}>
          <Skeleton variant="text" width={i === 1 ? '75%' : '50%'} height="14px" />
        </td>
      ))}
    </tr>
  );
}

