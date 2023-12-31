import React from "react";
import styled from "styled-components";
import { Item } from "./Item";
import binance from "../assets/image/binance.png";
import upbit from "../assets/image/upbit.png";

export const ListContainer_reverse = ({
  firstRenderList,
  setFirstRenderList,
  favorite,
  more,
  searchName,
  mute,
  usdt,
}: {
  firstRenderList: any;
  setFirstRenderList: any;
  favorite: boolean;
  more: boolean;
  searchName: string;
  mute: boolean;
  usdt: string;
}) => {
  console.log("[ reverse firstRenderList  ] :::", firstRenderList);
  return (
    <Wrapper>
      <StyledTitle>
        <StyledTitleItem>코인이름</StyledTitleItem>
        <StyledMediaFlex>
          <StyledTitleItem>
            <img className="binance" src={binance} alt="바이낸스" />
            <span>바이낸스</span>
          </StyledTitleItem>
          <StyledTitleItem>
            <img className="upbit" src={upbit} alt="바이낸스" />
            <span>업비트</span>
          </StyledTitleItem>
        </StyledMediaFlex>

        <StyledTitleItem>매수가총액</StyledTitleItem>
        <StyledTitleItem>역프리미엄</StyledTitleItem>
      </StyledTitle>
      {firstRenderList
        .sort((a: any, b: any) => {
          if (a.rPer > b.rPer) return 1;
          if (a.rPer === b.rPer) return 0;
          if (a.rPer < b.rPer) return -1;
        })
        .filter((el: any) => el.rPer < -1.5)
        .concat(firstRenderList.filter((el: any) => el.rPer > -1.5))
        .filter((el: any) => {
          if (favorite) {
            if (
              JSON.parse(localStorage.getItem("favorites") || "[]").includes(
                el.name
              )
            ) {
              return el;
            }
          } else {
            return el;
          }
        })
        .map((el: any) => {
          if (more) {
            if (searchName.trim().length !== 0) {
              if (
                el.name
                  .toLocaleLowerCase()
                  .includes(searchName.toLocaleLowerCase())
              ) {
                return (
                  <Item
                    mute={mute}
                    el={el}
                    per={el.rPer}
                    key={el.name}
                    usdt={usdt}
                    setFirstRenderList={setFirstRenderList}
                  />
                );
              }
            } else {
              return (
                <Item
                  mute={mute}
                  el={el}
                  per={el.rPer}
                  key={el.name}
                  usdt={usdt}
                  setFirstRenderList={setFirstRenderList}
                />
              );
            }
          } else if (el.rPer > 0.5 || el.rPer < -0.5) {
            if (searchName.trim().length !== 0) {
              if (
                el.name
                  .toLocaleLowerCase()
                  .includes(searchName.toLocaleLowerCase())
              ) {
                return (
                  <Item
                    mute={mute}
                    el={el}
                    per={el.rPer}
                    key={el.name}
                    usdt={usdt}
                    setFirstRenderList={setFirstRenderList}
                  />
                );
              }
            } else {
              return (
                <Item
                  mute={mute}
                  el={el}
                  per={el.rPer}
                  key={el.name}
                  usdt={usdt}
                  setFirstRenderList={setFirstRenderList}
                />
              );
            }
          }
        })}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const StyledMediaFlex = styled.div`
  display: flex;
  flex: 2;
  @media screen and (max-width: 480px) {
    flex-direction: column-reverse;
    flex: 1;
  }
`;

const StyledTitle = styled.div`
  margin: 50px auto 0px auto;
  padding: 0px 20px;
  width: 90%;
  height: 70px;
  background-color: #0e162d;
  border-radius: 10px;
  display: flex;
  @media screen and (max-width: 450px) {
    padding: 0px 5px;
  }
`;

const StyledTitleItem = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: start;
  flex: 1;
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  @media screen and (max-width: 480px) {
    font-size: 12px;
    font-weight: 700;
    padding: 5px;
  }

  .upbit {
    margin-left: -5px;
    margin-right: 5px;
    width: 20%;
  }
  .binance {
    margin-left: -5px;
    margin-right: 5px;
    width: 15%;
  }
`;

const StyledAddCoinListTxt = styled.div`
  font-size: 12px;
  font-weight: 70;
  color: gray;
  width: 90%;
  display: flex;
  justify-content: flex-end;
  :hover {
    color: white;
    cursor: pointer;
    text-decoration: underline;
  }
`;
