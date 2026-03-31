import { describe, expect, it } from 'vitest';

import { isResponsiveValue } from './responsive';

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
