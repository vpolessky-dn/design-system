import React from 'react';
import classNames from 'classnames';
import styles from './ds-text-input.module.scss';
import { DsTextInputProps } from './ds-text-input.types';
import { DsIcon } from '../ds-icon';

/**
 * Design system TextInput component
 */
const DsTextInput: React.FC<DsTextInputProps> = ({
	size = 'default',
	leftIcon,
	rightIcon,
	onChange,
	onValueChange,
	className,
	style = {},
	tooltip,
	value,
	placeholder,
	disabled = false,
	readOnly = false,
	...props
}) => {
	const containerClass = classNames(
		styles.textInputContainer,
		{
			[styles.small]: size === 'small',
			[styles.default]: size === 'default',
		},
		className,
	);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = event.target.value;
		onChange?.(event);
		onValueChange?.(newValue);
	};

	return (
		<div className={containerClass} style={style} title={tooltip}>
			{leftIcon && (
				<button type="button" className={classNames(styles.iconButton, styles.left)} disabled={disabled}>
					<DsIcon icon={leftIcon} size="tiny" />
				</button>
			)}

			<input
				className={classNames(styles.input)}
				value={value}
				placeholder={placeholder}
				disabled={disabled}
				readOnly={readOnly}
				onChange={handleChange}
				{...props}
			/>

			{rightIcon && (
				<button type="button" className={classNames(styles.iconButton, styles.right)} disabled={disabled}>
					<DsIcon icon={rightIcon} size="tiny" />
				</button>
			)}
		</div>
	);
};

export default DsTextInput;
