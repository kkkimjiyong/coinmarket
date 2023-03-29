import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MASK from "../assets/image/MASK.png";

export const Item = ({
  el,
  usdt,
  setFirstRenderList,
}: {
  setFirstRenderList: React.Dispatch<React.SetStateAction<any>>;
  el: any;
  usdt: any;
}) => {
  const [per, setPer] = useState<number>(0);
  const [larger, setLarger] = useState<string>("");
  const [upBitColor, setUpBitColor] = useState<string>("#000");
  const [binanceColor, setBinanceColor] = useState<string>("#000");
  useEffect(() => {
    if (el.upbit > el.binance * usdt) {
      setPer(((el.upbit - el.binance) / el.binance) * 100);
      setLarger("upbit");
    } else if (el.upbit < el.binance * usdt) {
      setPer(((el.binance - el.upbit) / el.binance) * 100);
      setLarger("binance");
    }
  }, [el]);
  return (
    <StyledContainer
      onClick={() =>
        setFirstRenderList((prev: any) => {
          return prev.filter((item: any) => item.name !== el.name);
        })
      }
    >
      <StyledItemBox larger={larger} className="coinName">
        <StyledImgBack>
          <img className="img" src={`../${el?.name}.png`} alt="MASK" />
        </StyledImgBack>{" "}
        {el?.name}
      </StyledItemBox>
      <StyledItemBox className="binance" larger={larger}>
        {~~(el.binance * usdt)}
      </StyledItemBox>
      <StyledItemBox larger={larger} className="upbit">
        {el?.upbit}
      </StyledItemBox>
      <StyledItemBox larger={larger}>
        {(el?.upbit - el.binance * usdt).toFixed(2)}
      </StyledItemBox>
      <StyledItemBox larger={larger}>per</StyledItemBox>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  flex: none;
  margin: 20px auto 0 auto;
  padding: 0px 20px;
  width: 90%;
  height: 50px;
  background-color: #0e162d;
  border-radius: 10px;
  display: flex;
  :hover {
    background-color: #101a37;
    box-shadow: 5px 3px 10px 0px black;
    cursor: pointer;
  }
`;

const StyledItemBox = styled.div<{ larger: string }>`
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: start;
  flex: 1;
  @media screen and (max-width: 450px) {
    font-size: 12px;
    font-weight: 700;
  }
  &.binance {
    color: ${({ larger }) => (larger === "binance" ? "red" : "blue")};
    font-weight: ${({ larger }) => larger === "binance" && "700"};
  }
  &.upbit {
    color: ${({ larger }) => (larger === "upbit" ? "red" : "blue")};
    font-weight: ${({ larger }) => larger === "upbit" && "700"};
  }
  &.coinName {
    /* font-weight: 700; */
    /* font-size: 20px; */
  }
`;
const StyledImgBack = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  margin-left: -10px;
  margin-right: 10px;
  .img {
    width: 20px;
  }
`;
