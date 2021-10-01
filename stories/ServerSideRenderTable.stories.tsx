import { ServerSideRenderTable, Table } from '@src/index';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useState } from 'react';
import generateMock, { columns } from './__mocks__/generateMock';

export default {
  title: 'Tables/ServerSideRender Table',
  component: ServerSideRenderTable,
} as ComponentMeta<typeof Table>;

const RenderTable: ComponentStory<typeof Table> = (args) => {
  const count = 60;
  const [items, setItems] = useState(generateMock(20));
  const [hasMore, setHasMore] = useState(true);
  const gridHeight = '440px';

  const fetchMoreData = () => {
    setTimeout(() => {
      setItems(items.concat(generateMock(15)));
      if (items.length >= 60) {
        setHasMore(false);
      }
    }, 500);
  };

  const data = items;

  return (
    <ServerSideRenderTable
      columns={columns}
      data={data}
      fetchNextItem={fetchMoreData}
      hasNext={hasMore}
      totalCount={count}
      gridHeight={gridHeight}
    />
  );
};

const ResizeServerTable: ComponentStory<typeof Table> = (args) => {
  const count = 60;
  const [items, setItems] = useState(generateMock(20));
  const [hasMore, setHasMore] = useState(true);
  const gridHeight = '440px';

  const fetchMoreData = () => {
    setTimeout(() => {
      setItems(items.concat(generateMock(15)));
      if (items.length >= 60) {
        setHasMore(false);
      }
    }, 500);
  };

  const data = items;

  return (
    <ServerSideRenderTable
      columns={columns}
      data={data}
      fetchNextItem={fetchMoreData}
      hasNext={hasMore}
      totalCount={count}
      gridHeight={gridHeight}
      resize={true}
    />
  );
};

export const ServerSideRender = RenderTable.bind({});
export const ResizableServerTable = ResizeServerTable.bind({});
