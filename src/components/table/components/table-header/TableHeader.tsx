import { tableHeaderProps } from './types';

export const TableHeader = (props: tableHeaderProps) => {
  const { columns, onSort, sortConfig } = props;

  const handleSort = (column: string, index: number) => {
    // Don't sort the last column (Favorites)
    if (index === columns.length - 1) return;

    if (!onSort) return;

    let newOrder: 'asc' | 'desc' | null = 'asc';

    if (sortConfig?.column === column) {
      if (sortConfig.order === 'asc') {
        newOrder = 'desc';
      } else if (sortConfig.order === 'desc') {
        newOrder = null;
      }
    }

    onSort(column, newOrder);
  };

  const getSortIcon = (column: string, index: number) => {
    // Don't show sort icon for last column (Favorites)
    if (index === columns.length - 1) return null;

    if (sortConfig?.column !== column) {
      return <span className="sort-icon">↕️</span>;
    }

    if (sortConfig.order === 'asc') {
      return <span className="sort-icon active">↑</span>;
    } else if (sortConfig.order === 'desc') {
      return <span className="sort-icon active">↓</span>;
    }

    return <span className="sort-icon">↕️</span>;
  };

  return (
    <div className="table-header-row">
      {columns.map((column, index) => (
        <div
          key={index}
          className={`table-cell ${index !== columns.length - 1 ? 'sortable' : ''}`}
          onClick={() => handleSort(column, index)}
        >
          {column}
          {getSortIcon(column, index)}
        </div>
      ))}
    </div>
  );
};
