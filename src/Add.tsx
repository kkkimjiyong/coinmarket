import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Item } from "./components/Item";
import binance from "./assets/image/binance.png";
import upbit from "./assets/image/upbit.png";
import axios from "axios";
import { Loading } from "./components/Loading";
import { TbReload } from "react-icons/tb";
import { FaVolumeMute } from "react-icons/fa";
import { ImVolumeMute } from "react-icons/im";
import { supabase } from "./lib/supabase";
import { defaultCoinList } from "./assets/defaultCoinList";
import { useNavigate } from "react-router-dom";

export const Add = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const [sameList, setSameList] = useState<any>([]);

  const onSaveHandler = async () => {
    let data = sameList.filter((el: any) => el.name !== "NU");
    console.log("보내는 값", data.length);
    try {
      const { data }: any = await supabase
        .from("user")
        .update({
          coinList: defaultCoinList,
        })
        .eq("id", localStorage.getItem("id"))
        .select("coinList");
      setSameList(data[0].coinList);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserCoinList = async () => {
    try {
      const { data }: any = await supabase
        .from("user")
        .select("coinList")
        .eq("id", localStorage.getItem("id"));
      console.log(
        "===========================================",
        data[0].coinList.length
      );
      setSameList(data[0].coinList);
      setTimeout(() => {
        setIsLoading(false);
      }, 1200);
    } catch (error) {}
  };

  useEffect(() => {
    getUserCoinList();
  }, []);

  return (
    <StyledContainer>
      {isLoading && <Loading />}
      {/* {isLoading && isLoading1 && <Loading />} */}
      <StyledStickyHeader>
        <StyledNavigateBtn onClick={() => navigate("/main")}>
          메인으로
        </StyledNavigateBtn>
        <StyledSaveBtn onClick={onSaveHandler}>저장</StyledSaveBtn>
      </StyledStickyHeader>

      <StyledListContainer>
        <div>
          현재 리스트 {sameList?.filter((el: any) => el.checked).length}개
        </div>
        {sameList?.map((el: any) => {
          if (el.checked)
            return (
              <StyledCoinItem
                onClick={() => {
                  setSameList((prev: any) => {
                    return prev.map((item: any) => {
                      if (el === item) {
                        return { ...el, checked: false };
                      } else {
                        return item;
                      }
                    });
                  });
                }}
              >
                {el.name}
              </StyledCoinItem>
            );
        })}
      </StyledListContainer>
      <StyledListContainer>
        <div>
          제외된 코인 {sameList?.filter((el: any) => !el.checked).length}개
        </div>
        {sameList?.map((el: any) => {
          if (!el.checked)
            return (
              <StyledCoinItem
                onClick={() => {
                  setSameList((prev: any) => {
                    return prev.map((item: any) => {
                      if (el === item) {
                        return { ...el, checked: true };
                      } else {
                        return item;
                      }
                    });
                  });
                }}
              >
                {el.name}
              </StyledCoinItem>
            );
        })}
      </StyledListContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding-bottom: 50px;
  overflow-y: scroll;
  background-color: #303550;
  display: flex;
  justify-content: center;
`;

const StyledStickyHeader = styled.div`
  position: fixed;
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #2c3049;
`;

const StyledNavigateBtn = styled.div`
  width: 30%;
  height: 50%;
  border-radius: 10px;
  background-color: #474c66;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 12px 12px 16px 0 rgba(0, 0, 0, 0.25),
    -4px -3px 4px 0 rgba(255, 255, 255, 0.3);
  :hover {
    background-color: #1b1f31;
    color: gray;
    cursor: pointer;
    box-shadow: 8px 8px 12px 3px rgba(0, 0, 0, 0.25) inset;
  }
`;

const StyledSaveBtn = styled.div`
  width: 60%;
  height: 50%;
  border-radius: 10px;
  background-color: #474c66;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 12px 12px 16px 0 rgba(0, 0, 0, 0.25),
    -4px -3px 4px 0 rgba(255, 255, 255, 0.3);
  :hover {
    background-color: #1b1f31;
    color: gray;
    cursor: pointer;
    box-shadow: 8px 8px 12px 3px rgba(0, 0, 0, 0.25) inset;
  }
`;

const StyledListContainer = styled.div`
  margin-top: 100px;
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledCoinItem = styled.div`
  flex: none;
  width: 60%;
  min-width: 70px;
  max-width: 300px;
  height: 30px;
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #222536;
  color: white;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 700;
  box-shadow: 12px 12px 16px 0 rgba(0, 0, 0, 0.25),
    -4px -3px 4px 0 rgba(255, 255, 255, 0.3);
  :hover {
    background-color: #1b1f31;
    color: gray;
    cursor: pointer;
    box-shadow: 8px 8px 12px 3px rgba(0, 0, 0, 0.25) inset;
  }
`;
