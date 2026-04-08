import type { CSSProperties, ReactNode, Ref } from 'react';

import type { ResponsiveValue } from '../../utils/responsive';

export const stackDirections = ['row', 'column', 'row-reverse', 'column-reverse'] as const;
export type StackDirection = (typeof stackDirections)[number];

export interface DsStackBaseProps {
	direction?: StackDirection;
	gap?: CSSProperties['gap'];
	alignItems?: CSSProperties['alignItems'];
	justifyContent?: CSSProperties['justifyContent'];
	flex?: CSSProperties['flex'];
	flexWrap?: CSSProperties['flexWrap'];
	width?: CSSProperties['width'];

	children?: ReactNode;
	className?: string;
	style?: CSSProperties;
	ref?: Ref<HTMLDivElement>;
}

export interface DsStackProps extends Omit<
	DsStackBaseProps,
	'direction' | 'gap' | 'alignItems' | 'justifyContent' | 'flex' | 'flexWrap' | 'width'
> {
	direction?: ResponsiveValue<StackDirection>;
	gap?: ResponsiveValue<CSSProperties['gap']>;
	alignItems?: ResponsiveValue<CSSProperties['alignItems']>;
	justifyContent?: ResponsiveValue<CSSProperties['justifyContent']>;
	flex?: ResponsiveValue<CSSProperties['flex']>;
	flexWrap?: ResponsiveValue<CSSProperties['flexWrap']>;
	width?: ResponsiveValue<CSSProperties['width']>;
}
