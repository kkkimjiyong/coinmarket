import React, { useState, useEffect } from "react";
import styled from "styled-components";
import useSound from "use-sound";
import alarm from "../../public/alarm.mp3";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

export const Item = ({
  el,
  usdt,
  per,
  mute,
  setFirstRenderList,
  type,
}: {
  per: any;
  mute: boolean;
  setFirstRenderList: React.Dispatch<React.SetStateAction<any>>;
  el: any;
  usdt: any;
  type?: string;
}) => {
  const [larger, setLarger] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [play] = useSound(alarm);
  useEffect(() => {
    if (type === "rPer") {
      if (el.rPer < -1.5) {
        setColor("#4d83ff");
      }
    } else {
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
          setColor("#6dc888");
        }
      } else if (el.upbit < el.binance * usdt) {
        setLarger("binance");
        if (el.per < -1.5) {
          setColor("#4d83ff");
        }
      }
    }
  }, [per, mute]);

  // const moneyFormat = (value: any) => {
  //   const numbers = [
  //     numbering(value % 100000000000000000000, 10000000000000000),
  //     numbering(value % 10000000000000000, 1000000000000),
  //     numbering(value % 1000000000000, 100000000),
  //     numbering(value % 100000000, 10000),
  //     value % 10000,
  //   ];

  //   return setUnitText(numbers)
  //     .filter((number: any) => !!number)
  //     .join(" ");
  // };

  // const setUnitText = (numbers: any) => {
  //   const unit = ["원", "만", "억", "조", "경"];
  //   return numbers.map((number: any, index: any) =>
  //     !!number ? numberFormat(number) + unit[unit.length - 1 - index] : number
  //   );
  // };

  // const numbering = (value: any, division: any) => {
  //   const result = Math.floor(value / division);
  //   return result === 0 ? null : result % division;
  // };

  // const NUMBER_FORMAT_REGX = /\B(?=(\d{3})+(?!\d))/g;

  // const numberFormat = (value: any) => {
  //   return value.toString().replace(NUMBER_FORMAT_REGX, ",");
  // };

  return (
    <StyledContainer
      onClick={
        () => {
          let arr = JSON.parse(localStorage.getItem("favorites") || "[]");
          let newArr;
          if (arr.includes(el.name)) {
            newArr = JSON.stringify(
              arr.filter((item: any) => el.name !== item)
            );
          } else {
            newArr = JSON.stringify([...arr, el.name]);
          }

          localStorage.setItem("favorites", newArr);
        }
        // setFirstRenderList((prev: any) => {
        //   return prev.map((item: any) => {
        //     if (item.name === el.name) {
        //       return { ...item, favorite: true };
        //     } else {
        //       return item;
        //     }
        //   });
        // })
      }
    >
      <StyledItemBox larger={larger} className="coinName">
        <StyledImgBack>
          <img
            className="img"
            src={`../coin/${el?.name}.png`}
            onError={(e: any) => (e.target.style.display = "none")}
            alt="MASK"
          />
        </StyledImgBack>{" "}
        <span>{el?.name}</span>
      </StyledItemBox>
      <StyledItemMediaFlex>
        <StyledItemBox className="binance" larger={larger}>
          {(~~(el.binance * usdt))
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </StyledItemBox>
        <StyledItemBox larger={larger} className="upbit">
          {el?.upbit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </StyledItemBox>
      </StyledItemMediaFlex>

      <StyledItemBox larger={larger}>
        {(el.upbit_bidSize * el?.upbit)
          .toFixed(0)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      </StyledItemBox>
      <StyledPerBox className="per" larger={larger} color={color}>
        {per?.toFixed(2)}%
      </StyledPerBox>
      <StyledStarBox>
        {JSON.parse(localStorage.getItem("favorites") || "[]").includes(
          el.name
        ) ? (
          <AiFillStar size={24} />
        ) : (
          <AiOutlineStar size={24} />
        )}
      </StyledStarBox>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  position: relative;
  flex: none;
  margin: 20px auto 0 auto;
  padding: 0px 20px;
  width: 90%;
  height: 50px;
  background-color: #0e162d;
  border-radius: 10px;
  display: flex;
  align-items: center;
  :hover {
    background-color: #101a37;
    box-shadow: 5px 3px 10px 0px black;
    cursor: pointer;
  }
`;

const StyledItemMediaFlex = styled.div`
  display: flex;
  flex: 2;
  @media screen and (max-width: 480px) {
    flex-direction: column-reverse;
    flex: 1;
  }
`;

const StyledItemBox = styled.div<{ larger: string }>`
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
  /* color: #e0e0e0d5; */
  @media screen and (max-width: 480px) {
    font-size: 12px;
    font-weight: 700;
    padding: 5px;
  }
`;

const StyledPerBox = styled.div<{ larger: string; color: string }>`
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
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
  margin-right: 3px;

  .img {
    width: 20px;
  }
`;

const StyledStarBox = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: start;
  right: 10px;
  position: absolute;
`;
