import React, { useEffect, useState } from 'react';
import { getChartData } from '../api/chart';
import { ChartDataType } from '../types';
import styled from 'styled-components';
import ComplexChart from '../components/ComplexChart';
import FilterButton from '../components/FilterButton';

export default function Chart() {
  const [data, setData] = useState<ChartDataType[]>(() => []);
  const [keywords, setKeywords] = useState<string[]>(() => []);

  const addOrRemoveKeyword = (region: string) => {
    if (checkIsClick(region)) {
      setKeywords((prev: string[]) => {
        return prev.filter((item) => item !== region);
      });
    } else {
      setKeywords((prev: string[]) => [...prev, region]);
    }
  };

  const checkIsClick = (region: string) => {
    if (keywords.includes(region)) {
      return true;
    } else {
      return false;
    }
  };

  const resetKeyword = () => {
    setKeywords([]);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await getChartData();
      const dataArray = Object.entries(res).map(([date, value]) => ({ date, value }));
      setData(dataArray);
    };
    fetchData();
  }, []);

  const regionData = Array.from(new Set(data.map((item) => item.value.id)));
  const date = data[0]?.date.slice(0, 10) || '';

  return (
    <StyledLayout>
      <StyledSection>
        <StyledHeader>
          <h1 className='header'>Value of Area and Bar Depends on Regions on {date}</h1>
        </StyledHeader>
        <ComplexChart chartData={data} addOrRemoveKeyword={addOrRemoveKeyword} checkIsClick={checkIsClick} />
      </StyledSection>
      <StyledFilter>
        <FilterButton
          regions={regionData}
          checkIsClick={checkIsClick}
          addOrRemoveKeyword={addOrRemoveKeyword}
          resetKeyword={resetKeyword}
        />
      </StyledFilter>
    </StyledLayout>
  );
}

const StyledLayout = styled.main`
  padding: 100px;
  margin: auto;
`;

const StyledSection = styled.section`
  min-width: 450px;
  border-radius: 15px;
  border: 1px solid var(--color-white70);
  background: var(--color-white20);
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  canvas {
    padding: 10px;
    color: white;
  }
`;

const StyledHeader = styled.div`
  width: 100%;
  .header {
    font-weight: bold;
    text-align: center;
    width: 100%;
    padding: 15px 15px 13px;
    font-size: 1.2rem;
    background: var(--color-white20);
  }
`;

const StyledFilter = styled.section`
  padding: 50px 10px;
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
`;
