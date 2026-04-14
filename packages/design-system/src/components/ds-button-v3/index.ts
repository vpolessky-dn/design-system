import { withResponsiveProps } from '../../utils/responsive';
import DsButtonV3Base from './ds-button-v3.tsx';

export const DsButtonV3 = withResponsiveProps(DsButtonV3Base, ['size']);
export * from './ds-button-v3.types.ts';
