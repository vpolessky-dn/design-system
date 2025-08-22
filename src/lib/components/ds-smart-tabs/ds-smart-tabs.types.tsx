import React, { ReactNode } from 'react';
import { IconType } from '../ds-icon/ds-icon.types';

export interface DsTabProps {
	/**
	 * The name/label of the tab
	 */
	name: string;
	/**
	 * The value of the tab (used for filtering/identification)
	 */
	value: string;
	/**
	 * The icon to display in the tab
	 */
	icon: IconType;
	/**
	 * The content to display in the tab (typically a count or text)
	 */
	children: ReactNode;
	/**
	 * Color for the tab (can be hex, rgb, CSS variable, etc.)
	 */
	color?: string;
	/**
	 * Whether the tab is disabled
	 */
	disabled?: boolean;
	/**
	 * Additional CSS class names
	 */
	className?: string;
	/**
	 * Additional styles to apply to the tab
	 */
	style?: React.CSSProperties;
}

export interface DsSmartTabsProps {
	/**
	 * Currently active tab value (optional - if not provided, component manages internally)
	 */
	activeTab?: string;
	/**
	 * Callback function when a tab is clicked
	 */
	onTabClick: (value: string) => void;
	/**
	 * Additional CSS class names
	 */
	className?: string;
	/**
	 * Additional styles to apply to the component
	 */
	style?: React.CSSProperties;
	/**
	 * The tab components as children
	 */
	children: ReactNode;
}

/**
 * Compound component type for DsSmartTabs
 */
export interface DsSmartTabsCompound {
	(props: DsSmartTabsProps): React.ReactElement;
	Tab: React.FC<DsTabProps>;
}
