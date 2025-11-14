import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ColumnDef, ColumnFilter } from '@tanstack/react-table';
import DsIcon from '../../ds-icon/ds-icon';
import { IconType } from '../../ds-icon/ds-icon.types';
import DsTable from '../ds-table';
import DsButton from '../../ds-button/ds-button';
import DsStatusBadge from '../../ds-status-badge/ds-status-badge';
import { DsStatus } from '../../ds-status-badge/ds-status-badge.types';
import { TableFilterModal, TableFilterNavItem } from './components/table-filter-modal';
import { ChipFilterPanel, FilterChipItem } from '../../../../widgets';
import { CheckboxFilter, CheckboxFilterItem } from './components/select-filter/select-filter';
import { RangeFilter, RangeFilterValue } from './components/range-filter/range-filter';
import styles from '../ds-table.stories.module.scss';

export enum WorkflowCategory {
	NetworkBuilt = 'Network Built',
	OpticalOptimization = 'Optical Optimization',
	ServiceProvisioning = 'Service Provisioning',
}

type Workflow = {
	id: string;
	name: string;
	status: DsStatus;
	runningCompleted: {
		running: number;
		completed: number;
	};
	category: WorkflowCategory;
	version: string;
	lastEdited: string;
};

const columns: ColumnDef<Workflow>[] = [
	{
		accessorKey: 'status',
		header: 'Status',
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'name',
		header: 'Name',
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'runningCompleted',
		header: 'Running/completed',
		cell: (info) => {
			const value = info.getValue() as { running: number; completed: number };
			return `${value.running}/${value.completed}`;
		},
	},
	{
		accessorKey: 'category',
		header: 'Category',
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'version',
		header: 'Version',
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'lastEdited',
		header: 'Last edited',
		cell: (info) => info.getValue(),
	},
];

const defaultData: Workflow[] = [
	{
		id: '1',
		name: 'Scheduled Config Backup',
		status: 'active',
		runningCompleted: { running: 3, completed: 41 },
		category: WorkflowCategory.NetworkBuilt,
		version: '000.0003',
		lastEdited: '23-05-2024 04:47 PM',
	},
	{
		id: '2',
		name: 'Network Provisioning',
		status: 'running',
		runningCompleted: { running: 8, completed: 14 },
		category: WorkflowCategory.NetworkBuilt,
		version: '000.0002',
		lastEdited: '23-05-2024 04:47 PM',
	},
	{
		id: '3',
		name: 'Service Provisioning',
		status: 'inactive',
		runningCompleted: { running: 0, completed: 243 },
		category: WorkflowCategory.NetworkBuilt,
		version: '000.0033',
		lastEdited: '23-05-2024 04:47 PM',
	},
	{
		id: '4',
		name: 'Assign IPv4 Address',
		status: 'active',
		runningCompleted: { running: 14, completed: 123 },
		category: WorkflowCategory.NetworkBuilt,
		version: '000.0001',
		lastEdited: '23-05-2024 04:47 PM',
	},
	{
		id: '5',
		name: 'Shutdown Decommissioned Device',
		status: 'active',
		runningCompleted: { running: 45, completed: 45 },
		category: WorkflowCategory.OpticalOptimization,
		version: '000.0022',
		lastEdited: '23-05-2024 04:47 PM',
	},
	{
		id: '6',
		name: 'Optical Power Level Calibration',
		status: 'draft',
		runningCompleted: { running: 99, completed: 23 },
		category: WorkflowCategory.OpticalOptimization,
		version: '000.0001',
		lastEdited: '23-05-2024 04:47 PM',
	},
	{
		id: '7',
		name: 'Deploy Layer 2 EVPN Instance',
		status: 'pending',
		runningCompleted: { running: 49, completed: 100 },
		category: WorkflowCategory.OpticalOptimization,
		version: '000.0012',
		lastEdited: '23-05-2024 04:47 PM',
	},
	{
		id: '8',
		name: 'Initiate Scheduled Firmware Upgrade',
		status: 'active',
		runningCompleted: { running: 25, completed: 75 },
		category: WorkflowCategory.ServiceProvisioning,
		version: '000.0010',
		lastEdited: '23-05-2024 04:47 PM',
	},
	{
		id: '9',
		name: 'Enable High Availability Mode',
		status: 'running',
		runningCompleted: { running: 77, completed: 88 },
		category: WorkflowCategory.ServiceProvisioning,
		version: '000.0001',
		lastEdited: '23-05-2024 04:47 PM',
	},
	{
		id: '10',
		name: 'Audit Access Control Policies',
		status: 'active',
		runningCompleted: { running: 65, completed: 200 },
		category: WorkflowCategory.ServiceProvisioning,
		version: '000.0001',
		lastEdited: '23-05-2024 04:47 PM',
	},
	{
		id: '11',
		name: 'Synchronize NTP Across Network Nodes',
		status: 'warning',
		runningCompleted: { running: 49, completed: 142 },
		category: WorkflowCategory.ServiceProvisioning,
		version: '000.0001',
		lastEdited: '23-05-2024 04:47 PM',
	},
	{
		id: '12',
		name: 'Validate Optical Link Integrity',
		status: 'failed',
		runningCompleted: { running: 90, completed: 300 },
		category: WorkflowCategory.NetworkBuilt,
		version: '000.0001',
		lastEdited: '03-05-2024 04:47 PM',
	},
];

// --- Storybook Meta ---
// IMPORTANT: Keep the same title as ds-table.stories.tsx to group under same section
const meta: Meta<typeof DsTable<Workflow, unknown>> = {
	title: 'Design System/Table',
	component: DsTable,
	parameters: {
		layout: 'fullscreen',
	},
	tags: ['autodocs'],
	args: {
		columns: columns,
		data: defaultData,
		stickyHeader: true,
		bordered: true,
		fullWidth: true,
		highlightOnHover: true,
		expandable: false,
		emptyState: <div>No data available</div>,
		onRowClick: (row) => console.log('Row clicked:', row),
	},
	decorators: [
		(Story) => (
			<div className={styles.storyPadding}>
				<style>
					{`
            #storybook-root, html, body { height: 100%; }
          `}
				</style>
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof DsTable<Workflow, unknown>>;

// --- Stories ---

export const FiltersPanel: Story = {
	name: 'With Filters Panel',
	render: function Render(args) {
		const statusItems = [
			{ value: 'active' as DsStatus, label: 'Active' },
			{ value: 'running' as DsStatus, label: 'Running' },
			{ value: 'pending' as DsStatus, label: 'Pending' },
			{ value: 'draft' as DsStatus, label: 'Draft' },
			{ value: 'inactive' as DsStatus, label: 'Inactive' },
			{ value: 'warning' as DsStatus, label: 'Warning' },
			{ value: 'failed' as DsStatus, label: 'Failed' },
		];

		const [isOpen, setIsOpen] = useState(false);
		const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>([]);
		const [modalFilters, setModalFilters] = useState<TableFilterNavItem[]>([
			{ id: 'status', label: 'Status', count: 0 },
			{ id: 'runningCompleted', label: 'Running/Completed', count: 0 },
		]);
		const [filterChips, setFilterChips] = useState<FilterChipItem[]>([]);

		const [selectedStatuses, setSelectedStatuses] = useState<CheckboxFilterItem[]>(statusItems);
		const [runningRange, setRunningRange] = useState<RangeFilterValue>({});
		const [completedRange, setCompletedRange] = useState<RangeFilterValue>({});

		const getStatusIcon = (status: DsStatus): IconType => {
			switch (status) {
				case 'active':
					return 'check_circle';
				case 'running':
					return 'change_circle';
				case 'pending':
					return 'pause_circle';
				case 'draft':
					return 'stylus_note';
				case 'inactive':
					return 'stop_circle';
				case 'warning':
					return 'warning';
				case 'failed':
					return 'cancel';
				default:
					return 'check_circle';
			}
		};

		const renderStatus = (status: DsStatus) => {
			const icon = getStatusIcon(status);
			return <DsStatusBadge icon={icon} status={status} size="small" />;
		};

		const formatNumber = (num: number) => {
			return num.toLocaleString('en-US');
		};

		const statusColumnDef: ColumnDef<Workflow> = {
			accessorKey: 'status',
			header: 'Status',
			filterFn: (row, columnId, filterValue) => filterValue.includes(row.getValue(columnId)),
			cell: (info) => renderStatus(info.getValue() as DsStatus),
		};

		const runningCompletedColumnDef: ColumnDef<Workflow> = {
			accessorKey: 'runningCompleted',
			header: 'Running/completed',
			filterFn: (row, columnId, filterValue) => {
				const value = row.getValue(columnId) as { running: number; completed: number };
				const { runningFrom, runningTo, completedFrom, completedTo } = filterValue;

				let runningMatch = true;
				let completedMatch = true;

				if (runningFrom !== undefined || runningTo !== undefined) {
					runningMatch =
						(runningFrom === undefined || value.running >= runningFrom) &&
						(runningTo === undefined || value.running <= runningTo);
				}

				if (completedFrom !== undefined || completedTo !== undefined) {
					completedMatch =
						(completedFrom === undefined || value.completed >= completedFrom) &&
						(completedTo === undefined || value.completed <= completedTo);
				}

				return runningMatch && completedMatch;
			},
			cell: (info) => {
				const value = info.getValue() as { running: number; completed: number };
				return `${value.running}/${value.completed}`;
			},
		};

		const tableColumns = args.columns.map((col) => {
			const accessorKey = (col as { accessorKey: string }).accessorKey;
			if (accessorKey === 'status') {
				return statusColumnDef;
			}
			if (accessorKey === 'runningCompleted') {
				return runningCompletedColumnDef;
			}
			return col;
		});

		const handleApply = () => {
			const filters: ColumnFilter[] = [];
			const chips: FilterChipItem[] = [];

			if (selectedStatuses.length < statusItems.length) {
				filters.push({
					id: 'status',
					value: selectedStatuses.map((s) => s.value),
				});
				chips.push(
					...selectedStatuses.map((status) => ({
						id: `status_${status.value}`,
						label: `Status: ${status.label}`,
						metadata: {
							key: 'status',
							value: status.value,
						},
					})),
				);
			}

			const hasRunningFilter = runningRange.from !== undefined || runningRange.to !== undefined;
			const hasCompletedFilter = completedRange.from !== undefined || completedRange.to !== undefined;

			if (hasRunningFilter || hasCompletedFilter) {
				filters.push({
					id: 'runningCompleted',
					value: {
						runningFrom: runningRange.from,
						runningTo: runningRange.to,
						completedFrom: completedRange.from,
						completedTo: completedRange.to,
					},
				});

				if (hasRunningFilter) {
					const fromText = runningRange.from !== undefined ? formatNumber(runningRange.from) : '';
					const toText = runningRange.to !== undefined ? formatNumber(runningRange.to) : '';
					chips.push({
						id: 'running_range',
						label: `Running: From ${fromText} to ${toText}`,
						metadata: {
							key: 'running',
							from: runningRange.from,
							to: runningRange.to,
						},
					});
				}

				if (hasCompletedFilter) {
					const fromText = completedRange.from !== undefined ? formatNumber(completedRange.from) : '';
					const toText = completedRange.to !== undefined ? formatNumber(completedRange.to) : '';
					chips.push({
						id: 'completed_range',
						label: `Completed: From ${fromText} to ${toText}`,
						metadata: {
							key: 'completed',
							from: completedRange.from,
							to: completedRange.to,
						},
					});
				}
			}

			setColumnFilters(filters);
			setFilterChips(chips);
			setIsOpen(false);
		};

		const handleClearAll = () => {
			setSelectedStatuses(statusItems);
			setRunningRange({});
			setCompletedRange({});
			setColumnFilters([]);
			setFilterChips([]);
			setIsOpen(false);
		};

		const handleFilterDelete = (filter: FilterChipItem) => {
			if (filter.metadata?.key === 'status') {
				const newSelectedStatuses = selectedStatuses.filter((item) => item.value !== filter.metadata?.value);
				setSelectedStatuses(newSelectedStatuses);

				const newFilters = columnFilters.map((cf) => {
					if (cf.id === 'status') {
						return {
							...cf,
							value: newSelectedStatuses.map((s) => s.value),
						};
					}
					return cf;
				});

				setColumnFilters(newFilters.filter((cf) => cf.id !== 'status' || newSelectedStatuses.length > 0));
				setFilterChips((prev) => prev.filter((item) => item.id !== filter.id));
			} else if (filter.metadata?.key === 'running') {
				setRunningRange({});
				const hasCompleted = completedRange.from !== undefined || completedRange.to !== undefined;

				if (!hasCompleted) {
					setColumnFilters((prev) => prev.filter((cf) => cf.id !== 'runningCompleted'));
				} else {
					setColumnFilters((prev) =>
						prev.map((cf) => {
							if (cf.id === 'runningCompleted') {
								return {
									...cf,
									value: {
										...cf.value,
										runningFrom: undefined,
										runningTo: undefined,
									},
								};
							}
							return cf;
						}),
					);
				}
				setFilterChips((prev) => prev.filter((item) => item.id !== filter.id));
			} else if (filter.metadata?.key === 'completed') {
				setCompletedRange({});
				const hasRunning = runningRange.from !== undefined || runningRange.to !== undefined;

				if (!hasRunning) {
					setColumnFilters((prev) => prev.filter((cf) => cf.id !== 'runningCompleted'));
				} else {
					setColumnFilters((prev) =>
						prev.map((cf) => {
							if (cf.id === 'runningCompleted') {
								return {
									...cf,
									value: {
										...cf.value,
										completedFrom: undefined,
										completedTo: undefined,
									},
								};
							}
							return cf;
						}),
					);
				}
				setFilterChips((prev) => prev.filter((item) => item.id !== filter.id));
			}
		};

		return (
			<div className={styles.tableFilterContainer}>
				<div className={styles.toolbar}>
					<DsButton design="v1.2" buttonType="secondary" onClick={() => setIsOpen(true)}>
						<DsIcon size="tiny" icon="filter_list" />
					</DsButton>
				</div>
				{filterChips.length > 0 && (
					<ChipFilterPanel
						filters={filterChips}
						onClearAll={handleClearAll}
						onFilterDelete={handleFilterDelete}
					/>
				)}
				<DsTable
					{...args}
					columns={tableColumns}
					columnFilters={columnFilters}
					onColumnFiltersChange={setColumnFilters}
				/>
				<TableFilterModal
					open={isOpen}
					onOpenChange={setIsOpen}
					columns={8}
					filterNavItems={modalFilters}
					onApply={handleApply}
					onClearAll={handleClearAll}
				>
					{(selectedFilter) => {
						if (selectedFilter.id === 'status') {
							return (
								<CheckboxFilter
									items={statusItems}
									renderer={(item) => renderStatus(item.value as DsStatus)}
									selectedItems={selectedStatuses}
									onSelectionChange={setSelectedStatuses}
								/>
							);
						}
						if (selectedFilter.id === 'runningCompleted') {
							return (
								<div>
									<RangeFilter
										label="Running"
										value={runningRange}
										onChange={setRunningRange}
										onClear={() => setRunningRange({})}
									/>
									<RangeFilter
										label="Completed"
										value={completedRange}
										onChange={setCompletedRange}
										onClear={() => setCompletedRange({})}
									/>
								</div>
							);
						}
						return JSON.stringify(selectedFilter);
					}}
				</TableFilterModal>
			</div>
		);
	},
	args: {},
};
