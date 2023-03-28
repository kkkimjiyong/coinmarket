import React, { useState, useEffect } from "react";
import styled from "styled-components";

export const Item = ({ el, usdt }: { el: any; usdt: any }) => {
  const [per, setPer] = useState<number>(0);
  const [color, setColor] = useState<string>("#000");
  useEffect(() => {
    if (el.upbit > el.binance) {
      setPer(((el.upbit - el.binance) / el.binance) * 100);
      setColor("#ff0000");
    } else {
      setPer(((el.binance - el.upbit) / el.binance) * 100);
      setColor("#000");
    }
  }, [el]);

  return (
    <StyledContainer>
      <StyledItemBox>{el?.name}</StyledItemBox>
      <StyledItemBox>{~~(el.binance * usdt)}</StyledItemBox>
      <StyledItemBox> {el?.upbit}</StyledItemBox>
      <StyledItemBox>{el?.upbit - ~~(el.binance * usdt)}</StyledItemBox>
      <StyledItemBox>per</StyledItemBox>
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
