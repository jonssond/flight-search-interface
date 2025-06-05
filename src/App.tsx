import { useEffect, useState, useCallback } from 'react';
import { FilterForm, FlightFilters } from './components/filter-form/FilterForm';
import { Header } from './components/header/Header';
import { Table } from './components/table/Table';
import { SortConfig, SortOrder } from './components/table/types';
import { flightsHeaders } from './constants/tableHeader';
import { useFlights } from './hooks/useFlights';
import { formatDateToStringDate } from './utils/formatDate';
import { formatCurrency } from './utils/formatCurrency';
import { Pagination } from './components/pagination/Pagination';

const COLUMN_MAPPING: { [key: string]: string } = {
  'Nº Vôo': 'flightNumber',
  Companhia: 'airline',
  Origem: 'origin',
  Destino: 'destination',
  Saída: 'departure',
  Chegada: 'arrival',
  Valor: 'price',
};

export const App = () => {
  const { fetchGetAllFlights, flights, meta, isLoading } = useFlights();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentFilters, setCurrentFilters] = useState<FlightFilters>({});
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    column: '',
    order: null,
  });

  const fetchFlightsOnPage = useCallback(
    (
      page: number,
      filters?: FlightFilters,
      sortBy?: string,
      sortOrder?: 'asc' | 'desc',
    ) => {
      fetchGetAllFlights(
        page,
        itemsPerPage,
        filters || currentFilters,
        sortBy,
        sortOrder,
      );
    },
    [fetchGetAllFlights, itemsPerPage, currentFilters],
  );

  useEffect(() => {
    const sortBy = sortConfig.order
      ? COLUMN_MAPPING[sortConfig.column]
      : undefined;
    fetchFlightsOnPage(
      currentPage,
      currentFilters,
      sortBy,
      sortConfig.order || undefined,
    );
  }, [fetchFlightsOnPage, currentPage, sortConfig]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleFilter = (filters: FlightFilters) => {
    setCurrentFilters(filters);
    setCurrentPage(1);
    const sortBy = sortConfig.order
      ? COLUMN_MAPPING[sortConfig.column]
      : undefined;
    fetchGetAllFlights(
      1,
      itemsPerPage,
      filters,
      sortBy,
      sortConfig.order || undefined,
    );
  };

  const handleSort = (column: string, order: SortOrder) => {
    setSortConfig({ column, order });
    setCurrentPage(1);
  };

  const tableData = flights.map((flight) => {
    return [
      flight.flightNumber,
      flight.airline,
      flight.origin,
      flight.destination,
      formatDateToStringDate(new Date(flight.departure)),
      formatDateToStringDate(new Date(flight.arrival)),
      formatCurrency(flight.price),
      flight.id,
    ];
  });

  return (
    <div className="App">
      <div className="main-container">
        <Header />
        <FilterForm onFilter={handleFilter} />
      </div>
      {isLoading && (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          Carregando voos...
        </div>
      )}
      {!isLoading && flights.length === 0 && meta.totalItems === 0 && (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          Nenhum voo encontrado.
        </div>
      )}
      {!isLoading && flights.length > 0 && (
        <Table
          columns={flightsHeaders}
          data={tableData}
          onSort={handleSort}
          sortConfig={sortConfig}
        />
      )}
      {!isLoading && meta.totalPages > 1 && (
        <Pagination
          currentPage={meta.currentPage}
          totalPages={meta.totalPages}
          onPageChange={handlePageChange}
          itemsPerPage={itemsPerPage}
          totalItems={meta.totalItems}
        />
      )}
    </div>
  );
};
