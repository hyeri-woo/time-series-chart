import { ChartDataType } from '../types';
import http from './http';

export async function getChartData(): Promise<ChartDataType[]> {
  const response = await http.request({ method: 'GET', url: '/response' });
  return response;
}

export {};
