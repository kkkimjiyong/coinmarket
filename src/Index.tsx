import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Item } from "./components/Item";
import binance from "./assets/image/binance.png";
import upbit from "./assets/image/upbit.png";
import axios from "axios";
import { Loading } from "./components/Loading";
import { TbReload } from "react-icons/tb";

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
    "APTUSDT",
    "SXPUSDT",
    "LOOMUSDT",
    "CELOUSDT",
    "DOGEUSDT",
    "ADAUSDT",
    "SOLUSDT",
    "AXSUSDT",
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
      const response = await axios.get(
        `https://api.upbit.com/v1/ticker?markets=${upbitCoinList.join(",")}`
      );
      setFirstUpbit(response.data);
      setTimeout(() => {
        setIsLoading(false);
      }, 1200);
    } catch (error) {}
  };

  const [binanceBtc, setBinanceBtc] = useState<any>();

  const getBinanceAllList = async () => {
    setIsLoading1(true);
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
      }, 1200);
    } catch (error) {}
  };

  useEffect(() => {
    getUsdExchange();
    getUpbitAllList();
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

  //! =============================  업비트소켓   ==================================
  const upbitSocketList = useRef<any>([]);

  useEffect(() => {
    if (!isLoading && !isLoading1) {
      const upbitSocket = new WebSocket("wss://api.upbit.com/websocket/v1");
      upbitSocket.onopen = (e: any) => {
        upbitSocket.send(
          `[{"ticket":"test"},{"type":"orderbook","codes":[${upbitSocketCoinList.join(
            ","
          )}]},{"format":"SIMPLE"}]`
        );
      };
      upbitSocket.onmessage = (e: any) => {
        e.data.text().then((data: any) => {
          const response: any = JSON.parse(data);
          console.log(response);
          upbitSocketList.current.push({
            name: response.cd,
            upbit: response.obu[0].bp,
            upbit_bidSize: response.obu[0].bs,
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

        console.log(newUpbitList, upbitCoinList);
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
              el.upbit_bidSize = newUpbitList[i].upbit_bidSize;
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
        let lastBTC = filteredList.filter((el: any) => {
          return el.name === "BTC";
        });
        let lastUSDTBTC = newUpbitList.filter((el: any) => {
          return el.name === "USDT-BTC";
        });

        setUpBtc(lastBTC[0].upbit);
        setBinanceBtc(lastBTC[0].binance);
      }
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, [isLoading, isLoading1, firstRenderList]);
  //현재시각
  let today = new Date();

  let year = today.getFullYear(); // 년도
  let month = today.getMonth() + 1; // 월
  let date = today.getDate(); // 날짜
  let hour = today.getHours(); // 요일
  let minute = today.getMinutes(); // 요일
  let second = today.getSeconds(); // 요일
  let nowDate = `${year}/${month}/${date}/${hour}:${minute}:${second}`;

  return (
    <StyledContainer>
      {" "}
      {isLoading && isLoading1 && <Loading />}
      <StyledTempWrap>
        <StyledOptionBox>
          <div
            className="reloadBox"
            onClick={() => {
              getUpbitAllList();
              getBinanceAllList();
            }}
          >
            리스트 새로고침
            <TbReload className="reloadIcon" size={20} />
          </div>
          <div>현재시각 : {nowDate} </div>
        </StyledOptionBox>

        <StyledHeaderContainer>
          <StyledExchaneBox>
            BTC-KRW
            <div className="number">{upBtc}</div>
          </StyledExchaneBox>
          <StyledExchaneBox>
            BTC_USDT
            <div className="number">{Number(binanceBtc)?.toFixed(2)}</div>
          </StyledExchaneBox>
          {/* <StyledExchaneBox>
            시세차이 per{}
            <div className="number">{~~(upBtc - binanceBtc * usdt)}원</div>
          </StyledExchaneBox> */}
          <StyledExchaneBox>
            USDT환율 <div className="number">{usdt?.toFixed(2)}</div>
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
          <StyledTitleItem>매수가총액</StyledTitleItem>
          <StyledTitleItem>김프</StyledTitleItem>
        </StyledTitle>
        {firstRenderList.map((el: any) => {
          return (
            <Item
              el={el}
              key={el.name}
              usdt={usdt}
              setFirstRenderList={setFirstRenderList}
            />
          );
        })}
      </StyledTempWrap>
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

  .reloadBox {
    display: flex;
    align-items: center;
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
