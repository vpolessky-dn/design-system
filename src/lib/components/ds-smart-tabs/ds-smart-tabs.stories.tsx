import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { useState } from 'react';
import DsSmartTabs from './ds-smart-tabs';

const meta: Meta<typeof DsSmartTabs> = {
	title: 'Design System/SmartTabs',
	component: DsSmartTabs,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		activeTab: {
			control: 'text',
			description: 'Currently active tab value (optional)',
		},
		onTabClick: {
			action: 'tab clicked',
			description: 'Callback function when a tab is clicked',
		},
		className: {
			control: 'text',
			description: 'Additional CSS class names',
		},
		style: {
			control: 'object',
			description: 'Inline styles to apply to the component',
		},
	},
};

export default meta;
type Story = StoryObj<typeof DsSmartTabs>;

export const Default: Story = {
	render: () => (
		<DsSmartTabs onTabClick={(value) => console.log('Tab clicked:', value)}>
			<DsSmartTabs.Tab name="All" value="all" icon="view_apps" color="var(--color-background-info-strong)">
				747
			</DsSmartTabs.Tab>
			<DsSmartTabs.Tab
				name="Active"
				value="active"
				icon="check_circle"
				color="var(--color-background-success-strong)"
			>
				198
			</DsSmartTabs.Tab>
			<DsSmartTabs.Tab
				name="Deprecated"
				value="deprecated"
				icon="notifications"
				color="var(--color-icon-warning)"
			>
				202
			</DsSmartTabs.Tab>
			<DsSmartTabs.Tab
				name="Inactive"
				value="inactive"
				icon="stop_circle"
				color="var(--color-icon-information-main)"
			>
				347
			</DsSmartTabs.Tab>
		</DsSmartTabs>
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		// Test that all tabs are rendered
		await expect(canvas.getByText('All')).toBeInTheDocument();
		await expect(canvas.getByText('Active')).toBeInTheDocument();
		await expect(canvas.getByText('Deprecated')).toBeInTheDocument();
		await expect(canvas.getByText('Inactive')).toBeInTheDocument();

		// Test that counts are displayed
		await expect(canvas.getByText('747')).toBeInTheDocument();
		await expect(canvas.getByText('198')).toBeInTheDocument();
		await expect(canvas.getByText('202')).toBeInTheDocument();
		await expect(canvas.getByText('347')).toBeInTheDocument();
	},
};

export const Controlled: Story = {
	render: function Render() {
		const [activeTab, setActiveTab] = useState('all');

		return (
			<div>
				<DsSmartTabs activeTab={activeTab} onTabClick={setActiveTab}>
					<DsSmartTabs.Tab
						name="All"
						value="all"
						icon="view_apps"
						color="var(--color-background-info-strong)"
					>
						747
					</DsSmartTabs.Tab>
					<DsSmartTabs.Tab
						name="Active"
						value="active"
						icon="check_circle"
						color="var(--color-background-success-strong)"
					>
						198
					</DsSmartTabs.Tab>
					<DsSmartTabs.Tab
						name="Deprecated"
						value="deprecated"
						icon="notifications"
						color="var(--color-icon-warning)"
					>
						202
					</DsSmartTabs.Tab>
					<DsSmartTabs.Tab
						name="Inactive"
						value="inactive"
						icon="stop_circle"
						color="var(--color-icon-information-main)"
						disabled
					>
						347
					</DsSmartTabs.Tab>
				</DsSmartTabs>
				<div
					role="status"
					aria-label="Active tab"
					style={{ marginTop: '20px', padding: '16px', background: '#f5f5f5', borderRadius: '4px' }}
				>
					<p>
						Active tab: <strong>{activeTab}</strong>
					</p>
				</div>
			</div>
		);
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		// Test initial state - "all" should be active
		const activeTabIndicator = canvas.getByRole('status', { name: /active tab/i });
		// Verify the semantic structure
		await expect(activeTabIndicator).toHaveTextContent('Active tab: all');

		// Test clicking on "Active" tab
		const activeTab = canvas.getByText('Active');
		await userEvent.click(activeTab);
		await expect(activeTabIndicator).toHaveTextContent('Active tab: active');

		// Test clicking on "Deprecated" tab
		const deprecatedTab = canvas.getByText('Deprecated');
		await userEvent.click(deprecatedTab);
		await expect(activeTabIndicator).toHaveTextContent('Active tab: deprecated');

		// Test that disabled "Inactive" tab doesn't change state when clicked
		const inactiveTab = canvas.getByText('Inactive');
		await userEvent.click(inactiveTab);
		await expect(activeTabIndicator).toHaveTextContent('Active tab: deprecated');
	},
};

export const Uncontrolled: Story = {
	render: function Render() {
		const [activeTab, setActiveTab] = useState<string>('');

		return (
			<div>
				<DsSmartTabs
					onTabClick={(value) => {
						setActiveTab(value);
						console.log('Tab clicked:', value);
					}}
				>
					<DsSmartTabs.Tab
						name="All"
						value="all"
						icon="view_apps"
						color="var(--color-background-info-strong)"
					>
						747
					</DsSmartTabs.Tab>
					<DsSmartTabs.Tab
						name="Active"
						value="active"
						icon="check_circle"
						color="var(--color-background-success-strong)"
					>
						198
					</DsSmartTabs.Tab>
					<DsSmartTabs.Tab
						name="Deprecated"
						value="deprecated"
						icon="notifications"
						color="var(--color-icon-warning)"
					>
						202
					</DsSmartTabs.Tab>
					<DsSmartTabs.Tab
						name="Inactive"
						value="inactive"
						icon="stop_circle"
						color="var(--color-icon-information-main)"
						disabled
					>
						347
					</DsSmartTabs.Tab>
				</DsSmartTabs>
				<div
					role="status"
					aria-label="Active tab"
					style={{ marginTop: '20px', padding: '16px', background: '#f5f5f5', borderRadius: '4px' }}
				>
					<p>
						Active tab: <strong>{activeTab || 'None selected'}</strong>
					</p>
				</div>
			</div>
		);
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		// Test initial state - no tab should be selected
		const activeTabIndicator = canvas.getByRole('status', { name: /active tab/i });
		await expect(activeTabIndicator).toHaveTextContent('Active tab: None selected');

		// Test clicking on "Active" tab
		const activeTab = canvas.getByText('Active');
		await userEvent.click(activeTab);
		await expect(activeTabIndicator).toHaveTextContent('Active tab: active');

		// Test clicking on "Deprecated" tab
		const deprecatedTab = canvas.getByText('Deprecated');
		await userEvent.click(deprecatedTab);
		await expect(activeTabIndicator).toHaveTextContent('Active tab: deprecated');

		// Test that disabled "Inactive" tab doesn't change state when clicked
		const inactiveTab = canvas.getByText('Inactive');
		await userEvent.click(inactiveTab);
		await expect(activeTabIndicator).toHaveTextContent('Active tab: deprecated');
	},
};
