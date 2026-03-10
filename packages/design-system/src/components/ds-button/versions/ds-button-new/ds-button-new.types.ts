import type React from 'react';

export const buttonTypes = ['primary', 'secondary', 'secondary-light', 'tertiary'] as const;
export type ButtonType = (typeof buttonTypes)[number];

export const buttonVariants = ['filled', 'ghost', 'danger', 'dark'] as const;
export type ButtonVariant = (typeof buttonVariants)[number];

export const buttonSizes = ['large', 'medium', 'small', 'tiny'] as const;
export type ButtonSize = (typeof buttonSizes)[number];

interface DsButtonBaseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	/**
	 * Visual variant of the button
	 * @default 'filled'
	 */
	variant?: ButtonVariant;

	/**
	 * Whether the button is disabled
	 * @default false
	 */
	disabled?: boolean;

	/**
	 * Class name for the button content
	 */
	contentClassName?: string;
}

export type DsButtonProps = DsButtonBaseProps &
	(
		| {
				/**
				 * Type of the button
				 * @default 'primary'
				 */
				buttonType?: ButtonType;

				/**
				 * Size of the button
				 * @default 'medium'
				 */
				size?: Exclude<ButtonSize, 'tiny'>;
		  }
		| {
				/**
				 * Type of the button
				 */
				buttonType: 'tertiary';

				/**
				 * Size of the button. Supports 'tiny' for tertiary buttons.
				 * @default 'medium'
				 */
				size?: ButtonSize;
		  }
	);
