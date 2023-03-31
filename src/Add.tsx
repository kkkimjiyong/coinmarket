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

export const Add = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoading1, setIsLoading1] = useState<boolean>(true);

  const binanceCoinList = [
    "MASKUSDT",
    "BTCUSDT",
    "OMGUSDT",
    "XRPUSDT",
    "NEOUSDT",
    "SANDUSDT",
    "ETCUSDT",
    "APTUSDT",
    "SXPUSDT",
    "LOOMUSDT",
    "CELOUSDT",
    "DOGEUSDT",
    "ADAUSDT",
    "SOLUSDT",
    "AXSUSDT",
    "TRXUSDT",
    "ATOMUSDT",
  ];
  const upbitCoinList = [
    "KRW-BTC",
    "KRW-MASK",
    "KRW-OMG",
    "KRW-XRP",
    "KRW-NEO",
    "KRW-SAND",
    "KRW-ETC",
    "KRW-APT",
    "KRW-SXP",
    "KRW-LOOM",
    "KRW-CELO",
    "KRW-DOGE",
    "KRW-ADA",
    "KRW-SOL",
    "KRW-AXS",
    "KRW-TRX",
    "KRW-ATOM",
  ];
  const upbitSocketCoinList = [
    "KRW-BTC.1",
    "KRW-MASK.1",
    "KRW-OMG.1",
    "KRW-XRP.1",
    "KRW-NEO.1",
    "KRW-SAND.1",
    "KRW-ETC.1",
    "KRW-APT.1",
    "KRW-SXP.1",
    "KRW-LOOM.1",
    "KRW-CELO.1",
    "KRW-DOGE.1",
    "KRW-ADA.1",
    "KRW-SOL.1",
    "KRW-AXS.1",
    "KRW-TRX.1",
    "KRW-ATOM.1",
  ];

  console.log(upbitCoinList.join(","));

  const [firstUpbit, setFirstUpbit] = useState<any>();
  const [firstBinance, setFirstBinance] = useState<any>();
  const [firstRenderList, setFirstRenderList] = useState<any>([]);

  //finex usd환율 가져오기
  const [upBtc, setUpBtc] = useState<any>();
  const [usdt, setUsdt] = useState<any>();
  const getUsdExchange = async () => {
    try {
      const response = await axios.get(
        "https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWUSD"
      );
      console.log("환율", response.data[0].basePrice);
      setUsdt(response.data[0].basePrice);
    } catch (error) {}
  };

  const getUpbitAllList = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`https://api.upbit.com/v1/markets/all`);
      console.log(response.data);
      setFirstUpbit(response.data);
      // setTimeout(() => {
      //   setIsLoading(false);
      // }, 1200);
    } catch (error) {}
  };

  const [binanceBtc, setBinanceBtc] = useState<any>();

  const getBinanceAllList = async () => {
    setIsLoading1(true);
    try {
      console.log("실행");
      const response: any = await axios.get(
        "https://api.binance.com/api/v3/ticker/24hr"
      );
      let a = response.data.filter((el: any) => {
        return el.symbol.split("").reverse().join("").substr(0, 4) === "TDSU";
      });
      setFirstBinance(a);
      setTimeout(() => {
        setIsLoading1(false);
      }, 1200);
    } catch (error) {}
  };
  console.log(firstBinance);
  useEffect(() => {
    getUsdExchange();
    // getUpbitAllList();
    getBinanceAllList();
  }, []);

  useEffect(() => {
    if (!isLoading && !isLoading1) {
      setFirstRenderList(() => {
        let newData = [];
        for (let i = 0; i < binanceCoinList.length; i++) {
          for (let j = 0; j < binanceCoinList.length; j++) {
            let upbitName = firstUpbit[j].market.split("").slice(4).join("");
            let binanceName = firstBinance[i].symbol
              .split("")
              .reverse()
              .slice(4)
              .reverse()
              .join("");
            if (upbitName === binanceName) {
              newData.push({
                name: upbitName,
                upbit: firstUpbit[j].trade_price,
                binance: firstBinance[i].lastPrice,
              });
            }
          }
        }
        return newData;
      });
    }
  }, [isLoading, isLoading1]);

  return (
    <StyledContainer>
      {/* {isLoading && isLoading1 && <Loading />} */}
      {/* {firstUpbit.map((el : any) => )} */}
      <div>코인 리스트</div>
      <div>각 코인들</div>
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
  flex-direction: column;
  align-items: center;
`;

const StyledTempWrap = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledOptionBox = styled.div`
  margin-top: 10px;
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  font-weight: 700;
  text-overflow: ellipsis;
  white-space: nowrap;
  span {
    @media screen and (max-width: 480px) {
      display: none;
    }
  }
  .reloadBox {
    display: flex;
    align-items: center;
    :hover {
      cursor: pointer;
    }
  }
  .muteBox {
    display: flex;
    align-items: center;
    gap: 5px;
    @media screen and (max-width: 480px) {
      margin-left: 50px;
    }
    :hover {
      cursor: pointer;
    }
  }
  .reloadIcon {
    margin-left: 5px;
  }
`;

const StyledHeaderContainer = styled.div`
  flex: none;
  margin: 20px auto;
  width: 90%;
  height: 100px;
  background-color: #0e162d;
  border-radius: 10px;
  display: flex;
`;

const StyledExchaneBox = styled.div`
  color: #aeb1ca;
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15px;
  /* justify-content: space-around; */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: 700;
  @media screen and (max-width: 450px) {
    font-size: 12px;
    font-weight: 700;
  }
  .number {
    color: #c5c7da;
    margin-top: 15px;
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 20px;
    border-top: 1px solid #626684;
    font-weight: 500;
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
  @media screen and (max-width: 450px) {
    font-size: 12px;
    font-weight: 700;
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
