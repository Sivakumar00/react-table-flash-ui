import { Table } from '@src/index';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import generateMock, { columns } from './__mocks__/generateMock';

export default {
  title: 'Tables/Basic Table',
  component: Table,
} as ComponentMeta<typeof Table>;

const headerStyle = {
  borderBottom: 'solid 3px blue',
  background: 'green',
  color: 'white',
  fontWeight: 500,
}


const Template: ComponentStory<typeof Table> = (args) => <Table data={generateMock(20)} columns={columns} headerStyle={headerStyle} />;

export const Primary = Template.bind({});
