import React from "react";
import styled from "styled-components";

export const Item = ({ el }: { el: any }) => {
  return (
    <StyledContainer>
      <StyledItemBox>{el?.name}</StyledItemBox>
      <StyledItemBox>{el.binance}</StyledItemBox>
      <StyledItemBox>{el?.upbit}</StyledItemBox>
      <StyledItemBox>시세차이</StyledItemBox>
      <StyledItemBox>퍼센티지</StyledItemBox>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  margin: 20px auto 0 auto;
  width: 90%;
  height: 50px;
  background-color: #626684;
  border-radius: 10px;
  display: flex;
`;

const StyledItemBox = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: start;
  flex: 1;
`;
