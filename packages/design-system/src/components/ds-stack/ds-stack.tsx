import classNames from 'classnames';

import styles from './ds-stack.module.scss';
import type { DsStackBaseProps } from './ds-stack.types';

export const DsStack = ({
	direction,
	gap,
	alignItems,
	justifyContent,
	flex,
	flexWrap,
	width,
	children,
	className,
	style,
	ref,
}: DsStackBaseProps) => {
	const layoutStyle: React.CSSProperties = {
		flexDirection: direction,
		gap,
		alignItems,
		justifyContent,
		flex,
		flexWrap,
		width,
		...style,
	};

	return (
		<div ref={ref} className={classNames(styles.root, className)} style={layoutStyle}>
			{children}
		</div>
	);
};
