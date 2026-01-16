import type React from 'react';
import { Tabs } from '@ark-ui/react/tabs';
import classNames from 'classnames';
import DsTabsContext from './context/ds-tabs-context';
import type { DsTabsContextType } from './context/ds-tabs-context.types';
import { DsTabsList } from './components/ds-tabs-list';
import { DsTabsTab } from './components/ds-tabs-tab';
import { DsTabsContent } from './components/ds-tabs-content';
import type { DsTabsProps } from './ds-tabs.types';
import styles from './ds-tabs.module.scss';

const DsTabsRoot = ({
	value,
	defaultValue,
	onValueChange,
	orientation = 'horizontal',
	size = 'medium',
	className,
	style,
	children,
}: DsTabsProps) => {
	const handleValueChange = (details: { value: string | null }) => {
		onValueChange?.(details.value);
	};

	const contextValue: DsTabsContextType = {
		orientation,
		size,
		currentValue: value,
		onValueChange,
	};

	return (
		<DsTabsContext.Provider value={contextValue}>
			<Tabs.Root
				orientation={orientation}
				value={value}
				defaultValue={defaultValue}
				onValueChange={handleValueChange}
				activationMode="manual"
				lazyMount
				unmountOnExit
				className={classNames(styles.root, styles[`root-${orientation}`], className)}
				style={style}
			>
				{children}
			</Tabs.Root>
		</DsTabsContext.Provider>
	);
};

export interface DsTabsComponent extends React.FC<DsTabsProps> {
	List: typeof DsTabsList;
	Tab: typeof DsTabsTab;
	Content: typeof DsTabsContent;
}

export const DsTabs = DsTabsRoot as DsTabsComponent;

DsTabs.List = DsTabsList;
DsTabs.Tab = DsTabsTab;
DsTabs.Content = DsTabsContent;
