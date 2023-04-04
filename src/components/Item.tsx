import React, { useState, useEffect } from "react";
import styled from "styled-components";
import useSound from "use-sound";
import alarm from "../../public/alarm.mp3";

export const Item = ({
  el,
  usdt,
  per,
  mute,
  setFirstRenderList,
}: {
  per: any;
  mute: boolean;
  setFirstRenderList: React.Dispatch<React.SetStateAction<any>>;
  el: any;
  usdt: any;
}) => {
  const [larger, setLarger] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [play] = useSound(alarm);
  useEffect(() => {
    if (el.upbit > el.binance * usdt) {
      setLarger("upbit");
      if (el.per > 2) {
        setColor(" #d95561");
        if (!mute) {
          play();
        }
        return;
      } else if (el.per > 1.5) {
        setColor(" #e19c3a");
        return;
      } else {
        console.log(el.per);
        setColor("#6dc888");
      }
    } else if (el.upbit < el.binance * usdt) {
      setLarger("binance");
      if (el.per < -1.5) {
        setColor("#4d83ff");
      }
    }
  }, [per, mute]);
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
          <img
            className="img"
            src={`../${el?.name}.png`}
            onError={(e: any) => (e.target.style.display = "none")}
            alt="MASK"
          />
        </StyledImgBack>{" "}
        <span>{el?.name}</span>
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

  @media screen and (max-width: 340px) {
    display: none;
  }

  .img {
    width: 20px;
  }
`;
