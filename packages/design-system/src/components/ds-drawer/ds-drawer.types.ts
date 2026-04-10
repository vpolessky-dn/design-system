import type { CSSProperties, ReactNode } from 'react';
import type { UseDialogProps as DialogProps } from '@ark-ui/react/dialog';

import type { ResponsiveValue } from '../../utils/responsive';

export type DsDrawerPosition = 'start' | 'end';

export interface DsDrawerBaseProps extends Pick<DialogProps, 'closeOnEscape' | 'closeOnInteractOutside'> {
	open: boolean;
	onOpenChange: (open: boolean) => void;

	/**
	 * Drawer width. Accepts any CSS width value.
	 * @default 'clamp(240px, 20vw, 480px)'
	 */
	width?: CSSProperties['width'];

	/** @default 'end' */
	position?: DsDrawerPosition;

	/** @default false */
	backdrop?: boolean;

	/** @default false */
	portal?: boolean;

	style?: CSSProperties;
	className?: string;
	children: ReactNode;
}

export interface DsDrawerProps extends Omit<DsDrawerBaseProps, 'width'> {
	/**
	 * Drawer width. Accepts a static value or a responsive object.
	 * @default 'clamp(240px, 20vw, 480px)'
	 */
	width?: ResponsiveValue<CSSProperties['width']>;
}
