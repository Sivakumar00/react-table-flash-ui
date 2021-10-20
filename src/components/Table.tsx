import { PropsWithChildren, ReactElement } from 'react';
import { useResizeColumns, useRowSelect, useSortBy, useTable, Row, HeaderGroup, useFlexLayout } from 'react-table';
import { ITableToggleProps, TableProperties } from '../types';
import '../style/react-table.css';
import IndeterminateCheckbox from '../common/IndeterminateCheckbox';

const Table = <T extends Record<string, unknown>>(props: PropsWithChildren<TableProperties<T>>): ReactElement => {
  // Use the state and functions returned from useTable to build your UI
  const { columns, data, defaultColumn, resize, disableSort, gridHeight, stickyHeader = false } = props;
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
      defaultColumn,
      disableSortBy: disableSort,
    },
    useSortBy,
    useFlexLayout,
    useResizeColumns,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columnData) => [
        // Let's make a column for selection
        {
          id: 'selection',
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllRowsSelectedProps }: ITableToggleProps) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }: { row: Row }): ReactElement => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
          disableSortBy: false,
          disableResizing: true,
          width: 50,
        },
        ...columnData,
      ]);
    },
  );

  const Column = ({ ...column }: HeaderGroup<T>) => (
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
  );

  const Header = () => (
    <>
      {headerGroups.map((headerGroup) => (
        <div {...headerGroup.getHeaderGroupProps()} className="rtw-thead">
          {headerGroup.headers.map((column) => Column(column))}
        </div>
      ))}
    </>
  );

  // Render the UI for your table
  return (
    <div>
      <div {...getTableProps()} className={`rtw-table ${stickyHeader ? 'sticky' : ''}`}>
        {Header()}
        <div {...getTableBodyProps()} style={gridHeight ? { height: gridHeight, overflow: 'auto' } : {}}>
          {rows &&
            rows.map((row) => {
              prepareRow(row);
              return (
                <div {...row?.getRowProps()} className="rtw-tr">
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
