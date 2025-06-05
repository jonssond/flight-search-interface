// hooks/useFlights.tsx
import { useCallback, useState } from 'react';
import { Flight, FlightResponse } from '../types/api/Flight';
import { api } from '../services/axios';
import { FlightFilters } from '../types/FlightFilters';

type PaginationMeta = FlightResponse['meta'];

const initialMeta: PaginationMeta = {
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
  itemsPerPage: 10,
};

export const useFlights = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [meta, setMeta] = useState<PaginationMeta>(initialMeta);
  const [isLoading, setIsLoading] = useState(false);

  const fetchGetAllFlights = useCallback(
    async (page = 1, limit = 10, filters?: FlightFilters) => {
      setIsLoading(true);
      try {
        const queryParams = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        });

        if (filters?.origin) queryParams.append('origin', filters.origin);
        if (filters?.destination)
          queryParams.append('destination', filters.destination);
        if (filters?.departureDate)
          queryParams.append('departureDate', filters.departureDate);
        if (filters?.arrivalDate)
          queryParams.append('arrivalDate', filters.arrivalDate);

        const response = await api.get(`/flights?${queryParams}`);
        const data = await response.data;

        setFlights(data.flights);
        setMeta(data.meta);
      } catch (error) {
        console.error('Error fetching flights:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  return {
    fetchGetAllFlights,
    flights,
    meta,
    isLoading,
  };
};
