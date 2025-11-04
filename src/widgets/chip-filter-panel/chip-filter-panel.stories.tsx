import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import ChipFilterPanel from './chip-filter-panel';
import { FilterChipItem } from './chip-filter-panel.types';
import styles from './chip-filter-panel.stories.module.scss';

const meta: Meta<typeof ChipFilterPanel> = {
	title: 'Widgets/ChipFilterPanel',
	component: ChipFilterPanel,
	parameters: {
		layout: 'padded',
	},
	tags: ['autodocs'],
	argTypes: {
		filters: {
			control: 'object',
			description: 'Array of filter chip items to display',
		},
		onClearAll: {
			action: 'clear-all',
			description: 'Callback when "Clear all filters" is clicked',
		},
		onFilterDelete: {
			action: 'delete-filter',
			description: 'Callback when filter is deleted',
		},
	},
};

export default meta;
type Story = StoryObj<typeof ChipFilterPanel>;

const sampleFilters: FilterChipItem[] = [
	{ id: '1', label: 'Status: Active' },
	{ id: '2', label: 'Running: From 100 to 10,000' },
	{ id: '3', label: 'Completed from 20,000 to 100,000' },
	{ id: '4', label: 'Executor: Category 1, Layer 1 transporter' },
	{ id: '5', label: 'Executor: Category 2, Layer 11 transporter' },
	{ id: '6', label: 'Executor: Category 2, Layer 12 transporter' },
	{ id: '7', label: 'Executor: Category 2, Layer 13 transporter' },
	{ id: '8', label: 'Version: 000.0001-3' },
	{ id: '9', label: 'Version: 000.0001-4' },
	{ id: '10', label: 'Version: 000.0001-5' },
	{ id: '11', label: 'Version: 000.0001-6' },
	{ id: '12', label: 'Last editor: Maren Levin' },
	{ id: '13', label: 'Last editor: Emery Franci' },
];

export const Default: Story = {
	render: function Render() {
		const [filters, setFilters] = useState<FilterChipItem[]>(sampleFilters);

		const handleClearAll = () => {
			setFilters([]);
		};

		const handleAddFilter = () => {
			const newId = `new-${Date.now()}`;
			setFilters((prev) => [
				...prev,
				{
					id: newId,
					label: `New Filter ${prev.length + 1}`,
				},
			]);
		};

		const handleFilterDelete = (filter: FilterChipItem) => {
			setFilters((prev) => prev.filter((f) => f.id !== filter.id));
		};

		const handleFilterSelect = (filter: FilterChipItem) => {
			setFilters((prev) => prev.map((f) => (f.id === filter.id ? { ...f, selected: !f.selected } : f)));
		};

		return (
			<div className={styles.container}>
				<ChipFilterPanel
					filters={filters}
					onClearAll={handleClearAll}
					onFilterDelete={handleFilterDelete}
					onFilterSelect={handleFilterSelect}
				/>
				<div className={styles.controlsContainer}>
					<button onClick={handleAddFilter} className={styles.addButton}>
						Add Filter
					</button>
					<p className={styles.infoText}>Total filters: {filters.length}</p>
					<p className={styles.infoText}>
						Selected filters: [
						{filters
							.filter((filter) => filter.selected)
							.map((filter) => `"${filter.label}"`)
							.join(', ')}
						]
					</p>
				</div>
			</div>
		);
	},
};
