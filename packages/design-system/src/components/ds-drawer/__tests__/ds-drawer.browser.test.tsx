import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { page } from 'vitest/browser';
import DsDrawer from '../ds-drawer';

const DrawerWrapper = ({ onOpenChange, ...props }: Partial<Parameters<typeof DsDrawer>[0]>) => {
	const [open, setOpen] = useState(false);

	const handleOpenChange = (value: boolean) => {
		setOpen(value);
		onOpenChange?.(value);
	};

	return (
		<div style={{ position: 'relative', width: 800, height: 400 }}>
			<button type="button" onClick={() => handleOpenChange(true)}>
				Open Drawer
			</button>

			<DsDrawer {...props} open={open} onOpenChange={handleOpenChange}>
				{props.children ?? (
					<>
						<DsDrawer.Header>
							<DsDrawer.Title>Test Drawer</DsDrawer.Title>
							<DsDrawer.CloseTrigger />
						</DsDrawer.Header>
						<DsDrawer.Body>Body content</DsDrawer.Body>
					</>
				)}
			</DsDrawer>
		</div>
	);
};

describe('DsDrawer', () => {
	it('opens and closes via trigger', async () => {
		await page.render(<DrawerWrapper />);

		await page.getByRole('button', { name: /open drawer/i }).click();

		const dialog = page.getByRole('dialog');
		await expect.element(dialog).toHaveAttribute('data-state', 'open');

		await page.getByRole('button', { name: /close/i }).click();
		await expect.element(dialog).toHaveAttribute('data-state', 'closed');
	});

	it('calls onOpenChange when opened and closed', async () => {
		const onOpenChange = vi.fn();
		await page.render(<DrawerWrapper onOpenChange={onOpenChange} />);

		await page.getByRole('button', { name: /open drawer/i }).click();
		expect(onOpenChange).toHaveBeenCalledWith(true);

		await page.getByRole('button', { name: /close/i }).click();
		expect(onOpenChange).toHaveBeenCalledWith(false);
	});

	it('renders backdrop when backdrop prop is true', async () => {
		const { baseElement } = await page.render(<DrawerWrapper backdrop />);

		await page.getByRole('button', { name: /open drawer/i }).click();

		const dialog = page.getByRole('dialog');
		await expect.element(dialog).toHaveAttribute('data-state', 'open');

		const backdrop = baseElement.querySelector('[data-part="backdrop"]');
		expect(backdrop).toBeTruthy();
		expect(backdrop).toHaveAttribute('data-state', 'open');
	});

	it('has responsive width clamped between 240px and 480px', async () => {
		await page.render(<DrawerWrapper />);

		await page.getByRole('button', { name: /open drawer/i }).click();

		const dialog = page.getByRole('dialog');
		await expect.element(dialog).toHaveAttribute('data-state', 'open');

		const el = dialog.element() as HTMLElement;
		const width = el.getBoundingClientRect().width;
		expect(width).toBeGreaterThanOrEqual(240);
		expect(width).toBeLessThanOrEqual(480);
	});

	it('fills remaining height', async () => {
		await page.render(<DrawerWrapper />);

		await page.getByRole('button', { name: /open drawer/i }).click();

		const dialog = page.getByRole('dialog');
		await expect.element(dialog).toHaveAttribute('data-state', 'open');

		const el = dialog.element() as HTMLElement;
		const container = el.closest('[data-scope="dialog"]')?.parentElement;
		const containerHeight = container?.getBoundingClientRect().height ?? 0;
		const drawerHeight = el.getBoundingClientRect().height;
		expect(drawerHeight).toBe(containerHeight);
	});
});
