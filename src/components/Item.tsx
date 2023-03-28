import React, { useState, useEffect } from "react";
import styled from "styled-components";

export const Item = ({ el, usdt }: { el: any; usdt: any }) => {
  const [per, setPer] = useState<number>(0);
  const [larger, setLarger] = useState<string>("");
  const [upBitColor, setUpBitColor] = useState<string>("#000");
  const [binanceColor, setBinanceColor] = useState<string>("#000");
  useEffect(() => {
    if (el.upbit > el.binance * usdt) {
      setPer(((el.upbit - el.binance) / el.binance) * 100);
      setUpBitColor("#ff0000");
      setBinanceColor("blue");
      setLarger("upbit");
    } else if (el.upbit < el.binance * usdt) {
      setPer(((el.binance - el.upbit) / el.binance) * 100);
      setUpBitColor("blue");
      setBinanceColor("#ff0000");
      setLarger("binance");
    }
  }, [el]);
  console.log(larger);
  return (
    <StyledContainer>
      <StyledItemBox larger={larger} className="coinName">
        {el?.name}
      </StyledItemBox>
      <StyledItemBox
        className="binance"
        larger={larger}
        style={{
          color: `${binanceColor}`,
        }}
      >
        {~~(el.binance * usdt)}
      </StyledItemBox>
      <StyledItemBox
        larger={larger}
        className="upbit"
        style={{
          color: `${upBitColor}`,
        }}
      >
        {el?.upbit}
      </StyledItemBox>
      <StyledItemBox larger={larger}>
        {el?.upbit - ~~(el.binance * usdt)}
      </StyledItemBox>
      <StyledItemBox larger={larger}>per</StyledItemBox>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  margin: 20px auto 0 auto;
  padding: 0px 20px;
  width: 90%;
  height: 50px;
  background-color: #0e162d;
  /* box-shadow: 5px 3px 10px 0px #afaeae; */
  border-radius: 10px;
  display: flex;
`;

const StyledItemBox = styled.div<{ larger: string }>`
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: start;
  flex: 1;
  &.binance {
    font-weight: ${({ larger }) => larger === "binance" && "700"};
  }
  &.upbit {
    font-weight: ${({ larger }) => larger === "upbit" && "700"};
  }
  &.coinName {
    /* font-weight: 700; */
    /* font-size: 20px; */
  }
`;
