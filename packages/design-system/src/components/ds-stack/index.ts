import type { FC } from 'react';

import { withResponsiveProps } from '../../utils/responsive';
import { DsStack as DsStackBase } from './ds-stack';
import type { DsStackProps } from './ds-stack.types';

export const DsStack: FC<DsStackProps> = withResponsiveProps(DsStackBase, [
	'direction',
	'gap',
	'alignItems',
	'justifyContent',
	'flex',
	'flexWrap',
	'width',
]);

export * from './ds-stack.types';
