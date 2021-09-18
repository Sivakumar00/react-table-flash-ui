import { Table } from '@src/index';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import generateMock, { columns, defaultColumn } from './__mocks__/generateMock';

export default {
  title: 'Tables/Basic Table',
  component: Table,
} as ComponentMeta<typeof Table>;



const Template: ComponentStory<typeof Table> = (args) => <Table data={generateMock(20)} columns={columns} />;
const Resizable: ComponentStory<typeof Table> = (args) => <Table data={generateMock(20)} columns={columns} defaultColumn={defaultColumn} resize={true} />;
const DisableSort: ComponentStory<typeof Table> = (args) => <Table data={generateMock(20)} columns={columns} defaultColumn={defaultColumn} disableSort={true} resize={true} />;

export const Primary = Template.bind({});

export const ResizableTable = Resizable.bind({});
export const DisableSortTable = DisableSort.bind({});
