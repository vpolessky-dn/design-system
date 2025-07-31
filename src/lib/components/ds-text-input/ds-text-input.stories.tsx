import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, waitFor, within } from '@storybook/test';
import { useState } from 'react';
import { DsTextInput } from './index';

const meta: Meta<typeof DsTextInput> = {
	title: 'Design System/TextInput',
	component: DsTextInput,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		type: {
			control: { type: 'select' },
			options: ['text', 'email', 'password', 'number', 'tel', 'url'],
		},
		size: {
			control: { type: 'select' },
			options: ['small', 'default'],
		},
		leftIcon: {
			control: { type: 'text' },
		},
		rightIcon: {
			control: { type: 'text' },
		},
		disabled: {
			control: { type: 'boolean' },
		},
		readOnly: {
			control: { type: 'boolean' },
		},
	},
};

export default meta;
type Story = StoryObj<typeof DsTextInput>;

export const Default: Story = {
	args: {
		type: 'text',
		placeholder: 'Enter text',
		style: { width: '200px' },
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByPlaceholderText('Enter text');

		// Test basic input functionality
		await userEvent.type(input, 'Hello World');
		await expect(input).toHaveValue('Hello World');

		// Reset
		await userEvent.clear(input);
	},
};

export const WithLeftIcon: Story = {
	args: {
		type: 'text',
		leftIcon: 'search',
		placeholder: 'Search...',
		style: { width: '200px' },
	},
};

export const WithRightIcon: Story = {
	args: {
		type: 'text',
		rightIcon: 'info',
		placeholder: 'With right icon',
		style: { width: '200px' },
	},
};

export const Email: Story = {
	args: {
		type: 'email',
		placeholder: 'Enter email address',
		style: { width: '200px' },
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByPlaceholderText('Enter email address');

		// Test email input
		await userEvent.type(input, 'test@example.com');
		await expect(input).toHaveValue('test@example.com');
		await expect(input).toHaveAttribute('type', 'email');

		// Reset
		await userEvent.clear(input);
	},
};

export const Small: Story = {
	args: {
		type: 'text',
		size: 'small',
		placeholder: 'Small input',
		style: { width: '150px' },
	},
};

export const Disabled: Story = {
	args: {
		type: 'text',
		placeholder: 'Disabled input',
		disabled: true,
		style: { width: '200px' },
	},
};

export const ReadOnly: Story = {
	args: {
		type: 'text',
		placeholder: 'Read-only input',
		readOnly: true,
		value: 'This is read-only text',
		style: { width: '200px' },
	},
};

export const Controlled: Story = {
	render: function Render(args) {
		const [value, setValue] = useState('initial value');

		return (
			<div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
				<DsTextInput {...args} value={value} onValueChange={(newValue) => setValue(newValue)} />
				<div>Current value: {value}</div>
				<button onClick={() => setValue('updated value')}>Update value</button>
				<button onClick={() => setValue('')}>Clear value</button>
			</div>
		);
	},
	args: {
		type: 'text',
		placeholder: 'Controlled input',
		style: { width: '200px' },
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByPlaceholderText('Controlled input');
		const updateButton = canvas.getByText('Update value');
		const clearButton = canvas.getByText('Clear value');
		const valueDisplay = canvas.getByText('Current value: initial value');

		// Test initial value
		await expect(input).toHaveValue('initial value');
		await expect(valueDisplay).toHaveTextContent('Current value: initial value');

		// Test external control
		await userEvent.click(updateButton);
		await waitFor(async () => {
			await expect(input).toHaveValue('updated value');
			await expect(valueDisplay).toHaveTextContent('Current value: updated value');
		});

		// Test user input
		await userEvent.clear(input);
		await userEvent.type(input, 'user input');
		await waitFor(async () => {
			await expect(valueDisplay).toHaveTextContent('Current value: user input');
		});

		// Test clear
		await userEvent.click(clearButton);
		await waitFor(async () => {
			await expect(input).toHaveValue('');
			await expect(valueDisplay).toHaveTextContent('Current value:');
		});
	},
};
