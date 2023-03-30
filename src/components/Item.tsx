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
  const [color, setColor] = useState<string>("");
  useEffect(() => {
    if (el.upbit > el.binance * usdt) {
      setLarger("upbit");
      setColor("#6dc888");
      if (el.per > 2) {
        setColor(" #d95561");
        return;
      } else if (el.per > 1.5) {
        setColor(" #e19c3a");
        return;
      }
    } else if (el.upbit < el.binance * usdt) {
      setLarger("binance");
      if (el.per < -1.5) {
        setColor("#4d83ff");
      }
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
        {(~~(el.binance * usdt))
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      </StyledItemBox>
      <StyledItemBox larger={larger} className="upbit">
        {el?.upbit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      </StyledItemBox>
      <StyledItemBox larger={larger}>
        {(el.upbit_bidSize * el?.upbit)
          .toFixed(0)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      </StyledItemBox>
      <StyledPerBox className="per" larger={larger} color={color}>
        {el.per?.toFixed(2)}%
      </StyledPerBox>
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
  /* color: #e0e0e0d5; */
  @media screen and (max-width: 450px) {
    font-size: 12px;
    font-weight: 700;
  }
`;

const StyledPerBox = styled.div<{ larger: string; color: string }>`
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: start;
  flex: 1;
  /* color: #e0e0e0d5; */
  @media screen and (max-width: 450px) {
    font-size: 12px;
    font-weight: 700;
  }

  &.per {
    color: ${({ color }) => `${color}`};
    font-weight: ${({ larger }) => larger === "upbit" && "700"};
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
