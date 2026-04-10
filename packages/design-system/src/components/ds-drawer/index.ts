import type { FunctionComponent } from 'react';
import { withResponsiveProps } from '../../utils/responsive';
import DsDrawerBase from './ds-drawer';
import type { DsDrawerProps } from './ds-drawer.types';

const DsDrawerResponsive: FunctionComponent<DsDrawerProps> = withResponsiveProps(DsDrawerBase, ['width']);

export const DsDrawer = Object.assign(DsDrawerResponsive, {
	Header: DsDrawerBase.Header,
	Title: DsDrawerBase.Title,
	CloseTrigger: DsDrawerBase.CloseTrigger,
	Toolbar: DsDrawerBase.Toolbar,
	Body: DsDrawerBase.Body,
	Footer: DsDrawerBase.Footer,
	Actions: DsDrawerBase.Actions,
});

export type { DsDrawerProps, DsDrawerBaseProps, DsDrawerPosition } from './ds-drawer.types';
