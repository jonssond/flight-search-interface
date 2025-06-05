import { TableHeader } from './components/table-header/TableHeader';
import './styles/table.css';
import { tableProps } from './types';

export const Table = (props: tableProps) => {
  const { columns, data, onSort, sortConfig } = props;

  return (
    <div className="table-container">
      <TableHeader columns={columns} onSort={onSort} sortConfig={sortConfig} />
      <div className="table-body">
        {data.map((row, index) => (
          <div key={index} className="table-row">
            {row.map((cell, index) => (
              <div key={index} className="table-cell">
                {cell as React.ReactNode}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
