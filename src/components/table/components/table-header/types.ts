import { SortConfig, SortOrder } from '../../types';

export type tableHeaderProps = {
  columns: string[];
  onSort?: (column: string, order: SortOrder) => void;
  sortConfig?: SortConfig;
};
