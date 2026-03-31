import { describe, expect, it, vi } from 'vitest';
import { renderHook } from 'vitest-browser-react';

import { useBreakpoint, useResponsiveValue } from './responsive';

const mockMatchMedia = (matches: boolean) => {
	const listeners: Array<() => void> = [];

	Object.defineProperty(window, 'matchMedia', {
		writable: true,
		value: vi.fn().mockReturnValue({
			matches,
			addEventListener: (_: string, cb: () => void) => listeners.push(cb),
			removeEventListener: (_: string, cb: () => void) => {
				const idx = listeners.indexOf(cb);

				if (idx >= 0) {
					listeners.splice(idx, 1);
				}
			},
		}),
	});

	return {
		triggerChange: () => listeners.forEach((cb) => cb()),
	};
};

describe('useBreakpoint', () => {
	it('should return lg when viewport >= 1440px', async () => {
		mockMatchMedia(true);
		const { result } = await renderHook(() => useBreakpoint());

		expect(result.current).toBe('lg');
	});

	it('should return md when viewport < 1440px', async () => {
		mockMatchMedia(false);
		const { result } = await renderHook(() => useBreakpoint());

		expect(result.current).toBe('md');
	});
});

describe('useResponsiveValue', () => {
	it('should return a static value unchanged', async () => {
		mockMatchMedia(true);
		const { result } = await renderHook(() => useResponsiveValue('large'));

		expect(result.current).toBe('large');
	});

	it('should resolve lg value on large screens', async () => {
		mockMatchMedia(true);
		const { result } = await renderHook(() => useResponsiveValue({ lg: 'large', md: 'small' }));

		expect(result.current).toBe('large');
	});

	it('should resolve md value on small screens', async () => {
		mockMatchMedia(false);
		const { result } = await renderHook(() => useResponsiveValue({ lg: 'large', md: 'small' }));

		expect(result.current).toBe('small');
	});
});
