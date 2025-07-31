import React from 'react';
import classNames from 'classnames';
import { NumberInput } from '@ark-ui/react';
import styles from './ds-number-input.module.scss';
import { DsNumberInputProps } from './ds-number-input.types';
import { DsIcon } from '../ds-icon';

/**
 * Design system NumberInput component
 */
const DsNumberInput: React.FC<DsNumberInputProps> = ({
	size = 'default',
	onChange,
	onValueChange,
	className,
	style = {},
	tooltip,
	placeholder,
	disabled = false,
	readOnly = false,
	min,
	max,
	step,
	value,
	defaultValue,
}) => {
	const containerClass = classNames(
		styles.textInputContainer,
		{
			[styles.small]: size === 'small',
			[styles.default]: size === 'default',
		},
		className,
	);

	return (
		<NumberInput.Root
			min={min}
			max={max}
			step={step}
			disabled={disabled}
			readOnly={readOnly}
			value={value}
			defaultValue={defaultValue}
			onValueChange={(details) => onValueChange?.(details.valueAsNumber)}
		>
			<NumberInput.Control asChild>
				<div className={containerClass} style={style} title={tooltip}>
					<NumberInput.DecrementTrigger asChild>
						<button type="button" className={classNames(styles.iconButton)} aria-label="Decrease value">
							<DsIcon icon="remove" size="tiny" />
						</button>
					</NumberInput.DecrementTrigger>

					<NumberInput.Input asChild>
						<input
							type="number"
							className={classNames(styles.input)}
							placeholder={placeholder}
							onChange={onChange}
						/>
					</NumberInput.Input>

					<NumberInput.IncrementTrigger asChild>
						<button type="button" className={classNames(styles.iconButton)} aria-label="Increase value">
							<DsIcon icon="add" size="tiny" />
						</button>
					</NumberInput.IncrementTrigger>
				</div>
			</NumberInput.Control>
		</NumberInput.Root>
	);
};

export default DsNumberInput;
