import { PropsWithChildren, ReactElement } from 'react';
import { TableOptions, useTable } from 'react-table';

export interface TableProperties<T extends Record<string, unknown>> extends TableOptions<T> {
  name?: string;
}

const Table = <T extends Record<string, unknown>>(props: PropsWithChildren<TableProperties<T>>): ReactElement => {
  // Use the state and functions returned from useTable to build your UI
  const { columns, data } = props;
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
