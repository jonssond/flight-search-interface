import { useState } from 'react';
import { Button } from '../form/button/Button';
import { DateInput } from '../form/date-input/DateInput';
import { Input } from '../form/input/Input';
import './filter-form.css';

interface FilterFormProps {
  onFilter: (filters: FlightFilters) => void;
}

export interface FlightFilters {
  origin?: string;
  destination?: string;
  departureDate?: string;
  arrivalDate?: string;
}

export const FilterForm = ({ onFilter }: FilterFormProps) => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const filters: FlightFilters = {};
    if (origin) filters.origin = origin;
    if (destination) filters.destination = destination;
    if (departureDate) filters.departureDate = departureDate;
    if (arrivalDate) filters.arrivalDate = arrivalDate;

    onFilter(filters);
  };

  const handleReset = () => {
    setOrigin('');
    setDestination('');
    setDepartureDate('');
    setArrivalDate('');
    onFilter({});
  };

  return (
    <div className="filter-form-container">
      <form onSubmit={handleSubmit} className="filter-form">
        <h1>Busque seus voos!</h1>
        <div className="origin-destination-container">
          <Input
            label="Origem"
            placeholder="Digite a cidade de origem..."
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
          />
          <Input
            label="Destino"
            placeholder="Digite a cidade de destino..."
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>
        <div className="departure-arrival-container">
          <DateInput
            label="Data de Saída"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
          />
          <DateInput
            label="Data de Chegada"
            value={arrivalDate}
            onChange={(e) => setArrivalDate(e.target.value)}
          />
        </div>
        <div className="button-container">
          <Button content="Buscar Voos" type="submit" variant="primary" />
          <Button
            content="Limpar Filtros"
            type="button"
            onClick={handleReset}
            variant="secondary"
          />
        </div>
      </form>
    </div>
  );
};
