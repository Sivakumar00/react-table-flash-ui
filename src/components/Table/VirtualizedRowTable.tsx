import { PropsWithChildren, ReactElement, useMemo } from 'react';
import { TableOptions, useBlockLayout, useResizeColumns, useTable } from 'react-table';
import '../../style/react-table.css';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { scrollbarWidth } from '@src/utils/Utils';

export interface TableProperties<T extends Record<string, unknown>> extends TableOptions<T> {
  name?: string;
  resize?: boolean;
  disableSort?: boolean;
}

const VirtualizedRowTable = <T extends Record<string, unknown>>(
  props: PropsWithChildren<TableProperties<T>>,
): ReactElement => {
  // Use the state and functions returned from useTable to build your UI
  const { columns, data, resize, defaultColumn } = props;

  const scrollBarSize: number = useMemo(() => scrollbarWidth(), []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, totalColumnsWidth, prepareRow } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useBlockLayout,
    useResizeColumns,
  );

  const RenderRow = ({ index, style }: ListChildComponentProps): JSX.Element => {
    const row = rows[index];
    if (row) {
      prepareRow(row);
      return (
        <div
          {...row.getRowProps({
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
        Loading
      </div>
    );
  };

  // Render the UI for your table
  return (
    <div>
      <div {...getTableProps()} className="rtw-table">
        <div>
          {headerGroups.map((headerGroup) => (
            <div {...headerGroup.getHeaderGroupProps()} className="rtw-thead">
              {headerGroup.headers.map((column) => (
                <div {...column.getHeaderProps()} className="rtw-th">
                  {column.render('Header')}
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

        <div {...getTableBodyProps()}>
          <FixedSizeList height={400} itemCount={rows.length} itemSize={35} width={totalColumnsWidth + scrollBarSize}>
            {RenderRow}
          </FixedSizeList>
        </div>
      </div>
    </div>
  );
};

export default VirtualizedRowTable;
