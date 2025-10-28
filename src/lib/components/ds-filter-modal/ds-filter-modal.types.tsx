// AI Generated file
import { ReactNode } from 'react';
import { DsModalProps } from '../ds-modal';

/**
 * Props for filter nav item
 */
export interface FilterNavItem {
	/**
	 * Unique identifier for the filter category
	 */
	id: string;
	/**
	 * Display label for the filter category
	 */
	label: string;
	/**
	 * Number of active filters in this category
	 */
	count?: number;
	/**
	 * Whether this category is disabled
	 */
	disabled?: boolean;
}

/**
 * Props for the DsFilterModal component
 */
export interface DsFilterModalProps extends Omit<DsModalProps, 'children'> {
	/**
	 * Callback when clear all filters is clicked
	 */
	onClearAll?: () => void;
	/**
	 * Callback when apply button is clicked
	 */
	onApply?: () => void;
	/**
	 * Array of filter navigation items
	 */
	filterNavItems?: FilterNavItem[];
	/**
	 * Currently selected filter category ID
	 */
	selectedFilterId?: string;
	/**
	 * Callback when a filter category is selected
	 */
	onFilterSelect?: (filterId: string) => void;
	/**
	 * Content to display in the filter panel (right side)
	 */
	children?: ReactNode;
	/**
	 * Label for the apply button
	 * @default "Apply"
	 */
	applyLabel?: string;
	/**
	 * Label for the clear all button
	 * @default "Clear all filters"
	 */
	clearAllLabel?: string;
	/**
	 * Whether apply button is disabled
	 */
	applyDisabled?: boolean;
	/**
	 * Whether clear all button is disabled
	 */
	clearAllDisabled?: boolean;
}
