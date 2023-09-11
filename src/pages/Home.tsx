import React, { useEffect, useState } from 'react';
import { getChartData } from '../api/chart';
import { ChartDataType } from '../types';
import styled from 'styled-components';
import ComplexChart from '../components/ComplexChart';

export default function Chart() {
  const [data, setData] = useState<ChartDataType[]>(() => []);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getChartData();
      const dataArray = Object.entries(res).map(([date, value]) => ({ date, value }));
      setData(dataArray);
    };
    fetchData();
  }, []);

  console.log(data);

  return (
    <StyledLayout>
      <ComplexChart chartData={data} />
    </StyledLayout>
  );
}

const StyledLayout = styled.main`
  position: relative;
  margin: auto,
  width: 80vw,
`;
