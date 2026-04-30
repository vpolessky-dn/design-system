export const semanticColors = [
	'main',
	'secondary',
	'action',
	'action-hover',
	'action-secondary',
	'action-secondary-hover',
	'disabled',
	'light-disabled',
	'on-action',
	'on-disabled',
	'placeholder',
	'highlight',
	'success',
	'warning',
	'error',
	'code',
] as const;

export type SemanticColor = (typeof semanticColors)[number];

const semanticColorSet = new Set<string>(semanticColors);

/**
 * Resolves a color value: semantic names map to `--font-*` CSS variables,
 * raw CSS values (hex, rgb, hsl, var()) pass through unchanged.
 */
export const resolveColor = (color: string): string =>
	semanticColorSet.has(color) ? `var(--font-${color})` : color;
