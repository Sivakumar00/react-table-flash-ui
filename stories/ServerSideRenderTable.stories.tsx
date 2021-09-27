import { ServerSideRenderTable, Table } from '@src/index';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useState } from 'react';
import generateMock, { columns } from './__mocks__/generateMock';

export default {
    title: 'Tables/ServerSideRender Table',
    component: ServerSideRenderTable,
} as ComponentMeta<typeof Table>;



const RenderTable: ComponentStory<typeof Table> = (args) => {
    const count = 40
    const [items, setItems] = useState(generateMock(15));
    const [hasMore, setHasMore] = useState(true);

    const fetchMoreData = () => {
        setTimeout(() => {
            setItems(items.concat(generateMock(5)));
            if (items.length >= 40) {
                setHasMore(false)
            }
        }, 500);
    };

    const data = items;

    return <ServerSideRenderTable columns={columns} data={data} fetchNextItem={fetchMoreData} hasNext={hasMore} totalCount={count} />;

}

export const ServerSideRender = RenderTable.bind({});
