import { useState, useEffect, useRef, type CSSProperties } from 'react';
import classNames from 'classnames';
import { useTabsContext } from '../../context/ds-tabs-context';
import type { DsTabsIndicatorProps } from './ds-tabs-indicator.types';
import styles from './ds-tabs-indicator.module.scss';

export const DsTabsIndicator = ({ className, style }: DsTabsIndicatorProps) => {
	const { orientation, currentValue, size } = useTabsContext();
	const [indicatorStyle, setIndicatorStyle] = useState<CSSProperties>({});
	const indicatorRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// Calculates and updates indicator position/size to match the currently selected tab
		const updateIndicator = () => {
			const tabsList = indicatorRef.current?.parentElement;
			if (!tabsList) {
				return;
			}

			// Find the tab button with aria-selected="true" (the currently active tab)
			const selectedTrigger = tabsList.querySelector('button[aria-selected="true"]');

			if (selectedTrigger) {
				// Get bounding rectangles to calculate relative positions
				const tabsListRect = tabsList.getBoundingClientRect();
				const triggerRect = selectedTrigger.getBoundingClientRect();

				if (orientation === 'horizontal') {
					// For horizontal tabs: position indicator below the selected tab with matching width
					const left = triggerRect.left - tabsListRect.left;
					const width = triggerRect.width;
					setIndicatorStyle({
						left: `${left.toString()}px`,
						width: `${width.toString()}px`,
						transform: 'none',
					});
				} else {
					// For vertical tabs: position indicator to the right of selected tab with matching height
					const top = triggerRect.top - tabsListRect.top;
					const height = triggerRect.height;
					setIndicatorStyle({
						top: `${top.toString()}px`,
						height: `${height.toString()}px`,
						transform: 'none',
					});
				}
			}
		};

		// Run initial position calculation
		updateIndicator();

		const tabsList = indicatorRef.current?.parentElement;
		if (!tabsList) {
			return;
		}

		// MutationObserver: watches for aria-selected changes (tab selection) and DOM mutations (tabs added/removed)
		const observer = new MutationObserver(updateIndicator);
		observer.observe(tabsList, {
			attributes: true,
			attributeFilter: ['aria-selected'],
			childList: true,
			characterData: true,
			subtree: true,
		});

		// ResizeObserver: watches for size changes (window resize, tab content changes, layout shifts)
		const resizeObserver = new ResizeObserver(updateIndicator);
		resizeObserver.observe(tabsList);

		// requestAnimationFrame: schedules update after browser layout is complete to prevent flickering
		const frameId = requestAnimationFrame(updateIndicator);

		// Cleanup: disconnect observers and cancel animation frame on unmount to prevent memory leaks
		return () => {
			observer.disconnect();
			resizeObserver.disconnect();
			cancelAnimationFrame(frameId);
		};
	}, [orientation, currentValue, size]);

	return (
		<div
			ref={indicatorRef}
			className={classNames(styles.indicator, styles[`indicator-${orientation}`], className)}
			style={{ ...indicatorStyle, ...style }}
		/>
	);
};
