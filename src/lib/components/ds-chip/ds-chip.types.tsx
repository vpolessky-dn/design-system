import { CSSProperties, MouseEvent, ReactNode, Ref } from 'react';

export const chipSizes = ['medium', 'small'] as const;
export type ChipSize = (typeof chipSizes)[number];

export interface DsChipProps {
	/**
	 * Ref to the chip element
	 */
	ref?: Ref<HTMLDivElement>;
	/**
	 * The label text to display in the chip
	 */
	label: string;
	/**
	 * Additional CSS class names
	 */
	className?: string;
	/**
	 * Additional styles to apply to the component
	 */
	style?: CSSProperties;
	/**
	 * Optional click handler
	 */
	onClick?: (event: MouseEvent<HTMLDivElement>) => void;
	/**
	 * Callback function when delete icon is clicked
	 */
	onDelete?: (event: MouseEvent<HTMLButtonElement>) => void;
	/**
	 * Size of the chip
	 * @default 'medium'
	 */
	size?: ChipSize;
	/**
	 * Custom delete icon element
	 */
	deleteIcon?: ReactNode;
	/**
	 * Whether the chip is in a selected/pressed state
	 * @default false
	 */
	selected?: boolean;
}
