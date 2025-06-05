// hooks/useFlights.tsx
import { useCallback, useState } from 'react';
import { Flight, FlightResponse } from '../types/api/Flight';
import { api } from '../services/axios';

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
    async (page: number, limit: number) => {
      setIsLoading(true);
      try {
        const response = await api.get<FlightResponse>(
          `/flights?page=${page}&limit=${limit}`,
        );
        setFlights(response.data.data ?? []);
        setMeta(response.data.meta ?? initialMeta);
      } catch (error) {
        console.error('Error fetching flights:', error);
        setFlights([]);
        setMeta(initialMeta);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  return { fetchGetAllFlights, flights, meta, isLoading };
};
