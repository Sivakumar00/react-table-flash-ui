import { VirtualizedRowTable, Table } from '../index';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import generateMock, { columns, defaultColumn } from './__mocks__/generateMock';

export default {
  title: 'Tables/VirtualizedRow Table',
  component: VirtualizedRowTable,
} as ComponentMeta<typeof Table>;

const row = generateMock(10000);

const RenderTable: ComponentStory<typeof Table> = (args) => <VirtualizedRowTable data={row} columns={columns} />;
const Resizable: ComponentStory<typeof Table> = (args) => (
  <VirtualizedRowTable data={row} columns={columns} defaultColumn={defaultColumn} resize={true} />
);

export const VirtualRow = RenderTable.bind({});
export const ResizableVirtualRow = Resizable.bind({});
