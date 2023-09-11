import Http from './http';
import { DataItemType } from '../types';

const searchHttp = new Http(`${process.env.REACT_APP_DEV_URL}`);

export const getChartData = async (): Promise<{ [date: string]: DataItemType }> => {
  return await searchHttp.get<any>('/response');
};
