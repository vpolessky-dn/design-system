import { createTreeCollection } from '@ark-ui/react/tree-view';

import type { DsTreeNode } from './ds-tree.types';

export const createDsTreeCollection = ({ nodes }: { nodes: DsTreeNode[] }) =>
	createTreeCollection<DsTreeNode>({
		nodeToValue: (node) => node.id,
		nodeToString: (node) => node.name,
		rootNode: { id: 'ROOT', name: '', children: nodes },
	});
