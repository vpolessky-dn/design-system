import React from 'react';

export interface DsPasswordInputProps {
	/**
	 * The size of the input field
	 * @default default
	 */
	size?: 'small' | 'default';
	/**
	 * Callback when the value changes (native input onChange event)
	 * This is provided for compatibility but onValueChange is preferred
	 */
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	/**
	 * Value change event handler (provides just the string value)
	 * This is the preferred way to handle value changes
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
	 * The current value (for controlled usage)
	 */
	value?: string;
	/**
	 * Whether the password input is disabled
	 */
	disabled?: boolean;
}
