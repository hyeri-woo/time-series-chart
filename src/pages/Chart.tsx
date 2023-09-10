import React, { useEffect, useState } from 'react';
import { getChartData } from '../api/chart';
import { ChartDataType } from '../types';
import styled from 'styled-components';

export default function Chart() {
  const [data, setData] = useState<ChartDataType[]>(() => []);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getChartData();
      setData(res);
    };
    fetchData();
  }, []);

  console.log(data);

  return (
    <StyledLayout>
      <canvas id='chart'></canvas>
    </StyledLayout>
  );
}

const StyledLayout = styled.main``;
