import React from 'react';
import { styled } from 'styled-components';

interface FilterButtonProps {
  regions: string[];
  addOrRemoveKeyword: (region: string) => void;
  resetKeyword: React.MouseEventHandler<HTMLButtonElement>;
  checkIsClick: (region: string) => boolean;
}

export default function FilterButton({ regions, addOrRemoveKeyword, resetKeyword, checkIsClick }: FilterButtonProps) {
  const handleAddKeyword = (event: React.MouseEvent<HTMLButtonElement>) => {
    const keyword = (event.target as HTMLElement).textContent;
    if (keyword) {
      addOrRemoveKeyword((event.target as HTMLElement).textContent || '');
    }
  };

  return (
    <>
      <StyledButton onClick={resetKeyword} isClick={false}>
        해제
      </StyledButton>
      {regions.map((region: string) => {
        return (
          <StyledButton onClick={handleAddKeyword} isClick={checkIsClick(region)}>
            {region}
          </StyledButton>
        );
      })}
    </>
  );
}

interface StyledButtonProps {
  isClick: boolean;
}

const StyledButton = styled.button<StyledButtonProps>`
  min-width: 100px;
  border-radius: 50px;
  border: 1px solid white;
  background: ${(props) => (props.isClick ? 'var(--color-white70)' : 'var(--color-white20)')};
  color: ${(props) => (props.isClick ? 'var(--color-skyblue)' : 'white')};
  font-size: 15px;
  padding: 10px;
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.25);
  text-align: center;
  transition: all 0.5s ease-out;
  &:hover {
    background: var(--color-white70);
    color: var(--color-skyblue);
  }
`;
