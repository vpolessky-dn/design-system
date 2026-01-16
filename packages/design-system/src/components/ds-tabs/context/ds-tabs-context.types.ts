import type { DsTabsOrientation, DsTabsSize } from '../ds-tabs.types';

export interface DsTabsContextType {
	orientation: DsTabsOrientation;
	size: DsTabsSize;
	currentValue?: string;
	onValueChange?: (value: string | null) => void;
}
