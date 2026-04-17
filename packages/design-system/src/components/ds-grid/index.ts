import { withResponsiveProps } from '../../utils/responsive';
import { DsGridBase, DsGridItemBase } from './ds-grid';

export const DsGrid = withResponsiveProps(DsGridBase, ['gutter', 'margin']);
export const DsGridItem = withResponsiveProps(DsGridItemBase, ['colSpan', 'rowSpan']);
export type { DsGridProps, DsGridItemProps } from './ds-grid.types';
