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
import { useNavigate } from "react-router-dom";
import { useInterval } from "./custom/useInterval";
import { supabase } from "./lib/supabase";
import { ListContainer_reverse } from "./components/ListContainer_reverse";
import { ListContainer } from "./components/ListContainer";

export const Index = () => {
  const navigate = useNavigate();
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

  const Tbbinance = [
    "BTCUSDT",
    "ETHUSDT",
    "NEOUSDT",
    "MTLUSDT",
    "XRPUSDT",
    "ETCUSDT",
    "OMGUSDT",
    "XEMUSDT",
    "QTUMUSDT",
    "LSKUSDT",
    "STEEMUSDT",
    "XLMUSDT",
    "ARDRUSDT",
    "STORJUSDT",
    "ADAUSDT",
    "POWRUSDT",
    "ICXUSDT",
    "EOSUSDT",
    "TRXUSDT",
    "SCUSDT",
    "ONTUSDT",
    "ZILUSDT",
    "POLYXUSDT",
    "ZRXUSDT",
    "LOOMUSDT",
    "BCHUSDT",
    "BATUSDT",
    "IOSTUSDT",
    "IOTAUSDT",
    "HIFIUSDT",
    "ONGUSDT",
    "GASUSDT",
    "ELFUSDT",
    "KNCUSDT",
    "THETAUSDT",
    "QKCUSDT",
    "ENJUSDT",
    "TFUELUSDT",
    "MANAUSDT",
    "ANKRUSDT",
    "ATOMUSDT",
    "MBLUSDT",
    "WAXPUSDT",
    "HBARUSDT",
    "STPTUSDT",
    "VETUSDT",
    "CHZUSDT",
    "STMXUSDT",
    "HIVEUSDT",
    "LINKUSDT",
    "XTZUSDT",
    "JSTUSDT",
    "SXPUSDT",
    "PLAUSDT",
    "DOTUSDT",
    "STRAXUSDT",
    "GLMUSDT",
    "SANDUSDT",
    "DOGEUSDT",
    "PUNDIXUSDT",
    "FLOWUSDT",
    "AXSUSDT",
    "STXUSDT",
    "XECUSDT",
    "SOLUSDT",
    "MATICUSDT",
    "AAVEUSDT",
    "1INCHUSDT",
    "ALGOUSDT",
    "NEARUSDT",
    "AVAXUSDT",
    "TUSDT",
    "CELOUSDT",
    "GMTUSDT",
    "APTUSDT",
    "SHIBUSDT",
    "MASKUSDT",
    "ARBUSDT",
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

  const Tbupbit = [
    "KRW-BTC",
    "KRW-ETH",
    "KRW-NEO",
    "KRW-MTL",
    "KRW-XRP",
    "KRW-ETC",
    "KRW-OMG",
    "KRW-XEM",
    "KRW-QTUM",
    "KRW-LSK",
    "KRW-STEEM",
    "KRW-XLM",
    "KRW-ARDR",
    "KRW-STORJ",
    "KRW-ADA",
    "KRW-POWR",
    "KRW-ICX",
    "KRW-EOS",
    "KRW-TRX",
    "KRW-SC",
    "KRW-ONT",
    "KRW-ZIL",
    "KRW-POLYX",
    "KRW-ZRX",
    "KRW-LOOM",
    "KRW-BCH",
    "KRW-BAT",
    "KRW-IOST",
    "KRW-IOTA",
    "KRW-HIFI",
    "KRW-ONG",
    "KRW-GAS",
    "KRW-ELF",
    "KRW-KNC",
    "KRW-THETA",
    "KRW-QKC",
    "KRW-ENJ",
    "KRW-TFUEL",
    "KRW-MANA",
    "KRW-ANKR",
    "KRW-ATOM",
    "KRW-MBL",
    "KRW-WAXP",
    "KRW-HBAR",
    "KRW-STPT",
    "KRW-VET",
    "KRW-CHZ",
    "KRW-STMX",
    "KRW-HIVE",
    "KRW-LINK",
    "KRW-XTZ",
    "KRW-JST",
    "KRW-SXP",
    "KRW-PLA",
    "KRW-DOT",
    "KRW-STRAX",
    "KRW-GLM",
    "KRW-SAND",
    "KRW-DOGE",
    "KRW-PUNDIX",
    "KRW-FLOW",
    "KRW-AXS",
    "KRW-STX",
    "KRW-XEC",
    "KRW-SOL",
    "KRW-MATIC",
    "KRW-AAVE",
    "KRW-1INCH",
    "KRW-ALGO",
    "KRW-NEAR",
    "KRW-AVAX",
    "KRW-T",
    "KRW-CELO",
    "KRW-GMT",
    "KRW-APT",
    "KRW-SHIB",
    "KRW-MASK",
    "KRW-ARB",
  ];

  const TbupbitSocket = [
    "KRW-BTC.1",
    "KRW-ETH.1",
    "KRW-NEO.1",
    "KRW-MTL.1",
    "KRW-XRP.1",
    "KRW-ETC.1",
    "KRW-OMG.1",
    "KRW-XEM.1",
    "KRW-QTUM.1",
    "KRW-LSK.1",
    "KRW-STEEM.1",
    "KRW-XLM.1",
    "KRW-ARDR.1",
    "KRW-STORJ.1",
    "KRW-ADA.1",
    "KRW-POWR.1",
    "KRW-ICX.1",
    "KRW-EOS.1",
    "KRW-TRX.1",
    "KRW-SC.1",
    "KRW-ONT.1",
    "KRW-ZIL.1",
    "KRW-POLYX.1",
    "KRW-ZRX.1",
    "KRW-LOOM.1",
    "KRW-BCH.1",
    "KRW-BAT.1",
    "KRW-IOST.1",
    "KRW-IOTA.1",
    "KRW-HIFI.1",
    "KRW-ONG.1",
    "KRW-GAS.1",
    "KRW-ELF.1",
    "KRW-KNC.1",
    "KRW-THETA.1",
    "KRW-QKC.1",
    "KRW-ENJ.1",
    "KRW-TFUEL.1",
    "KRW-MANA.1",
    "KRW-ANKR.1",
    "KRW-ATOM.1",
    "KRW-MBL.1",
    "KRW-WAXP.1",
    "KRW-HBAR.1",
    "KRW-STPT.1",
    "KRW-VET.1",
    "KRW-CHZ.1",
    "KRW-STMX.1",
    "KRW-HIVE.1",
    "KRW-LINK.1",
    "KRW-XTZ.1",
    "KRW-JST.1",
    "KRW-SXP.1",
    "KRW-PLA.1",
    "KRW-DOT.1",
    "KRW-STRAX.1",
    "KRW-GLM.1",
    "KRW-SAND.1",
    "KRW-DOGE.1",
    "KRW-PUNDIX.1",
    "KRW-FLOW.1",
    "KRW-AXS.1",
    "KRW-STX.1",
    "KRW-XEC.1",
    "KRW-SOL.1",
    "KRW-MATIC.1",
    "KRW-AAVE.1",
    "KRW-1INCH.1",
    "KRW-ALGO.1",
    "KRW-NEAR.1",
    "KRW-AVAX.1",
    "KRW-T.1",
    "KRW-CELO.1",
    "KRW-GMT.1",
    "KRW-APT.1",
    "KRW-SHIB.1",
    "KRW-MASK.1",
    "KRW-ARB.1",
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

  const [userCoinList, setUserCoinList] = useState<any>([]);
  const [userDone, setUserDone] = useState<boolean>(false);
  const getUserCoinList = async () => {
    try {
      const { data }: any = await supabase
        .from("user")
        .select("coinList")
        .eq("id", localStorage.getItem("id"));
      setUserDone(true);
      console.log(data[0].coinList);
      let newData = data[0].coinList.filter((el: any) => el.checked);
      console.log(newData);
      setUserCoinList(newData);
      makeUpbit(newData);
    } catch (error) {}
  };

  useEffect(() => {
    getUserCoinList();
  }, []);

  const makeUsdt = (list: any) => {
    let data = [];
    for (let i = 0; i < list.length; i++) {
      data.push(`${list[i].name}USDT`);
    }
    return data;
  };

  const makeUpbit = (list: any) => {
    let data = [];
    for (let i = 0; i < list.length; i++) {
      data.push(`KRW-${list[i].name}`);
    }
    return data;
  };
  const makeUpbitSocket = (list: any) => {
    let data = [];
    for (let i = 0; i < list.length; i++) {
      data.push(`KRW-${list[i].name}.1`);
    }
    return data;
  };

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
      setUsdt(response.data[0].basePrice);
    } catch (error) {}
  };

  const getUpbitAllList = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://api.upbit.com/v1/ticker?markets=${makeUpbit(userCoinList).join(
          ","
        )}`
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
      let filteredList = makeUsdt(userCoinList);
      let binanceList = response.data.filter((a: any) => {
        if (filteredList.includes(a.symbol)) {
          return a;
        }
      });

      setFirstBinance(binanceList);
      setTimeout(() => {
        setIsLoading1(false);
      }, 1200);
    } catch (error) {}
  };

  useEffect(() => {
    if (userDone) {
      console.log(userCoinList);
      getUsdExchange();
      getUpbitAllList();
      getBinanceAllList();
    }
  }, [userDone]);

  useEffect(() => {
    if (!isLoading && !isLoading1 && userDone) {
      setFirstRenderList(() => {
        let newData = [];
        for (let i = 0; i < userCoinList.length; i++) {
          for (let j = 0; j < userCoinList.length; j++) {
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
  }, [isLoading, isLoading1, userDone]);

  //! =============================  업비트소켓   ==================================
  const upbitSocketList = useRef<any>([]);

  useEffect(() => {
    if (!isLoading && !isLoading1) {
      const upbitSocket = new WebSocket("wss://api.upbit.com/websocket/v1");
      upbitSocket.onopen = (e: any) => {
        upbitSocket.send(
          `[{"ticket":"test"},{"type":"orderbook","codes":[${makeUpbitSocket(
            userCoinList
          ).join(",")}]},{"format":"SIMPLE"}]`
        );
      };
      upbitSocket.onmessage = (e: any) => {
        e.data.text().then((data: any) => {
          const response: any = JSON.parse(data);
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
  const binanceSocketList = useRef<any>([]);
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
      const response: any = JSON.parse(e.data);
      binanceSocketList.current = [...binanceSocketList.current, ...response];
    };
    return () => binanceSocket.close();
  }, []);

  // ~===================== 상태변화

  useInterval(() => {
    if (!isLoading && !isLoading1 && firstRenderList.length !== 0) {
      console.log("1");
      let binanceFilterList = makeUsdt(userCoinList);
      // 새로운 코인리스트
      let newUpbitList: any = upbitSocketList.current
        .reverse()
        .filter((el: any, idx: any, arr: any) => {
          return arr.findIndex((item: any) => item.name === el.name) === idx;
        });
      let newBinanceList: any = binanceSocketList.current
        ?.reverse()
        .filter((el: any, idx: any, arr: any) => {
          return arr.findIndex((item: any) => item.s === el.s) === idx;
        })
        ?.filter((el: any) => {
          if (binanceFilterList.includes(el.s)) {
            return el;
          }
        });

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
        el.per = (el.upbit / (el.binance * usdt) - 1) * 100;
        el.rPer = (el.binance / (el.upbit / usdt) - 1) * 100;
      });

      setFirstRenderList(firstRender); //비트코인 및 usdt환율 업데이트 따로
      let filteredList = [...firstRender];
      let lastBTC = filteredList.filter((el: any) => {
        return el.name === "BTC";
      });

      setUpBtc(lastBTC[0].upbit);
      setBinanceBtc(lastBTC[0].binance);
    }
  }, 1000);

  //현재시각
  let today = new Date();

  let year = today.getFullYear(); // 년도
  let month = today.getMonth() + 1; // 월
  let date = today.getDate(); // 날짜
  let hour = today.getHours(); // 요일
  let minute = today.getMinutes(); // 요일
  let second = today.getSeconds(); // 요일
  let nowDate = `${year}/${month}/${date}/${hour}:${minute}:${second}`;

  //!====================== 소리끄기  ========================
  const [mute, setMute] = useState<boolean>(false);

  //!==================  검색인풋  ====================
  const [searchName, setSearchName] = useState<string>("");
  const [submit, setSubmit] = useState<boolean>(false);

  //! ================= 즐겨찾기 기능  ====================

  const [favorite, setFavorite] = useState<boolean>(false);

  //! ===================== 0.5 ~ -0.5프로 사이 제외기능
  const [more, setMore] = useState<boolean>(false);

  return (
    <StyledContainer>
      {" "}
      {isLoading && isLoading1 && <Loading />}
      <FlexBox></FlexBox>
      <StyledTempWrap>
        <StyledOptionBox>
          <div
            className="reloadBox"
            onClick={() => {
              getUpbitAllList();
              getBinanceAllList();
            }}
          >
            <span>리스트 새로고침</span>
            <TbReload className="reloadIcon" size={20} />
          </div>
          <div onClick={() => setMute(!mute)} className="muteBox">
            <span>소리{!mute ? "끄기" : "켜기"} </span>
            {!mute ? (
              <FaVolumeMute size={20} />
            ) : (
              <ImVolumeMute size={20} />
            )}{" "}
          </div>
          <div>
            {" "}
            <span>현재시각 :</span> {nowDate}{" "}
          </div>
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
          <StyledExchaneBox>
            USDT환율 <div className="number">{usdt?.toFixed(2)}</div>
          </StyledExchaneBox>
        </StyledHeaderContainer>{" "}
        <StyledAddCoinListTxt onClick={() => navigate("/add")}>
          코인수정 +-
        </StyledAddCoinListTxt>
        <StyledInputBox>
          <input
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="코인이름을 입력하세요"
          />{" "}
        </StyledInputBox>
        <StyledFavoriteTxt>
          <div
            className="favoritetext"
            onClick={() => {
              setFavorite(!favorite);
            }}
          >
            즐겨찾기 {favorite ? "취소" : "보기"}
          </div>{" "}
          <div
            className="text"
            onClick={() => {
              setMore(!more);
            }}
          >
            전체보기 {more && "취소"}
          </div>
        </StyledFavoriteTxt>{" "}
        <FlexBox>
          <ListContainer_reverse
            firstRenderList={firstRenderList}
            setFirstRenderList={setFirstRenderList}
            mute={true}
            more={more}
            searchName={searchName}
            usdt={usdt}
            favorite={favorite}
          />{" "}
          <ListContainer
            firstRenderList={firstRenderList}
            setFirstRenderList={setFirstRenderList}
            mute={mute}
            more={more}
            searchName={searchName}
            usdt={usdt}
            favorite={favorite}
          />
        </FlexBox>
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

const FlexBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledTempWrap = styled.div`
  width: 100%;
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

const StyledMediaFlex = styled.div`
  display: flex;
  flex: 2;
  @media screen and (max-width: 480px) {
    flex-direction: column-reverse;
    flex: 1;
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
  justify-content: space-between;
`;
const StyledInputBox = styled.div`
  display: flex;
  width: 90%;
  justify-content: flex-start;
  input {
    border: none;
    border-radius: 0;
    width: 30%;
    padding: 0 10px;
    height: 30px;
    border-radius: 10px;
  }
  .btn {
    width: 50px;
    height: 30px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 20px;
    background-color: #303550;
    color: white;
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
  }
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

const StyledFavoriteTxt = styled.div`
  font-size: 16px;
  font-weight: 70;
  color: #a2a7c9;
  width: 90%;
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  margin-bottom: 10px;

  .text {
    color: #a2a7c9;
    :hover {
      color: white;
      cursor: pointer;
      text-decoration: underline;
    }
  }
  .favoritetext {
    color: #a2a7c9;
    margin-right: 20px;
    :hover {
      color: white;
      cursor: pointer;
      text-decoration: underline;
    }
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
