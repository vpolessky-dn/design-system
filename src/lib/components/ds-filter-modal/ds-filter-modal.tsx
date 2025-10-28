import { CSSProperties } from 'react';
import { Dialog } from '@ark-ui/react/dialog';
import classNames from 'classnames';
import { DsFilterModalProps, FilterNavItem } from './ds-filter-modal.types';
import styles from './ds-filter-modal.module.scss';
import { DsIcon } from '../ds-icon';
import { DsButton } from '../ds-button';
import { DsModal } from '../ds-modal';

/**
 * Specialized filter modal based on DsModal with built-in filter navigation
 */
export const DsFilterModal = ({
	open,
	onOpenChange,
	columns,
	className,
	modal = true,
	closeOnEscape = true,
	closeOnInteractOutside = false,
	onClearAll,
	onApply,
	filterNavItems = [],
	selectedFilterId,
	onFilterSelect,
	children,
	applyLabel = 'Apply',
	clearAllLabel = 'Clear all filters',
	applyDisabled = false,
	clearAllDisabled = false,
}: DsFilterModalProps) => {
	return (
		<DsModal
			open={open}
			onOpenChange={onOpenChange}
			columns={columns}
			className={classNames(styles.filterModal, className)}
			modal={modal}
			closeOnEscape={closeOnEscape}
			closeOnInteractOutside={closeOnInteractOutside}
		>
			<div className={styles.filterModalContent}>
				<FilterHeader />
				<div className={styles.body}>
					<FilterNav items={filterNavItems} selectedId={selectedFilterId} onSelect={onFilterSelect} />
					<div className={styles.filterContent}>{children}</div>
				</div>
				<FilterFooter
					onClearAll={onClearAll}
					onApply={onApply}
					applyLabel={applyLabel}
					clearAllLabel={clearAllLabel}
					applyDisabled={applyDisabled}
					clearAllDisabled={clearAllDisabled}
				/>
			</div>
		</DsModal>
	);
};

const FilterHeader = ({ style, className }: { style?: CSSProperties; className?: string }) => (
	<div style={style} className={classNames(styles.header, className)}>
		<div className={styles.headerLeft}>
			<DsIcon icon="filter_list" size="small" />
			<Dialog.Title asChild>
				<h2 className={styles.headerTitle}>Filters</h2>
			</Dialog.Title>
		</div>
		<Dialog.CloseTrigger asChild>
			<button className={styles.closeButton} aria-label="Close filters">
				<DsIcon icon="close" size="small" />
			</button>
		</Dialog.CloseTrigger>
	</div>
);

const FilterNav = ({
	items,
	selectedId,
	onSelect,
}: {
	items: FilterNavItem[];
	selectedId?: string;
	onSelect?: (filterId: string) => void;
}) => (
	<nav className={styles.filterNav}>
		{items.map((item) => (
			<button
				key={item.id}
				className={classNames(styles.filterNavItem, {
					[styles.selected]: item.id === selectedId,
				})}
				disabled={item.disabled}
				onClick={() => onSelect?.(item.id)}
				aria-current={item.id === selectedId ? 'true' : undefined}
			>
				<span className={styles.filterNavItemLabel}>{item.label}</span>
				{item.count !== undefined && item.count > 0 && (
					<span className={styles.filterNavItemCount}>{item.count}</span>
				)}
			</button>
		))}
	</nav>
);

const FilterFooter = ({
	onClearAll,
	onApply,
	applyLabel,
	clearAllLabel,
	applyDisabled,
	clearAllDisabled,
}: {
	onClearAll?: () => void;
	onApply?: () => void;
	applyLabel: string;
	clearAllLabel: string;
	applyDisabled: boolean;
	clearAllDisabled: boolean;
}) => (
	<div className={styles.footer}>
		<DsButton
			design="v1.2"
			variant="filled"
			buttonType="secondary"
			onClick={onClearAll}
			disabled={clearAllDisabled}
		>
			<DsIcon icon="close" size="small" />
			{clearAllLabel}
		</DsButton>
		<div className={styles.footerActions}>
			<DsButton
				design="v1.2"
				variant="filled"
				buttonType="primary"
				onClick={onApply}
				disabled={applyDisabled}
			>
				{applyLabel}
			</DsButton>
		</div>
	</div>
);

DsFilterModal.Header = FilterHeader;
DsFilterModal.Nav = FilterNav;
DsFilterModal.Footer = FilterFooter;

export default DsFilterModal;
