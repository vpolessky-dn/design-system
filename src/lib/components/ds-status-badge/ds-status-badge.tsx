import React from 'react';
import classNames from 'classnames';
import styles from './ds-status-badge.module.scss';
import { DsStatusBadgeProps } from './ds-status-badge.types';
import { DsIcon } from '../ds-icon';
import { DsTypography } from '../ds-typography';

/**
 * Design system StatusBadge component
 */
const DsStatusBadge: React.FC<DsStatusBadgeProps> = ({
	icon,
	status,
	label,
	className,
	style,
	filled = true,
	compact,
	'aria-label': ariaLabel,
}) => {
	const displayLabel = label || status;

	return (
		<div
			style={style}
			className={classNames(
				styles.container,
				styles[status],
				filled && styles.filled,
				compact && styles.compact,
				className,
			)}
			role="status"
			aria-label={ariaLabel || displayLabel}
		>
			<DsIcon icon={icon} size="tiny" filled aria-hidden="true" />
			<DsTypography className={styles.label} variant={filled ? 'body-xs-reg' : 'body-xs-md'}>
				{displayLabel}
			</DsTypography>
		</div>
	);
};

export default DsStatusBadge;
