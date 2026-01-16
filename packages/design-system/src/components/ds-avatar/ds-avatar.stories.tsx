import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { DsAvatar } from './ds-avatar';
import styles from './ds-avatar.stories.module.scss';

const meta: Meta<typeof DsAvatar> = {
	title: 'Design System/Avatar',
	component: DsAvatar,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: 'select',
			options: ['xsm', 'sm', 'regular', 'md', 'lg', 'xl'],
		},
		type: {
			control: 'radio',
			options: ['circle', 'rounded'],
		},
	},
};

export default meta;

type AvatarStory = StoryObj<typeof DsAvatar>;

export const Default: AvatarStory = {
	args: {
		name: 'John Doe',
		size: 'regular',
		type: 'circle',
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const avatar = canvas.getByText('JD'); // Check for initials
		await expect(avatar).toBeInTheDocument();

		// Hover to check tooltip
		await userEvent.hover(avatar);
		const tooltip = await within(document.body).findByRole('tooltip');
		await expect(tooltip).toHaveTextContent('John Doe');
	},
};

export const WithImage: AvatarStory = {
	args: {
		name: 'Jane Smith',
		src: 'https://i.pravatar.cc/150?u=jane',
		size: 'regular',
		type: 'circle',
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const image = await canvas.findByRole('img', { name: 'Jane Smith' });
		await expect(image).toBeInTheDocument();
		await expect(image).toHaveAttribute('src', 'https://i.pravatar.cc/150?u=jane');
	},
};

export const Sizes: AvatarStory = {
	render: (args) => (
		<div className={styles.sizesContainer}>
			<DsAvatar {...args} size="xsm" name="XSmall" />
			<DsAvatar {...args} size="sm" name="Small" />
			<DsAvatar {...args} size="regular" name="Regular" />
			<DsAvatar {...args} size="md" name="Medium" />
			<DsAvatar {...args} size="lg" name="Large" />
			<DsAvatar {...args} size="xl" name="XLarge" />
		</div>
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		// Check all sizes are rendered
		await expect(canvas.getByText('XS')).toBeInTheDocument();
		await expect(canvas.getByText('SM')).toBeInTheDocument();
		await expect(canvas.getByText('RE')).toBeInTheDocument();
		await expect(canvas.getByText('ME')).toBeInTheDocument();
		await expect(canvas.getByText('LA')).toBeInTheDocument();
		await expect(canvas.getByText('XL')).toBeInTheDocument();
	},
};

export const Shapes: AvatarStory = {
	render: (args) => (
		<div className={styles.shapesContainer}>
			<DsAvatar {...args} type="circle" name="Circle" />
			<DsAvatar {...args} type="rounded" name="Rounded" />
		</div>
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		// Check both shapes are rendered
		await expect(canvas.getByText('CI')).toBeInTheDocument();
		await expect(canvas.getByText('RO')).toBeInTheDocument();
	},
};
