export type ChartDataType = {
  [date: string]: DataItem;
};

type DataItem = {
  id: string;
  value_area: number;
  value_bar: number;
};
