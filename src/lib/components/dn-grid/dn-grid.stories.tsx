import type { Meta, StoryObj } from '@storybook/react';
import { DNGrid, DNGridItem } from '@drivenets/web';

const meta = {
  title: 'Components/Grid',
  component: DNGrid,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'The content to be rendered inside the grid',
    },
    rows: {
      control: 'select',
      description: 'Number of rows in the grid. Can be 2, 4, 6, or 8. Defaults to 8 if not specified.',
      options: [2, 4, 6, 8],
    },
    className: {
      control: 'text',
      description: 'Custom class names to apply to the grid container',
    },
  },
} satisfies Meta<typeof DNGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * DNGridItem Props:
 * - children: The content to be rendered inside the grid item
 * - colSpan: Number of columns the item spans (1-12 or 'full')
 * - colStart: Starting column for the item (1-11)
 * - rowSpan: Number of rows the item spans (1-8 or 'full')
 * - rowStart: Starting row for the item (1-7)
 * - className: Custom class names to apply to the grid item
 */

export const Default: Story = {
  args: {
    children: (
      <>
        <DNGridItem colSpan={4}>
          <div>Element 1</div>
        </DNGridItem>
        <DNGridItem colSpan={4} rowSpan={2}>
          <div>Element 2</div>
        </DNGridItem>
        <DNGridItem colSpan={4} rowSpan={2}>
          <div>Element 3</div>
        </DNGridItem>
        <DNGridItem colSpan={4} rowSpan={2}>
          <div>Element 4</div>
        </DNGridItem>
      </>
    ),
    rows: 6,
  },
};
