import type { FC, SVGProps } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { page } from 'vitest/browser';
import DsIcon from '../ds-icon';

const TestSvg: FC<SVGProps<SVGSVGElement>> = (props) => (
	<svg data-testid="test-svg" viewBox="0 0 24 24" {...props}>
		<circle cx="12" cy="12" r="10" fill="currentColor" />
	</svg>
);

describe('DsIcon', () => {
	it('should render a material icon', async () => {
		await page.render(<DsIcon icon="home" />);

		const icon = page.getByText('home');
		await expect.element(icon).toBeVisible();
	});

	it('should render a custom SVG icon', async () => {
		await page.render(<DsIcon icon="special-home" />);

		const svg = page.elementLocator(document.querySelector('svg') as unknown as HTMLElement);
		await expect.element(svg).toBeInTheDocument();
	});

	it('should render an inline SVG component', async () => {
		await page.render(<DsIcon icon={TestSvg} />);

		await expect.element(page.getByTestId('test-svg')).toBeInTheDocument();
	});

	it('should resolve semantic color to a CSS variable', async () => {
		await page.render(<DsIcon icon="home" color="error" />);

		const icon = page.getByText('home');
		await expect.element(icon).toHaveAttribute('style', expect.stringContaining('var(--font-error)'));
	});

	it('should pass raw CSS color values through unchanged', async () => {
		await page.render(<DsIcon icon="home" color="#ff0000" />);

		const icon = page.getByText('home');
		await expect.element(icon).toHaveAttribute('style', expect.stringContaining('rgb(255, 0, 0)'));
	});

	it('should apply the color prop to a custom SVG icon', async () => {
		await page.render(<DsIcon icon="special-home" color="rgb(0, 128, 0)" />);

		const svg = page.elementLocator(document.querySelector('svg') as unknown as HTMLElement);
		await expect.element(svg).toHaveAttribute('style', expect.stringContaining('color: rgb(0, 128, 0)'));
	});

	it('should apply the color prop to an inline SVG component', async () => {
		await page.render(<DsIcon icon={TestSvg} color="rgb(0, 0, 255)" />);

		const svg = page.getByTestId('test-svg');
		await expect.element(svg).toHaveAttribute('style', expect.stringContaining('color: rgb(0, 0, 255)'));
	});

	it('should let style.color override the color prop', async () => {
		await page.render(<DsIcon icon="home" color="rgb(255, 0, 0)" style={{ color: 'rgb(0, 0, 255)' }} />);

		const icon = page.getByText('home');
		await expect.element(icon).toHaveAttribute('style', expect.stringContaining('color: rgb(0, 0, 255)'));
	});

	it('should call onClick when clicked', async () => {
		const onClick = vi.fn();

		await page.render(<DsIcon icon="home" onClick={onClick} />);

		await page.getByText('home').click();
		expect(onClick).toHaveBeenCalledOnce();
	});
});
