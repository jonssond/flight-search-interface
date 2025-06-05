import { useEffect, useState, useCallback } from 'react';
import { FilterForm, FlightFilters } from './components/filter-form/FilterForm';
import { Header } from './components/header/Header';
import { Table } from './components/table/Table';
import { StarButton } from './components/star-button/StarButton';
import { SortConfig, SortOrder } from './components/table/types';
import { flightsHeaders } from './constants/tableHeader';
import { useFlights } from './hooks/useFlights';
import { useFavorites } from './contexts/FavoritesContext';
import { formatDateToStringDate } from './utils/formatDate';
import { formatCurrency } from './utils/formatCurrency';
import { Pagination } from './components/pagination/Pagination';
import './styles/global.css';

const COLUMN_MAPPING: { [key: string]: string } = {
  'Nº Voo': 'flightNumber',
  Companhia: 'airline',
  Origem: 'origin',
  Destino: 'destination',
  Saída: 'departure',
  Chegada: 'arrival',
  Valor: 'price',
};

export const App = () => {
  const { fetchGetAllFlights, flights, meta, isLoading } = useFlights();
  const { favorites } = useFavorites();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentFilters, setCurrentFilters] = useState<FlightFilters>({});
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    column: '',
    order: null,
  });
  const [showingFavorites, setShowingFavorites] = useState(false);

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
    if (!showingFavorites) {
      const sortBy = sortConfig.order
        ? COLUMN_MAPPING[sortConfig.column]
        : undefined;
      fetchFlightsOnPage(
        currentPage,
        currentFilters,
        sortBy,
        sortConfig.order || undefined,
      );
    }
  }, [fetchFlightsOnPage, currentPage, sortConfig, showingFavorites]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleFilter = (filters: FlightFilters) => {
    setCurrentFilters(filters);
    setCurrentPage(1);
    setShowingFavorites(false);
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

  const handleFavoritesClick = () => {
    setShowingFavorites(!showingFavorites);
    setCurrentPage(1);
    setCurrentFilters({});
  };

  const displayedFlights = showingFavorites
    ? flights.filter((flight) => favorites.has(flight.id.toString()))
    : flights;

  const tableData = displayedFlights.map((flight) => {
    return [
      flight.flightNumber,
      flight.airline,
      flight.origin,
      flight.destination,
      formatDateToStringDate(new Date(flight.departure)),
      formatDateToStringDate(new Date(flight.arrival)),
      formatCurrency(flight.price),
      <StarButton key={flight.id} flightId={flight.id.toString()} />,
    ];
  });

  return (
    <div className="App">
      <div className="main-container">
        <Header
          onFavoritesClick={handleFavoritesClick}
          showingFavorites={showingFavorites}
        />
        {!showingFavorites && <FilterForm onFilter={handleFilter} />}
      </div>

      {showingFavorites && (
        <div
          style={{
            textAlign: 'center',
            padding: '20px',
            fontSize: '18px',
            fontWeight: 'bold',
          }}
        >
          Mostrando apenas voos favoritos ({displayedFlights.length} voos)
        </div>
      )}

      {isLoading && (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          Carregando voos...
        </div>
      )}

      {!isLoading &&
        displayedFlights.length === 0 &&
        !showingFavorites &&
        meta.totalItems === 0 && (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            Nenhum voo encontrado.
          </div>
        )}

      {!isLoading && displayedFlights.length === 0 && showingFavorites && (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          Nenhum voo favoritado ainda.
        </div>
      )}

      {!isLoading && displayedFlights.length > 0 && (
        <Table
          columns={flightsHeaders}
          data={tableData}
          onSort={!showingFavorites ? handleSort : undefined}
          sortConfig={!showingFavorites ? sortConfig : undefined}
        />
      )}

      {!isLoading && !showingFavorites && meta.totalPages > 1 && (
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
