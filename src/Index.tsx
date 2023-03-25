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

  const binanceCoinList = ["MASKUSDT", "BTCUSDT", "OMGUSDT", "XRPUSDT"];
  const upbitCoinList = ["KRW-BTC", "KRW-MASK", "KRW-OMG", "KRW-XRP"];

  const [firstUpbit, setFirstUpbit] = useState<any>();
  const [firstBinance, setFirstBinance] = useState<any>();
  const [firstRenderList, setFirstRenderList] = useState<any>([]);

  const [upBtc, setUpBtc] = useState<any>();
  const [usdt, setUsdt] = useState<any>();

  const getUpbitAllList = async () => {
    try {
      const response = await axios.get(
        "https://api.upbit.com/v1/ticker?markets=KRW-BTC,KRW-MASK,KRW-OMG,KRW-XRP"
      );
      setFirstUpbit(response.data);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } catch (error) {}
  };

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
          '[{"ticket":"test"},{"type":"ticker","codes":["KRW-BTC","KRW-MASK","KRW-OMG","KRW-XRP","KRW-STX"]},{"format":"SIMPLE"}]'
        );
      };
      upbitSocket.onmessage = (e: any) => {
        e.data.text().then((data: any) => {
          const response: any = JSON.parse(data);
          // if (upbitSocketList.current.length !== 0) {
          //   if (upbitSocketList.current.at(-1).name !== response.cd) {
          //     upbitSocketList.current.push({
          //       name: response.cd,
          //       upbit: response.tp,
          //     });
          //   }
          // } else {
          upbitSocketList.current.push({
            name: response.cd,
            upbit: response.tp,
          });
          // }
        });
      };
      return () => upbitSocket.close();
    }
  }, [isLoading, isLoading1]);
  //usdt만 요청하는 소켓

  useEffect(() => {
    const upbitUsdtSocket = new WebSocket("wss://api.upbit.com/websocket/v1");
    upbitUsdtSocket.onopen = (e: any) => {
      upbitUsdtSocket.send(
        '[{"ticket":"test"},{"type":"trade","codes":["USDT-BTC"]},{"format":"SIMPLE"}]'
      );
    };

    upbitUsdtSocket.onmessage = (e: any) => {
      e.data.text().then((data: any) => {
        const response = JSON.parse(data);
        // console.log(response.tp);
        setUsdt(response.tp);
      });
    };

    return () => upbitUsdtSocket.close();
  }, []);
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
  const [lastData, setLastData] = useState<any>([]);

  // ~===================== 상태변화
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isLoading && !isLoading1 && firstRenderList.length !== 0) {
        let newUpbitList: any = upbitSocketList.current
          .reverse()
          .filter((el: any, idx: any, arr: any) => {
            return arr.findIndex((item: any) => item.name === el.name) === idx;
          });
        let newBinanceList: any = binanceSocketList.current.filter(
          (el: any) => {
            if (binanceCoinList.includes(el.s)) {
              return el;
            }
          }
        );
        const LastData = () => {
          let newData = [];
          for (let i = 0; i < newUpbitList.length; i++) {
            for (let j = 0; j < newBinanceList.length; j++) {
              let upbitName = newUpbitList[i].name.split("").slice(4).join("");
              let binanceName = newBinanceList[j].s
                .split("")
                .reverse()
                .slice(4)
                .reverse()
                .join("");
              if (upbitName === binanceName) {
                newData.push({
                  name: upbitName,
                  upbit: newUpbitList[i].upbit,
                  binance: newBinanceList[j].c,
                });
              }
            }
          }
          return newData;
        };
        let last = LastData();
        let final: any;
        if (last.length !== 0) {
          let firstRender = [...firstRenderList];
          final = firstRender.map((el: any) => {
            for (let i = 0; i < last.length; i++) {
              let upbitName = el.name;
              let binanceName = last[i].name;
              if (upbitName === binanceName) {
                return last[i];
              } else {
                return el;
              }
            }
          });

          setFirstRenderList(final);
        }

        // setFirstRenderList((prev: any) => {
        //   return prev.map((el: any) => {
        //     for (let i = 0; i < last.length; i++) {
        //       let upbitName = el.name;
        //       let binanceName = last[i].name;
        //       if (upbitName === binanceName) {
        //         return last[i];
        //       } else {
        //         return el;
        //       }
        //     }
        //   });
        // });
        // let Final = () => {
        //   let newData = [];
        //   for (let i = 0; i < firstRenderList.length; i++) {
        //     console.log("실행");
        //     for (let j = 0; j < last.length; j++) {
        //       console.log(last[j]);
        //       let upbitName = firstRenderList[i].name;
        //       let binanceName = last[j].name;
        //       if (upbitName === binanceName) {
        //         newData.push(last[j]);
        //       } else {
        //         newData.push(firstRenderList[i]);
        //       }
        //     }
        //   }
        //   return newData;
        // };
        // let final = Final();
        // console.log("업비트소켓", newUpbitList);
        // console.log("바이낸스소켓", newBinanceList);
        // console.log("들어갈 데이터리스트", firstRenderList);
      }
    }, 50);

    return () => {
      clearInterval(interval);
    };
  }, [isLoading, isLoading1, firstRenderList]);
  return (
    <StyledContainer>
      <Header />
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
        return <Item el={el} key={el.name} />;
      })}
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: #303550;
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
