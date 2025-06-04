import { useEffect } from 'react';
import { FilterForm } from './components/filter-form/FilterForm';
import { Header } from './components/header/Header';
import { Table } from './components/table/Table';
import { flightsHeaders } from './constants/tableHeader';
import { useFlights } from './hooks/useFlights';

export const App = () => {
  const { fetchGetAllFlights, flights } = useFlights();

  useEffect(() => {
    fetchGetAllFlights();
  }, [fetchGetAllFlights]);

  console.log(flights);
  const tableData = flights.map((flight) => {
    return [
      flight.flightNumber,
      flight.airline,
      flight.origin,
      flight.destination,
      flight.departure,
      flight.arrival,
      flight.price,
      flight.id,
    ];
  });

  return (
    <div className="App">
      <div className="main-container">
        <Header />
        <FilterForm />
      </div>
      <Table columns={flightsHeaders} data={tableData} />
    </div>
  );
};
