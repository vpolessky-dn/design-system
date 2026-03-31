import { useSyncExternalStore } from 'react';

export const BREAKPOINT_LG = 1440;

export const breakpoints = ['lg', 'md'] as const;
export type Breakpoint = (typeof breakpoints)[number];

export type ResponsiveValue<T> = T | { lg: T; md: T };

export const isResponsiveValue = <T>(value: ResponsiveValue<T>): value is { lg: T; md: T } =>
	value !== null && typeof value === 'object' && 'lg' in value && 'md' in value;

const MEDIA_QUERY = `(min-width: ${String(BREAKPOINT_LG)}px)`;

const subscribe = (callback: () => void) => {
	const mql = window.matchMedia(MEDIA_QUERY);
	mql.addEventListener('change', callback);
	return () => mql.removeEventListener('change', callback);
};

const getSnapshot = (): Breakpoint => (window.matchMedia(MEDIA_QUERY).matches ? 'lg' : 'md');

const getServerSnapshot = (): Breakpoint => 'lg';

export const useBreakpoint = (): Breakpoint =>
	useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

const resolveResponsive = <T>(value: ResponsiveValue<T>, breakpoint: Breakpoint): T =>
	isResponsiveValue(value) ? value[breakpoint] : value;

export const useResponsiveValue = <T>(value: ResponsiveValue<T>): T =>
	resolveResponsive(value, useBreakpoint());
