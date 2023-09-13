import Http from './http';
import { DataItemType } from '../types';

const BASE_URL =
  process.env.NODE_ENV === 'production' ? process.env.REACT_APP_DEPLOY_URL : process.env.REACT_APP_DEV_URL;
const searchHttp = new Http(BASE_URL || '');

export const getChartData = async (): Promise<{ [date: string]: DataItemType }> => {
  return await searchHttp.get<any>('/response');
};
