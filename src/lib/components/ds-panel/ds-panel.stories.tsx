import type { Meta, StoryObj } from '@storybook/react';
import { DsPanel } from './ds-panel';
import { DsButton } from '../ds-button/';
import { useState } from 'react';
import styles from './ds-panel.stories.module.scss';
import { expect, userEvent } from '@storybook/test';

export default {
	title: 'Design System/Panel',
	component: DsPanel,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: ['collapsed', 'minimized'],
		},
	},
} satisfies Meta<typeof DsPanel>;

type Story = StoryObj<typeof DsPanel>;

export const Default: Story = {
	render: function Render({ variant }) {
		const [open, setOpen] = useState(true);

		const shouldShowOpenButton = variant !== 'minimized' && !open;

		return (
			<>
				{shouldShowOpenButton && <DsButton onClick={() => setOpen(true)}>Open Panel</DsButton>}

				<DsPanel open={open} onOpenChange={setOpen} variant={variant}>
					<DsPanel.Content>
						<p>
							This is a panel. It can contain any content you like, such as text, images, or other components.
						</p>

						<p>It is collapsible. Hover it to see the trigger button.</p>

						<DsButton size="small">Primary Action</DsButton>
					</DsPanel.Content>

					<DsPanel.MinimizedContent>
						<div className={styles.minimizedContent}>
							Minimized content <DsButton size="small">Action</DsButton>
						</div>
					</DsPanel.MinimizedContent>
				</DsPanel>
			</>
		);
	},

	play: async ({ canvas, step, args, initialArgs }) => {
		const panelTrigger = canvas.getByLabelText('Toggle panel');

		args.variant = 'collapsed';

		await step('Close Panel - Collapsed', async () => {
			await userEvent.click(panelTrigger);

			await expect(canvas.queryByText(/This is a panel/)).not.toBeInTheDocument();
		});

		await step('Open Panel - Collapsed', async () => {
			await userEvent.click(canvas.getByText('Open Panel'));

			await expect(canvas.getByText(/This is a panel/)).toBeVisible();
		});

		args.variant = 'minimized';

		await step('Close Panel - Minimized', async () => {
			await userEvent.click(panelTrigger);

			await expect(canvas.queryByText(/This is a panel/)).not.toBeInTheDocument();
			await expect(canvas.getByText(/Minimized content/)).toBeVisible();
		});

		await step('Open Panel - Minimized', async () => {
			await userEvent.click(panelTrigger);

			await expect(canvas.getByText(/This is a panel/)).toBeVisible();
			await expect(canvas.queryByText(/Minimized content/)).not.toBeInTheDocument();
		});

		// Reset state.
		args.variant = initialArgs.variant;
	},
};
