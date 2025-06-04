import { useCallback, useState } from 'react';
import { Flight } from '../types/api/Flight';
import { api } from '../services/axios';
import { Response } from '../types/api/Response';

export const useFlights = () => {
  const [flights, setFlights] = useState<Flight[]>([]);

  const fetchGetAllFlights = useCallback(async () => {
    const response = await api.get<Flight[]>('/flights');
    setFlights(response.data ?? []);
  }, []);

  return { fetchGetAllFlights, flights };
};
