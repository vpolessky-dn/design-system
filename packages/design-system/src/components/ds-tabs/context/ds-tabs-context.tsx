import { createContext, useContext } from 'react';
import type { DsTabsContextType } from './ds-tabs-context.types';

const DsTabsContext = createContext<DsTabsContextType | undefined>(undefined);

export const useTabsContext = () => {
	const context = useContext(DsTabsContext);
	if (!context) {
		throw new Error('Tabs compound components must be used within DsTabs');
	}
	return context;
};

export default DsTabsContext;
