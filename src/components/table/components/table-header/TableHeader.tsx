import { tableHeaderProps } from './types';

export const TableHeader = (props: tableHeaderProps) => {
  return (
    <div className="table-header-row">
      {props.columns.map((column, index) => (
        <div key={index} className="table-cell">
          {column}
        </div>
      ))}
    </div>
  );
};
