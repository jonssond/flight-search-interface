import { useEffect, useState, useCallback } from 'react';
import { FilterForm } from './components/filter-form/FilterForm';
import { Header } from './components/header/Header';
import { Table } from './components/table/Table';
import { flightsHeaders } from './constants/tableHeader';
import { useFlights } from './hooks/useFlights';
import { formatDateToStringDate } from './utils/formatDate';
import { formatCurrency } from './utils/formatCurrency';
import { Pagination } from './components/pagination/Pagination';
import { FlightFilters } from './types/FlightFilters';

export const App = () => {
  const { fetchGetAllFlights, flights, meta, isLoading } = useFlights();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentFilters, setCurrentFilters] = useState<FlightFilters>({});

  const fetchFlightsOnPage = useCallback(
    (page: number, filters?: FlightFilters) => {
      fetchGetAllFlights(page, itemsPerPage, filters || currentFilters);
    },
    [fetchGetAllFlights, itemsPerPage, currentFilters],
  );

  useEffect(() => {
    fetchFlightsOnPage(currentPage);
  }, [fetchFlightsOnPage, currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleFilter = (filters: FlightFilters) => {
    setCurrentFilters(filters);
    setCurrentPage(1);
    fetchGetAllFlights(1, itemsPerPage, filters);
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
        <Table columns={flightsHeaders} data={tableData} />
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
