import { useTable, useSortBy, TableOptions, useResizeColumns, useFlexLayout } from 'react-table';
import InfiniteLoader from 'react-window-infinite-loader';
import { useSticky } from 'react-table-sticky';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { PropsWithChildren, ReactElement } from 'react';

export interface ServerTableProperties<T extends Record<string, unknown>> extends TableOptions<T> {
  name?: string;
  resize?: boolean;
  disableSort?: boolean;
  fetchNextItem: (startIndex: number, endIndex: number) => Promise<void> | void;
  hasNext: boolean;
  totalCount: number;
  gridHeight: string;
}

const ServerSideRenderTable = <T extends Record<string, unknown>>(
  props: PropsWithChildren<ServerTableProperties<T>>,
): ReactElement => {
  // Use the state and functions returned from useTable to build your UI
  const { columns, fetchNextItem, hasNext, data, totalCount, gridHeight, resize } = props;
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
    },
    useSortBy,
    useFlexLayout,
    useResizeColumns,
    useSticky,
  );

  const RenderRow = ({ index, style }: ListChildComponentProps): JSX.Element => {
    const row = rows[index];
    if (row) {
      prepareRow(row);
      return (
        <div
          {...row?.getRowProps({
            style,
          })}
          className="rtw-tr"
        >
          {row.cells.map((cell) => (
            <div {...cell.getCellProps()} className="rtw-td">
              {cell.render('Cell')}
            </div>
          ))}
        </div>
      );
    }
    return (
      <div style={style} key={index} className="flex items-center my-1">
        loading
      </div>
    );
  };

  const isItemLoaded = () => !hasNext;
  // Render the UI for your table
  return (
    <div {...getTableProps()} className="rtw-table sticky">
      <div className="rtw-header">
        {headerGroups.map((headerGroup) => (
          <div {...headerGroup.getHeaderGroupProps()} className="rtw-thead">
            {headerGroup.headers.map((column) => (
              <div {...column.getHeaderProps(column.getSortByToggleProps())} className="rtw-th">
                {column.render('Header')}
                {column.isSorted && (
                  <span className="rwt-sortIcon">{column.isSorted ? (column.isSortedDesc ? '↓' : '↑') : ''}</span>
                )}
                {resize && (
                  <div
                    {...(column.canResize ? column.getResizerProps() : {})}
                    className={`${column.canResize ? 'rtw-resizer' : ''}`}
                  />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div {...getTableBodyProps()} className="rtw-table-body" style={{ height: gridHeight }}>
        {rows?.length ? (
          <AutoSizer>
            {({ width, height }) => (
              <InfiniteLoader isItemLoaded={isItemLoaded} itemCount={totalCount} loadMoreItems={fetchNextItem}>
                {({ onItemsRendered, ref }) => (
                  <FixedSizeList
                    className="p-1 px-4 overflow-x-hidden bg-neutral-100"
                    style={{ overflowX: 'hidden' }}
                    height={height}
                    width={width}
                    itemCount={totalCount}
                    itemSize={35}
                    onItemsRendered={onItemsRendered}
                    ref={ref}
                  >
                    {RenderRow}
                  </FixedSizeList>
                )}
              </InfiniteLoader>
            )}
          </AutoSizer>
        ) : null}
      </div>
    </div>
  );
};

export default ServerSideRenderTable;
