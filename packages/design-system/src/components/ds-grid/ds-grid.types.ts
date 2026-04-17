import type { CSSProperties, ReactNode } from 'react';

import type { ResponsiveValue } from '../../utils/responsive';

export interface DsGridBaseProps {
	children: ReactNode;

	/**
	 * Number of rows in the grid (defaults to 1)
	 */
	rows?: 1 | 2 | 4 | 6 | 8;

	/**
	 * Number of columns in the grid (defaults to 12)
	 */
	columns?: 2 | 4 | 6 | 8 | 10 | 12;

	/**
	 * Gap between grid cells in px.
	 * Defaults to 16.
	 */
	gutter?: number;

	/**
	 * Padding around the grid container.
	 * A number is treated as px (uniform). A string is used as-is (e.g. "16px 20px").
	 */
	margin?: number | string;

	className?: string;
	style?: CSSProperties;
}

export type DsGridProps = Omit<DsGridBaseProps, 'gutter' | 'margin'> & {
	/**
	 * Gap between grid cells in px.
	 */
	gutter?: ResponsiveValue<number>;

	/**
	 * Padding around the grid container.
	 * A number is treated as px (uniform). A string is used as-is (e.g. "16px 20px").
	 */
	margin?: ResponsiveValue<number | string>;
};

export interface DsGridItemBaseProps {
	children: ReactNode;

	/**
	 * Number of columns the item spans (1-12) or 'full'
	 */
	colSpan?: number | 'full';

	/**
	 * Starting column for the item (1-11)
	 */
	colStart?: number;

	/**
	 * Number of rows the item spans (1-8) or 'full'
	 */
	rowSpan?: number | 'full';

	/**
	 * Starting row for the item (1-7)
	 */
	rowStart?: number;

	className?: string;
}

export type DsGridItemProps = Omit<DsGridItemBaseProps, 'colSpan' | 'rowSpan'> & {
	colSpan?: ResponsiveValue<number | 'full'>;
	rowSpan?: ResponsiveValue<number | 'full'>;
};
