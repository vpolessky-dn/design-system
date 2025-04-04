import React from 'react';
import { DNGridItemProps, DNGridProps } from './dn-grid.types';

export const DNGrid: React.FC<DNGridProps> = ({ children, rows, className = '' }) => {
  const rowsClass = rows ? `dn-grid-rows-${rows}` : '';

  return <div className={`dn-grid ${rowsClass} ${className}`.trim()}>{children}</div>;
};

export const DNGridItem: React.FC<DNGridItemProps> = ({
  children,
  colSpan,
  colStart,
  rowSpan,
  rowStart,
  className = '',
}) => {
  const classes = [className];

  if (colSpan) {
    classes.push(`dn-grid-col-span-${colSpan}`);
  }

  if (colStart) {
    classes.push(`dn-grid-col-start-${colStart}`);
  }

  if (rowSpan) {
    classes.push(`dn-grid-row-span-${rowSpan}`);
  }

  if (rowStart) {
    classes.push(`dn-grid-row-start-${rowStart}`);
  }

  return <div className={classes.join(' ').trim()}>{children}</div>;
};
