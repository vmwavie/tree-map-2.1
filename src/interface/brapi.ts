/* eslint-disable camelcase */
interface BrapiRequest {
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  limit: number;
  type: string;
  sector: string;
}

interface Index {
  stock: string;
  name: string;
}

interface Stock {
  stock: string;
  name: string;
  close: number;
  change: number;
  volume: number;
  market_cap: number;
  logo: string;
  sector: string;
  type: string;
}

interface BrapiResponse {
  indexes: Index[];
  stocks: Stock[];
  availableSectors: string[];
  availableStockTypes: string[];
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalCount: number;
  hasNextPage: boolean;
}

export { BrapiRequest, BrapiResponse };
