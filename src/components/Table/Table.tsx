import { PropsWithChildren, ReactElement } from 'react';
import { TableOptions, useBlockLayout, useResizeColumns, useTable } from 'react-table';
import { CSSProperties } from 'styled-components';
import '../../style/react-table.css';

export interface TableProperties<T extends Record<string, unknown>> extends TableOptions<T> {
  name?: string;
  headerStyle?: CSSProperties;
}

const Table = <T extends Record<string, unknown>>(props: PropsWithChildren<TableProperties<T>>): ReactElement => {
  // Use the state and functions returned from useTable to build your UI
  const { columns, data } = props;
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
    },
    useBlockLayout,
    useResizeColumns,
  );

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
                </div>
              ))}
            </div>
          ))}
        </div>

        <div {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <div {...row.getRowProps()} className="rtw-tr">
                {row.cells.map((cell) => (
                  <div {...cell.getCellProps()} className="rtw-td">
                    {cell.render('Cell')}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Table;
