import type { CSSProperties, ReactNode, Ref } from 'react';

export interface DsStackProps {
	direction?: CSSProperties['flexDirection'];
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
