export type Flight = {
  id: number;
  flightNumber: string;
  airline: string;
  origin: string;
  destination: string;
  departure: Date;
  arrival: Date;
  price: number;
};

export type FlightResponse = {
  data: Flight[];
  meta: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
};
