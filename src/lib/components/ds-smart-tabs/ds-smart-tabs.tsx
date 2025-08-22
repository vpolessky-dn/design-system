import { createContext, CSSProperties, FC, useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { DsIcon } from '../ds-icon';
import styles from './ds-smart-tabs.module.scss';
import { DsSmartTabsCompound, DsTabProps } from './ds-smart-tabs.types';

interface SmartTabsContextType {
	activeTab: string;
	onTabClick: (value: string) => void;
}

const SmartTabsContext = createContext<SmartTabsContextType | null>(null);

const useSmartTabsContext = () => {
	const context = useContext(SmartTabsContext);
	if (!context) {
		throw new Error('DsTab must be used within DsSmartTabs');
	}
	return context;
};

/**
 * Individual tab component
 */
const DsTab: FC<DsTabProps> = ({
	name,
	value,
	icon,
	children,
	color,
	disabled,
	className,
	style = {},
	...props
}) => {
	const { activeTab, onTabClick } = useSmartTabsContext();

	const tabClass = classNames(
		styles.tab,
		{
			[styles.active]: activeTab === value,
			[styles.disabled]: disabled,
		},
		className,
	);
	const tabStyle = {
		...style,
		...(color && ({ '--tab-color': color } as CSSProperties)),
	};

	const handleClick = () => {
		if (!disabled) {
			onTabClick(value);
		}
	};

	return (
		<button className={tabClass} style={tabStyle} onClick={handleClick} disabled={disabled} {...props}>
			<DsIcon className={styles.icon} icon={icon} size="small" />
			<span className={styles.name}>{name}</span>
			<span className={styles.value}>{children}</span>
		</button>
	);
};

/**
 * Design system SmartTabs component
 */
const DsSmartTabs: DsSmartTabsCompound = ({
	activeTab: externalActiveTab,
	onTabClick,
	className,
	style = {},
	children,
	...props
}) => {
	const [internalActiveTab, setInternalActiveTab] = useState<string>('');
	const activeTab = externalActiveTab !== undefined ? externalActiveTab : internalActiveTab;

	useEffect(() => {
		if (externalActiveTab !== undefined) {
			setInternalActiveTab(externalActiveTab);
		}
	}, [externalActiveTab]);

	const handleTabClick = (value: string) => {
		if (externalActiveTab === undefined) {
			setInternalActiveTab(value);
		}
		onTabClick(value);
	};

	const contextValue: SmartTabsContextType = {
		activeTab,
		onTabClick: handleTabClick,
	};

	return (
		<SmartTabsContext.Provider value={contextValue}>
			<div className={classNames(styles.container, className)} style={style} {...props}>
				{children}
			</div>
		</SmartTabsContext.Provider>
	);
};

DsSmartTabs.Tab = DsTab;

export { DsTab };
export default DsSmartTabs;
