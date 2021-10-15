import { TableOptions } from 'react-table';

export interface IInderminateCheckbox extends HTMLAttributes<Omit<HTMLInputElement, 'type' | 'ref'>> {
  indeterminate?: boolean;
}

export interface TableProperties<T extends Record<string, unknown>> extends TableOptions<T> {
  name?: string;
  resize?: boolean;
  disableSort?: boolean;
  fetchNextItem?: (startIndex: number, endIndex: number) => Promise<void> | void;
  hasNext?: boolean;
  totalCount?: number;
  gridHeight?: number | string;
  stickyHeader?: boolean;
}

export interface ITableToggleProps {
  getToggleAllRowsSelectedProps: (
    props?: Partial<TableToggleAllRowsSelectedProps> | undefined,
  ) => TableToggleAllRowsSelectedProps;
}
