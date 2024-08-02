import { BrapiRequest, BrapiResponse } from '@/interface/brapi';
import axios, { AxiosError } from 'axios';

async function fetchBrapiData({
  sortBy,
  sortOrder,
  limit,
  type,
  sector,
}: BrapiRequest): Promise<BrapiResponse> {
  try {
    const BASE_URL = 'https://brapi.dev/api';
    const API_KEY = '';

    const params = {
      sortBy,
      sortOrder,
      limit,
      type,
      sector,
      apiKey: API_KEY,
    };

    const response = await axios.get(`${BASE_URL}/quote/list`, { params });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      'Error fetching Brapi data:',
      axiosError.response ? axiosError.response.data : axiosError.message,
      'Status code:',
      axiosError.response ? axiosError.response.status : 'N/A'
    );
    throw new Error(`Failed to fetch Brapi data: ${axiosError.message}`);
  }
}

export default fetchBrapiData;
