export type SortOrder = 'asc' | 'desc' | null;

export type SortConfig = {
  column: string;
  order: SortOrder;
};

export type tableProps = {
  columns: string[];
  data: unknown[][];
  onSort?: (column: string, order: SortOrder) => void;
  sortConfig?: SortConfig;
};
