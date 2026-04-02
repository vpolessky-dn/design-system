import { describe, expect, it } from 'vitest';

import { BREAKPOINT_LG, isResponsiveValue, resolveResponsiveValue } from './responsive';

describe('BREAKPOINT_LG', () => {
	it('should be sourced from the SCSS variable and equal 1440', () => {
		expect(BREAKPOINT_LG).toBe(1440);
	});
});

describe('isResponsiveValue', () => {
	it('should return true for a responsive object', () => {
		expect(isResponsiveValue({ lg: 'large', md: 'small' })).toBe(true);
	});

	it('should return false for a string', () => {
		expect(isResponsiveValue('large')).toBe(false);
	});

	it('should return false for null', () => {
		expect(isResponsiveValue(null as unknown as string)).toBe(false);
	});

	it('should return false for an object missing md', () => {
		expect(isResponsiveValue({ lg: 'large' } as { lg: string; md: string })).toBe(false);
	});
});

describe('resolveResponsiveValue', () => {
	it('should return static value unchanged for both breakpoints', () => {
		expect(resolveResponsiveValue('large', 'lg')).toBe('large');
		expect(resolveResponsiveValue('large', 'md')).toBe('large');
	});

	it('should resolve lg value from responsive object', () => {
		expect(resolveResponsiveValue({ lg: 'large', md: 'small' }, 'lg')).toBe('large');
	});

	it('should resolve md value from responsive object', () => {
		expect(resolveResponsiveValue({ lg: 'large', md: 'small' }, 'md')).toBe('small');
	});
});
