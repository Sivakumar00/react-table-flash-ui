import { Table } from '../index';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import generateMock, { columns, defaultColumn } from './__mocks__/generateMock';

export default {
  title: 'Tables/Basic Table',
  component: Table,
} as ComponentMeta<typeof Table>;

const Template: ComponentStory<typeof Table> = (args) => (
  <div style={{ height: '100%', overflow: 'auto' }}>
    <Table data={generateMock(20)} columns={columns} />
  </div>
);
const Resizable: ComponentStory<typeof Table> = (args) => (
  <Table data={generateMock(20)} columns={columns} defaultColumn={defaultColumn} resize={true} />
);
const DisableSort: ComponentStory<typeof Table> = (args) => (
  <Table data={generateMock(20)} columns={columns} defaultColumn={defaultColumn} disableSort={true} resize={true} />
);

const TableStickyHeader: ComponentStory<typeof Table> = (args) => (
  <Table data={generateMock(20)} columns={columns} gridHeight={400} stickyHeader />
);

export const Primary = Template.bind({});
export const ResizableTable = Resizable.bind({});
export const DisableSortTable = DisableSort.bind({});
export const TableWithStickyHeader = TableStickyHeader.bind({});
