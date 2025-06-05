import { useEffect, useState, useCallback } from 'react';
import { FilterForm } from './components/filter-form/FilterForm';
import { Header } from './components/header/Header';
import { Table } from './components/table/Table';
import { flightsHeaders } from './constants/tableHeader';
import { useFlights } from './hooks/useFlights';
import { formatISODateToLocalDate } from './utils/formatDate';
import { formatCurrency } from './utils/formatCurrency';
import { Pagination } from './components/pagination/Pagination';

export const App = () => {
  const { fetchGetAllFlights, flights, meta, isLoading } = useFlights();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const fetchFlightsOnPage = useCallback(
    (page: number) => {
      fetchGetAllFlights(page, itemsPerPage);
    },
    [fetchGetAllFlights, itemsPerPage],
  );

  useEffect(() => {
    fetchFlightsOnPage(currentPage);
  }, [fetchFlightsOnPage, currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // const handleItemsPerPageChange = (newLimit: number) => {
  //   setItemsPerPage(newLimit);
  //   setCurrentPage(1); // Resetar para a primeira página ao mudar o limite
  //   fetchGetAllFlights(1, newLimit);
  // };

  const tableData = flights.map((flight) => {
    return [
      flight.flightNumber,
      flight.airline,
      flight.origin,
      flight.destination,
      formatISODateToLocalDate(new Date(flight.departure)),
      formatISODateToLocalDate(new Date(flight.arrival)),
      formatCurrency(flight.price),
      flight.id,
    ];
  });

  return (
    <div className="App">
      <div className="main-container">
        <Header />
        <FilterForm />{' '}
        {/* Você pode querer que o filtro resete a paginação para 1 */}
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
          itemsPerPage={meta.itemsPerPage}
          totalItems={meta.totalItems}
        />
      )}
    </div>
  );
};
