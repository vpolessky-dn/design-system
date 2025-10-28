# DS Filter Modal

A specialized modal component for filtering data, based on the DAP Design System 1.2.

## Features

- Built on top of `DsModal` using Ark UI Dialog primitives
- Pre-configured header with "Filters" title and close button
- Side navigation for filter categories
- Footer with "Clear all filters" and "Apply" actions
- Support for active filter counts per category
- Responsive layout with customizable width (column-based)
- Accessible keyboard navigation
- Support for disabled filter categories

## Basic Usage

```tsx
import { DsFilterModal, FilterNavItem } from '@design-system/web';
import { useState } from 'react';

const filterItems: FilterNavItem[] = [
  { id: 'status', label: 'Status', count: 2 },
  { id: 'category', label: 'Category', count: 1 },
  { id: 'version', label: 'Version' },
  { id: 'disabled', label: 'Disabled Option', disabled: true },
];

function MyComponent() {
  const [open, setOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('status');

  return (
    <DsFilterModal
      open={open}
      onOpenChange={setOpen}
      filterNavItems={filterItems}
      selectedFilterId={selectedFilter}
      onFilterSelect={setSelectedFilter}
      onClearAll={() => {
        // Handle clear all filters
      }}
      onApply={() => {
        // Handle apply filters
        setOpen(false);
      }}
    >
      {/* Filter content based on selectedFilter */}
      <div>
        <h3>Filters for: {selectedFilter}</h3>
        {/* Add your filter controls here */}
      </div>
    </DsFilterModal>
  );
}
```

## Props

### DsFilterModalProps

Extends `DsModalProps` with additional filter-specific properties:

| Prop                     | Type                         | Default               | Description                                  |
| ------------------------ | ---------------------------- | --------------------- | -------------------------------------------- |
| `open`                   | `boolean`                    | -                     | Whether the modal is open                    |
| `onOpenChange`           | `(open: boolean) => void`    | -                     | Callback when modal state changes            |
| `filterNavItems`         | `FilterNavItem[]`            | `[]`                  | Array of filter navigation items             |
| `selectedFilterId`       | `string`                     | -                     | Currently selected filter category ID        |
| `onFilterSelect`         | `(filterId: string) => void` | -                     | Callback when filter category is selected    |
| `onClearAll`             | `() => void`                 | -                     | Callback when "Clear all filters" is clicked |
| `onApply`                | `() => void`                 | -                     | Callback when "Apply" is clicked             |
| `children`               | `ReactNode`                  | -                     | Filter content to display                    |
| `applyLabel`             | `string`                     | `"Apply"`             | Label for apply button                       |
| `clearAllLabel`          | `string`                     | `"Clear all filters"` | Label for clear all button                   |
| `applyDisabled`          | `boolean`                    | `false`               | Whether apply button is disabled             |
| `clearAllDisabled`       | `boolean`                    | `false`               | Whether clear all button is disabled         |
| `modal`                  | `boolean`                    | `true`                | Whether to trap focus in modal               |
| `closeOnEscape`          | `boolean`                    | `true`                | Whether to close on Escape key               |
| `closeOnInteractOutside` | `boolean`                    | `false`               | Whether to close on outside click            |

### FilterNavItem

| Property   | Type                 | Description                               |
| ---------- | -------------------- | ----------------------------------------- |
| `id`       | `string`             | Unique identifier for the filter category |
| `label`    | `string`             | Display label for the filter category     |
| `count`    | `number` (optional)  | Number of active filters in this category |
| `disabled` | `boolean` (optional) | Whether this category is disabled         |

## Customization

The filter modal uses the design system's grid with **8 columns** for its width, with:

- **Min-width**: 503px
- **Max-width**: 1840px
- The modal adapts responsively based on content within these constraints

### Custom Button Labels

```tsx
<DsFilterModal
  applyLabel="Apply Filters"
  clearAllLabel="Reset All"
  // ... other props
/>
```

### Disabled States

```tsx
<DsFilterModal
  applyDisabled={!hasChanges}
  clearAllDisabled={!hasActiveFilters}
  // ... other props
/>
```

## Design Reference

Based on Figma Design System 1.2:

- Filter modal header: Title with icon and close button
- Filter nav: Vertical list with selection state, counts, and disabled state
- Filter modal footer: Clear all and Apply buttons

## Accessibility

- Full keyboard navigation support
- Focus management with Ark UI Dialog
- ARIA labels on interactive elements
- Screen reader friendly structure
- Escape key to close (configurable)

## Examples

See `ds-filter-modal.stories.tsx` for interactive examples in Storybook.
