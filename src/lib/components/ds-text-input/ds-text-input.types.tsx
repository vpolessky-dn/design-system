import React, { InputHTMLAttributes } from 'react';
import { IconType } from '../ds-icon';

export const textInputSizes = ['small', 'default'] as const;
export type TextInputSize = (typeof textInputSizes)[number];

export interface DsTextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
	/**
	 * The size of the input field
	 * @default default
	 */
	size?: TextInputSize;
	/**
	 * Custom left icon
	 */
	leftIcon?: IconType;
	/**
	 * Custom right icon
	 */
	rightIcon?: IconType;
	/**
	 * Callback when the value changes
	 */
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	/**
	 * Value change event handler (provides just the value)
	 */
	onValueChange?: (value: string) => void;
	/**
	 * Additional CSS class names
	 */
	className?: string;
	/**
	 * Additional styles to apply to the component
	 */
	style?: React.CSSProperties;
	/**
	 * The tooltip text to be displayed on hover
	 */
	tooltip?: string;
	/**
	 * The placeholder text
	 */
	placeholder?: string;
	/**
	 * The current value
	 */
	value?: string;
	/**
	 * Whether the input is disabled
	 */
	disabled?: boolean;
	/**
	 * Whether the input is read-only
	 */
	readOnly?: boolean;
}
