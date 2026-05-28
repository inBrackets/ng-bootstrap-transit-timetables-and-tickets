export type TransportType = 'train' | 'flight' | 'bus';

export interface Train {
  id: string;
  from: string;
  to: string;
  departure: string;
  arrival: string;
  price: number;
  seats: number;
  operator: string;
  trainNumber: string;
}

export interface Flight {
  id: string;
  from: string;
  fromCode: string;
  to: string;
  toCode: string;
  departure: string;
  arrival: string;
  price: number;
  seats: number;
  airline: string;
  flightNumber: string;
}

export interface Bus {
  id: string;
  from: string;
  to: string;
  departure: string;
  arrival: string;
  price: number;
  seats: number;
  operator: string;
  busNumber: string;
}

export interface BasketItem {
  id: string;
  type: TransportType;
  itemId: string;
  from: string;
  to: string;
  departure: string;
  arrival: string;
  price: number;
  label: string;
  addedAt: string;
}
