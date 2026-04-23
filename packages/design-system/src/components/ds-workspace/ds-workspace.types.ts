import type { CSSProperties, ReactNode, Ref } from 'react';

export interface DsWorkspaceProps {
	ref?: Ref<HTMLDivElement>;
	className?: string;
	style?: CSSProperties;
	children?: ReactNode;
	/**
	 * Whether the workspace should fill its parent height (`100%`) instead of the viewport (`100vh`).
	 * @default false
	 */
	fillParent?: boolean;
}

export interface DsWorkspaceHeaderProps {
	ref?: Ref<HTMLElement>;
	className?: string;
	style?: CSSProperties;
	children?: ReactNode;
}

export interface DsWorkspaceSubHeaderProps {
	ref?: Ref<HTMLDivElement>;
	className?: string;
	style?: CSSProperties;
	children?: ReactNode;
}

export interface DsWorkspaceContentProps {
	ref?: Ref<HTMLDivElement>;
	className?: string;
	style?: CSSProperties;
	children?: ReactNode;
}

export interface DsWorkspaceFooterProps {
	ref?: Ref<HTMLElement>;
	className?: string;
	style?: CSSProperties;
	children?: ReactNode;
}
