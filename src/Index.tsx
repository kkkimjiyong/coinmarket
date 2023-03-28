import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Item } from "./components/Item";
import { Header } from "./global/Header";
import binance from "./assets/image/binance.png";
import upbit from "./assets/image/upbit.png";
import axios from "axios";

export const Index = () => {
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
    "NUUSDT",
    "APTUSDT",
    "SXPUSDT",
    "LOOMUSDT",
  ];
  const upbitCoinList = [
    "KRW-BTC",
    "KRW-MASK",
    "KRW-OMG",
    "KRW-XRP",
    "KRW-NEO",
    "KRW-SAND",
    "KRW-ETC",
    "KRW-NU",
    "KRW-APT",
    "KRW-SXP",
    "KRW-LOOM",
  ];

  const [firstUpbit, setFirstUpbit] = useState<any>();
  const [firstBinance, setFirstBinance] = useState<any>();
  const [firstRenderList, setFirstRenderList] = useState<any>([]);

  //업비트 usdt환율 가져오기
  const [upBtc, setUpBtc] = useState<any>();
  const [usdt, setUsdt] = useState<any>();
  const getUpbitAllList = async () => {
    try {
      const response = await axios.get(
        "https://api.upbit.com/v1/ticker?markets=USDT-BTC,KRW-BTC,KRW-MASK,KRW-OMG,KRW-XRP,KRW-NEO,KRW-SAND,KRW-ETC,KRW-NU,KRW-APT,KRW-SXP,KRW-LOOM"
      );
      setFirstUpbit(response.data);
      console.log(response);
      let KRWBTC = response.data.filter((el: any) => {
        return el.market === "KRW-BTC";
      })[0];
      let USDTBTC = response.data.filter((el: any) => {
        return el.market === "USDT-BTC";
      })[0];
      setUpBtc(KRWBTC.trade_price);
      setUsdt(KRWBTC.trade_price / USDTBTC.trade_price);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } catch (error) {}
  };

  const [binanceBtc, setBinanceBtc] = useState<any>();

  const getBinanceAllList = async () => {
    try {
      const response: any = await axios.get(
        "https://api.binance.com/api/v3/ticker/24hr"
      );
      let binanceList = response.data.filter((a: any) => {
        if (binanceCoinList.includes(a.symbol)) {
          return a;
        }
      });
      let USDTBTC = binanceList.filter((el: any) => {
        return el.symbol === "BTCUSDT";
      })[0];
      setBinanceBtc(USDTBTC.lastPrice);
      setFirstBinance(binanceList);
      setTimeout(() => {
        setIsLoading1(false);
      }, 1000);
    } catch (error) {}
  };

  useEffect(() => {
    getUpbitAllList();
    getBinanceAllList();
  }, []);

  useEffect(() => {
    if (!isLoading && !isLoading1) {
      console.log("첫번째 데이터 가공 시작");
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
      console.log("끝");
    }
  }, [isLoading, isLoading1]);

  //! =============================  업비트소켓   ==================================
  const upbitSocketList = useRef<any>([]);

  useEffect(() => {
    if (!isLoading && !isLoading1) {
      const upbitSocket = new WebSocket("wss://api.upbit.com/websocket/v1");
      upbitSocket.onopen = (e: any) => {
        upbitSocket.send(
          '[{"ticket":"test"},{"type":"ticker","codes":[USDT-BTC,KRW-BTC,KRW-MASK,KRW-OMG,KRW-XRP,KRW-NEO,KRW-SAND,KRW-ETC,KRW-NU,KRW-APT,KRW-SXP,KRW-LOOM]},{"format":"SIMPLE"}]'
        );
      };
      upbitSocket.onmessage = (e: any) => {
        e.data.text().then((data: any) => {
          const response: any = JSON.parse(data);
          upbitSocketList.current.push({
            name: response.cd,
            upbit: response.tp,
          });
        });
      };
      return () => upbitSocket.close();
    }
  }, [isLoading, isLoading1]);

  //! -------------------------  바이낸스  --------------------
  const binanceSocketList = useRef([]);
  useEffect(() => {
    const binanceSocket = new WebSocket("wss://stream.binance.com:9443/ws");
    binanceSocket.onopen = function (e) {
      const msg = {
        method: "SUBSCRIBE",
        params: ["!miniTicker@arr"],
        id: 1,
      };
      binanceSocket.send(JSON.stringify(msg));
    };

    binanceSocket.onmessage = (e) => {
      const response = JSON.parse(e.data);
      binanceSocketList.current = response;
    };
    return () => binanceSocket.close();
  }, []);

  // ~===================== 상태변화

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isLoading && !isLoading1 && firstRenderList.length !== 0) {
        // 새로운 코인리스트
        let newUpbitList: any = upbitSocketList.current
          .reverse()
          .filter((el: any, idx: any, arr: any) => {
            return arr.findIndex((item: any) => item.name === el.name) === idx;
          });

        let newBinanceList: any = binanceSocketList.current?.filter(
          (el: any) => {
            if (binanceCoinList.includes(el.s)) {
              return el;
            }
          }
        );
        let firstRender = [...firstRenderList];
        firstRender.map((el: any) => {
          for (let i = 0; i < newUpbitList.length; i++) {
            let newUpbitName = newUpbitList[i].name.split("").slice(4).join("");
            if (el.name === newUpbitName) {
              el.upbit = newUpbitList[i].upbit;
            }
          }
          for (let j = 0; j < newBinanceList.length; j++) {
            let newBinanceName = newBinanceList[j].s
              .split("")
              .reverse()
              .slice(4)
              .reverse()
              .join("");
            if (el.name === newBinanceName) {
              el.binance = newBinanceList[j].c;
            }
          }
        });
        console.log(firstRender);
        setFirstRenderList(firstRender); //비트코인 및 usdt환율 업데이트 따로
        let filteredList = [...firstRender];
        console.log(filteredList);
        let lastBTC = filteredList.filter((el: any) => {
          return el.name === "BTC";
        });
        let lastUSDTBTC = newUpbitList.filter((el: any) => {
          return el.name === "USDT-BTC";
        });
        if (lastUSDTBTC.length > 0) {
          setUsdt(lastBTC[0].upbit / lastUSDTBTC[0].upbit);
        }

        setUpBtc(lastBTC[0].upbit);
        setBinanceBtc(lastBTC[0].binance);
      }
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, [isLoading, isLoading1, firstRenderList]);

  return (
    <StyledContainer>
      <StyledHeaderContainer>
        <StyledExchaneBox>
          BTC-KRW(업비트)
          <div>{upBtc}</div>
        </StyledExchaneBox>
        <StyledExchaneBox>
          BTC_KRW(바이낸스)<div>{~~(binanceBtc * usdt)}</div>
        </StyledExchaneBox>
        <StyledExchaneBox>
          시세차이 per <div>{~~(upBtc - binanceBtc * usdt)}원</div>
        </StyledExchaneBox>
        <StyledExchaneBox>
          USDT환율 <div>{usdt?.toFixed(2)}</div>
        </StyledExchaneBox>
      </StyledHeaderContainer>
      <StyledTitle>
        <StyledTitleItem>코인이름</StyledTitleItem>
        <StyledTitleItem>
          <img className="binance" src={binance} alt="바이낸스" />
          바이낸스
        </StyledTitleItem>
        <StyledTitleItem>
          <img className="upbit" src={upbit} alt="바이낸스" />
          업비트
        </StyledTitleItem>
        <StyledTitleItem>시세차이</StyledTitleItem>
        <StyledTitleItem>per</StyledTitleItem>
      </StyledTitle>
      {firstRenderList.map((el: any) => {
        return <Item el={el} key={el.name} usdt={usdt} />;
      })}
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  overflow-y: scroll;
  background-color: #303550;
`;

const StyledHeaderContainer = styled.div`
  margin: 20px auto;
  min-width: 500px;
  width: 90%;
  height: 100px;
  background-color: #0e162d;
  border-radius: 10px;
  display: flex;
`;

const StyledExchaneBox = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const StyledTitle = styled.div`
  margin: 50px auto 0px auto;
  width: 90%;
  height: 70px;
  background-color: #0e162d;
  border-radius: 10px;
  display: flex;
`;

const StyledTitleItem = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: start;
  flex: 1;
  .upbit {
    margin-right: 5px;
    width: 20%;
  }
  .binance {
    margin-right: 5px;
    width: 15%;
  }
`;
