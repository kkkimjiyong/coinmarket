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
  const [isLoading1, setIsLoading1] = useState<boolean>(true);
  const navigate = useNavigate();

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

  const allUpbitList = [
    { market: "KRW-BTC", korean_name: "비트코인", english_name: "Bitcoin" },
    { market: "KRW-ETH", korean_name: "이더리움", english_name: "Ethereum" },

    { market: "KRW-NEO", korean_name: "네오", english_name: "NEO" },
    { market: "KRW-MTL", korean_name: "메탈", english_name: "Metal" },
    { market: "KRW-XRP", korean_name: "리플", english_name: "Ripple" },
    {
      market: "KRW-ETC",
      korean_name: "이더리움클래식",
      english_name: "Ethereum Classic",
    },
    { market: "KRW-OMG", korean_name: "오미세고", english_name: "OmiseGo" },
    {
      market: "KRW-SNT",
      korean_name: "스테이터스네트워크토큰",
      english_name: "Status Network Token",
    },
    { market: "KRW-WAVES", korean_name: "웨이브", english_name: "Waves" },
    { market: "KRW-XEM", korean_name: "넴", english_name: "NEM" },
    { market: "KRW-QTUM", korean_name: "퀀텀", english_name: "Qtum" },
    { market: "KRW-LSK", korean_name: "리스크", english_name: "Lisk" },
    { market: "KRW-STEEM", korean_name: "스팀", english_name: "Steem" },
    { market: "KRW-XLM", korean_name: "스텔라루멘", english_name: "Lumen" },
    { market: "KRW-ARDR", korean_name: "아더", english_name: "Ardor" },
    { market: "KRW-ARK", korean_name: "아크", english_name: "Ark" },
    { market: "KRW-STORJ", korean_name: "스토리지", english_name: "Storj" },
    {
      market: "KRW-GRS",
      korean_name: "그로스톨코인",
      english_name: "Groestlcoin",
    },
    { market: "KRW-REP", korean_name: "어거", english_name: "Augur" },
    { market: "KRW-ADA", korean_name: "에이다", english_name: "Ada" },
    { market: "BTC-ADA", korean_name: "에이다", english_name: "Ada" },
    {
      market: "BTC-MANA",
      korean_name: "디센트럴랜드",
      english_name: "Decentraland",
    },
    { market: "USDT-OMG", korean_name: "오미세고", english_name: "OmiseGo" },
    {
      market: "KRW-SBD",
      korean_name: "스팀달러",
      english_name: "SteemDollars",
    },
    {
      market: "BTC-SBD",
      korean_name: "스팀달러",
      english_name: "SteemDollars",
    },
    {
      market: "KRW-POWR",
      korean_name: "파워렛저",
      english_name: "Power ledger",
    },
    {
      market: "BTC-POWR",
      korean_name: "파워렛저",
      english_name: "Power ledger",
    },
    {
      market: "KRW-BTG",
      korean_name: "비트코인골드",
      english_name: "Bitcoin Gold",
    },
    { market: "USDT-ADA", korean_name: "에이다", english_name: "Ada" },
    {
      market: "BTC-DNT",
      korean_name: "디스트릭트0x",
      english_name: "district0x",
    },
    { market: "BTC-ZRX", korean_name: "제로엑스", english_name: "0x Protocol" },
    { market: "BTC-TRX", korean_name: "트론", english_name: "TRON" },
    { market: "BTC-TUSD", korean_name: "트루USD", english_name: "TrueUSD" },
    { market: "BTC-LRC", korean_name: "루프링", english_name: "Loopring" },
    { market: "KRW-ICX", korean_name: "아이콘", english_name: "Icon" },
    { market: "KRW-EOS", korean_name: "이오스", english_name: "EOS" },
    { market: "USDT-TUSD", korean_name: "트루USD", english_name: "TrueUSD" },
    { market: "KRW-TRX", korean_name: "트론", english_name: "TRON" },
    { market: "BTC-POLYX", korean_name: "폴리매쉬", english_name: "Polymesh" },
    { market: "USDT-SC", korean_name: "시아코인", english_name: "Siacoin" },
    { market: "USDT-TRX", korean_name: "트론", english_name: "TRON" },
    { market: "KRW-SC", korean_name: "시아코인", english_name: "Siacoin" },
    { market: "KRW-ONT", korean_name: "온톨로지", english_name: "Ontology" },
    { market: "KRW-ZIL", korean_name: "질리카", english_name: "Zilliqa" },
    { market: "KRW-POLYX", korean_name: "폴리매쉬", english_name: "Polymesh" },
    { market: "KRW-ZRX", korean_name: "제로엑스", english_name: "0x Protocol" },
    {
      market: "KRW-LOOM",
      korean_name: "룸네트워크",
      english_name: "Loom Network",
    },
    {
      market: "BTC-BCH",
      korean_name: "비트코인캐시",
      english_name: "Bitcoin Cash",
    },
    {
      market: "USDT-BCH",
      korean_name: "비트코인캐시",
      english_name: "Bitcoin Cash",
    },
    {
      market: "KRW-BCH",
      korean_name: "비트코인캐시",
      english_name: "Bitcoin Cash",
    },
    {
      market: "BTC-HIFI",
      korean_name: "하이파이",
      english_name: "Hifi Finance",
    },
    {
      market: "BTC-LOOM",
      korean_name: "룸네트워크",
      english_name: "Loom Network",
    },
    {
      market: "KRW-BAT",
      korean_name: "베이직어텐션토큰",
      english_name: "Basic Attention Token",
    },
    { market: "KRW-IOST", korean_name: "아이오에스티", english_name: "IOST" },
    { market: "BTC-RFR", korean_name: "리퍼리움", english_name: "Refereum" },
    { market: "KRW-RFR", korean_name: "리퍼리움", english_name: "Refereum" },
    { market: "USDT-DGB", korean_name: "디지바이트", english_name: "DigiByte" },
    { market: "KRW-CVC", korean_name: "시빅", english_name: "Civic" },
    { market: "KRW-IQ", korean_name: "아이큐", english_name: "IQ.wiki" },
    { market: "KRW-IOTA", korean_name: "아이오타", english_name: "IOTA" },
    { market: "BTC-RVN", korean_name: "레이븐코인", english_name: "Ravencoin" },
    { market: "BTC-GO", korean_name: "고체인", english_name: "GoChain" },
    {
      market: "BTC-UPP",
      korean_name: "센티넬프로토콜",
      english_name: "Sentinel Protocol",
    },
    { market: "BTC-ENJ", korean_name: "엔진코인", english_name: "Enjin" },
    {
      market: "KRW-HIFI",
      korean_name: "하이파이",
      english_name: "Hifi Finance",
    },
    { market: "KRW-ONG", korean_name: "온톨로지가스", english_name: "ONG" },
    { market: "KRW-GAS", korean_name: "가스", english_name: "GAS" },
    { market: "BTC-MTL", korean_name: "메탈", english_name: "Metal" },
    {
      market: "KRW-UPP",
      korean_name: "센티넬프로토콜",
      english_name: "Sentinel Protocol",
    },
    { market: "KRW-ELF", korean_name: "엘프", english_name: "aelf" },
    { market: "USDT-DOGE", korean_name: "도지코인", english_name: "Dogecoin" },
    {
      market: "USDT-ZRX",
      korean_name: "제로엑스",
      english_name: "0x Protocol",
    },
    {
      market: "USDT-RVN",
      korean_name: "레이븐코인",
      english_name: "Ravencoin",
    },
    {
      market: "USDT-BAT",
      korean_name: "베이직어텐션토큰",
      english_name: "Basic Attention Token",
    },
    {
      market: "KRW-KNC",
      korean_name: "카이버네트워크",
      english_name: "Kyber Network",
    },
    { market: "BTC-MOC", korean_name: "모스코인", english_name: "Moss Coin" },
    { market: "BTC-ZIL", korean_name: "질리카", english_name: "Zilliqa" },
    {
      market: "KRW-BSV",
      korean_name: "비트코인에스브이",
      english_name: "Bitcoin SV",
    },
    {
      market: "BTC-BSV",
      korean_name: "비트코인에스브이",
      english_name: "Bitcoin SV",
    },
    { market: "BTC-IOST", korean_name: "아이오에스티", english_name: "IOST" },
    {
      market: "KRW-THETA",
      korean_name: "쎄타토큰",
      english_name: "Theta Token",
    },
    { market: "BTC-DENT", korean_name: "덴트", english_name: "Dent" },
    { market: "KRW-QKC", korean_name: "쿼크체인", english_name: "QuarkChain" },
    { market: "BTC-ELF", korean_name: "엘프", english_name: "aelf" },
    {
      market: "KRW-BTT",
      korean_name: "비트토렌트",
      english_name: "BitTorrent",
    },
    { market: "BTC-IOTX", korean_name: "아이오텍스", english_name: "IoTeX" },
    {
      market: "BTC-SOLVE",
      korean_name: "솔브케어",
      english_name: "Solve.Care",
    },
    { market: "BTC-NKN", korean_name: "엔케이엔", english_name: "NKN" },
    { market: "BTC-META", korean_name: "메타디움", english_name: "Metadium" },
    { market: "KRW-MOC", korean_name: "모스코인", english_name: "Moss Coin" },
    { market: "BTC-ANKR", korean_name: "앵커", english_name: "Ankr" },
    { market: "BTC-CRO", korean_name: "크로노스", english_name: "Cronos" },
    { market: "KRW-ENJ", korean_name: "엔진코인", english_name: "Enjin" },
    {
      market: "KRW-TFUEL",
      korean_name: "쎄타퓨엘",
      english_name: "Theta Fuel",
    },
    {
      market: "KRW-MANA",
      korean_name: "디센트럴랜드",
      english_name: "Decentraland",
    },
    { market: "KRW-ANKR", korean_name: "앵커", english_name: "Ankr" },
    { market: "BTC-ORBS", korean_name: "오브스", english_name: "Orbs" },
    { market: "BTC-AERGO", korean_name: "아르고", english_name: "Aergo" },
    { market: "KRW-AERGO", korean_name: "아르고", english_name: "Aergo" },
    { market: "KRW-ATOM", korean_name: "코스모스", english_name: "Cosmos" },
    { market: "KRW-TT", korean_name: "썬더코어", english_name: "ThunderCore" },
    {
      market: "KRW-CRE",
      korean_name: "캐리프로토콜",
      english_name: "Carry Protocol",
    },
    { market: "BTC-ATOM", korean_name: "코스모스", english_name: "Cosmos" },
    {
      market: "BTC-STPT",
      korean_name: "에스티피",
      english_name: "Standard Tokenization Protocol",
    },
    { market: "KRW-MBL", korean_name: "무비블록", english_name: "MovieBloc" },
    { market: "BTC-EOS", korean_name: "이오스", english_name: "EOS" },
    { market: "BTC-DAI", korean_name: "다이", english_name: "Dai" },
    { market: "BTC-MKR", korean_name: "메이커", english_name: "Maker" },
    { market: "BTC-BORA", korean_name: "보라", english_name: "BORA" },
    { market: "KRW-WAXP", korean_name: "왁스", english_name: "WAX" },
    { market: "BTC-WAXP", korean_name: "왁스", english_name: "WAX" },
    { market: "KRW-HBAR", korean_name: "헤데라", english_name: "Hedera" },
    { market: "KRW-MED", korean_name: "메디블록", english_name: "MediBloc" },
    { market: "BTC-MED", korean_name: "메디블록", english_name: "MediBloc" },
    { market: "BTC-MLK", korean_name: "밀크", english_name: "MiL.k" },
    { market: "KRW-MLK", korean_name: "밀크", english_name: "MiL.k" },
    {
      market: "KRW-STPT",
      korean_name: "에스티피",
      english_name: "Standard Tokenization Protocol",
    },
    { market: "BTC-VET", korean_name: "비체인", english_name: "VeChain" },
    { market: "KRW-ORBS", korean_name: "오브스", english_name: "Orbs" },
    { market: "BTC-CHZ", korean_name: "칠리즈", english_name: "Chiliz" },
    { market: "KRW-VET", korean_name: "비체인", english_name: "VeChain" },
    { market: "BTC-FX", korean_name: "펑션엑스", english_name: "Function X" },
    {
      market: "BTC-OGN",
      korean_name: "오리진프로토콜",
      english_name: "Origin Protocol",
    },
    { market: "KRW-CHZ", korean_name: "칠리즈", english_name: "Chiliz" },
    { market: "BTC-XTZ", korean_name: "테조스", english_name: "Tezos" },
    { market: "BTC-HIVE", korean_name: "하이브", english_name: "Hive" },
    {
      market: "BTC-HBD",
      korean_name: "하이브달러",
      english_name: "Hive Dollar",
    },
    { market: "BTC-OBSR", korean_name: "옵저버", english_name: "Observer" },
    { market: "BTC-DKA", korean_name: "디카르고", english_name: "dKargo" },
    { market: "KRW-STMX", korean_name: "스톰엑스", english_name: "StormX" },
    { market: "BTC-STMX", korean_name: "스톰엑스", english_name: "StormX" },
    { market: "BTC-AHT", korean_name: "아하토큰", english_name: "AhaToken" },
    { market: "BTC-PCI", korean_name: "페이코인", english_name: "PayCoin" },
    { market: "KRW-DKA", korean_name: "디카르고", english_name: "dKargo" },
    { market: "BTC-LINK", korean_name: "체인링크", english_name: "Chainlink" },
    { market: "KRW-HIVE", korean_name: "하이브", english_name: "Hive" },
    { market: "KRW-KAVA", korean_name: "카바", english_name: "Kava" },
    { market: "BTC-KAVA", korean_name: "카바", english_name: "Kava" },
    { market: "KRW-AHT", korean_name: "아하토큰", english_name: "AhaToken" },
    { market: "KRW-LINK", korean_name: "체인링크", english_name: "Chainlink" },
    { market: "KRW-XTZ", korean_name: "테조스", english_name: "Tezos" },
    { market: "KRW-BORA", korean_name: "보라", english_name: "BORA" },
    { market: "BTC-JST", korean_name: "저스트", english_name: "JUST" },
    { market: "BTC-CHR", korean_name: "크로미아", english_name: "Chromia" },
    { market: "BTC-DAD", korean_name: "다드", english_name: "DAD" },
    { market: "BTC-TON", korean_name: "톤", english_name: "TON" },
    { market: "KRW-JST", korean_name: "저스트", english_name: "JUST" },
    { market: "BTC-CTSI", korean_name: "카르테시", english_name: "Cartesi" },
    { market: "BTC-DOT", korean_name: "폴카닷", english_name: "Polkadot" },
    { market: "KRW-CRO", korean_name: "크로노스", english_name: "Cronos" },
    { market: "BTC-COMP", korean_name: "컴파운드", english_name: "Compound" },
    { market: "BTC-SXP", korean_name: "솔라", english_name: "SXP" },
    { market: "BTC-HUNT", korean_name: "헌트", english_name: "HUNT" },
    { market: "KRW-TON", korean_name: "톤", english_name: "TON" },
    { market: "BTC-ONIT", korean_name: "온버프", english_name: "ONBUFF" },
    { market: "BTC-CRV", korean_name: "커브", english_name: "Curve" },
    { market: "BTC-ALGO", korean_name: "알고랜드", english_name: "Algorand" },
    {
      market: "BTC-RSR",
      korean_name: "리저브라이트",
      english_name: "Reserve Rights",
    },
    { market: "KRW-SXP", korean_name: "솔라", english_name: "SXP" },
    { market: "BTC-OXT", korean_name: "오키드", english_name: "Orchid" },
    { market: "BTC-PLA", korean_name: "플레이댑", english_name: "PlayDapp" },
    { market: "KRW-HUNT", korean_name: "헌트", english_name: "HUNT" },
    { market: "BTC-MARO", korean_name: "마로", english_name: "Maro" },
    {
      market: "BTC-SAND",
      korean_name: "샌드박스",
      english_name: "The Sandbox",
    },
    { market: "BTC-SUN", korean_name: "썬", english_name: "SUN" },
    { market: "KRW-PLA", korean_name: "플레이댑", english_name: "PlayDapp" },
    { market: "KRW-DOT", korean_name: "폴카닷", english_name: "Polkadot" },
    { market: "BTC-SRM", korean_name: "세럼", english_name: "Serum" },
    { market: "BTC-QTCON", korean_name: "퀴즈톡", english_name: "Quiztok" },
    { market: "BTC-MVL", korean_name: "엠블", english_name: "MVL" },
    { market: "KRW-SRM", korean_name: "세럼", english_name: "Serum" },
    { market: "KRW-MVL", korean_name: "엠블", english_name: "MVL" },
    { market: "BTC-REI", korean_name: "레이", english_name: "REI" },
    {
      market: "BTC-AQT",
      korean_name: "알파쿼크",
      english_name: "Alpha Quark Token",
    },
    {
      market: "BTC-AXS",
      korean_name: "엑시인피니티",
      english_name: "Axie Infinity",
    },
    { market: "BTC-STRAX", korean_name: "스트라티스", english_name: "Stratis" },
    { market: "KRW-STRAX", korean_name: "스트라티스", english_name: "Stratis" },
    {
      market: "KRW-AQT",
      korean_name: "알파쿼크",
      english_name: "Alpha Quark Token",
    },
    { market: "BTC-GLM", korean_name: "골렘", english_name: "Golem" },
    { market: "KRW-GLM", korean_name: "골렘", english_name: "Golem" },
    {
      market: "BTC-FCT2",
      korean_name: "피르마체인",
      english_name: "FirmaChain",
    },
    { market: "BTC-SSX", korean_name: "썸씽", english_name: "SOMESING" },
    { market: "KRW-SSX", korean_name: "썸씽", english_name: "SOMESING" },
    { market: "KRW-META", korean_name: "메타디움", english_name: "Metadium" },
    {
      market: "KRW-FCT2",
      korean_name: "피르마체인",
      english_name: "FirmaChain",
    },
    { market: "BTC-FIL", korean_name: "파일코인", english_name: "Filecoin" },
    { market: "BTC-UNI", korean_name: "유니스왑", english_name: "Uniswap" },
    { market: "BTC-BASIC", korean_name: "베이직", english_name: "Basic" },
    { market: "BTC-INJ", korean_name: "인젝티브", english_name: "Injective" },
    { market: "BTC-PROM", korean_name: "프롬", english_name: "Prom" },
    { market: "BTC-VAL", korean_name: "밸리디티", english_name: "Validity" },
    {
      market: "BTC-PSG",
      korean_name: "파리생제르맹",
      english_name: "Paris Saint-Germain Fan Token",
    },
    {
      market: "BTC-JUV",
      korean_name: "유벤투스",
      english_name: "Juventus Fan Token",
    },
    { market: "BTC-CBK", korean_name: "코박토큰", english_name: "Cobak Token" },
    { market: "BTC-FOR", korean_name: "포튜브", english_name: "ForTube" },
    { market: "KRW-CBK", korean_name: "코박토큰", english_name: "Cobak Token" },
    { market: "BTC-BFC", korean_name: "바이프로스트", english_name: "Bifrost" },
    {
      market: "BTC-LINA",
      korean_name: "리니어파이낸스",
      english_name: "Linear",
    },
    {
      market: "BTC-HUM",
      korean_name: "휴먼스케이프",
      english_name: "Humanscape",
    },
    { market: "BTC-CELO", korean_name: "셀로", english_name: "Celo" },
    {
      market: "KRW-SAND",
      korean_name: "샌드박스",
      english_name: "The Sandbox",
    },
    {
      market: "KRW-HUM",
      korean_name: "휴먼스케이프",
      english_name: "Humanscape",
    },
    { market: "BTC-IQ", korean_name: "아이큐", english_name: "IQ.wiki" },
    { market: "BTC-STX", korean_name: "스택스", english_name: "Stacks" },
    { market: "KRW-DOGE", korean_name: "도지코인", english_name: "Dogecoin" },
    {
      market: "BTC-NEAR",
      korean_name: "니어프로토콜",
      english_name: "NEAR Protocol",
    },
    {
      market: "BTC-AUCTION",
      korean_name: "바운스토큰",
      english_name: "Bounce",
    },
    {
      market: "BTC-DAWN",
      korean_name: "던프로토콜",
      english_name: "Dawn Protocol",
    },
    { market: "BTC-FLOW", korean_name: "플로우", english_name: "Flow" },
    { market: "BTC-STRK", korean_name: "스트라이크", english_name: "Strike" },
    { market: "KRW-STRK", korean_name: "스트라이크", english_name: "Strike" },
    { market: "BTC-PUNDIX", korean_name: "펀디엑스", english_name: "Pundi X" },
    { market: "KRW-PUNDIX", korean_name: "펀디엑스", english_name: "Pundi X" },
    { market: "KRW-FLOW", korean_name: "플로우", english_name: "Flow" },
    {
      market: "KRW-DAWN",
      korean_name: "던프로토콜",
      english_name: "Dawn Protocol",
    },
    {
      market: "KRW-AXS",
      korean_name: "엑시인피니티",
      english_name: "Axie Infinity",
    },
    { market: "KRW-STX", korean_name: "스택스", english_name: "Stacks" },
    { market: "BTC-GRT", korean_name: "그래프", english_name: "The Graph" },
    { market: "BTC-SNX", korean_name: "신세틱스", english_name: "Synthetix" },
    { market: "BTC-USDP", korean_name: "팍스달러", english_name: "Pax Dollar" },
    { market: "KRW-XEC", korean_name: "이캐시", english_name: "eCash" },
    { market: "KRW-SOL", korean_name: "솔라나", english_name: "Solana" },
    { market: "BTC-SOL", korean_name: "솔라나", english_name: "Solana" },
    { market: "KRW-MATIC", korean_name: "폴리곤", english_name: "Polygon" },
    { market: "BTC-MATIC", korean_name: "폴리곤", english_name: "Polygon" },
    { market: "KRW-AAVE", korean_name: "에이브", english_name: "Aave" },
    {
      market: "KRW-1INCH",
      korean_name: "1인치네트워크",
      english_name: "1inch Network",
    },
    { market: "BTC-AAVE", korean_name: "에이브", english_name: "Aave" },
    {
      market: "BTC-1INCH",
      korean_name: "1인치네트워크",
      english_name: "1inch Network",
    },
    {
      market: "BTC-MASK",
      korean_name: "마스크네트워크",
      english_name: "Mask Network",
    },
    { market: "KRW-ALGO", korean_name: "알고랜드", english_name: "Algorand" },
    { market: "BTC-AUDIO", korean_name: "오디우스", english_name: "Audius" },
    {
      market: "KRW-NEAR",
      korean_name: "니어프로토콜",
      english_name: "NEAR Protocol",
    },
    {
      market: "BTC-YGG",
      korean_name: "일드길드게임즈",
      english_name: "Yield Guild Games",
    },
    { market: "BTC-GTC", korean_name: "깃코인", english_name: "Gitcoin" },
    {
      market: "BTC-OCEAN",
      korean_name: "오션프로토콜",
      english_name: "Ocean Protocol",
    },
    {
      market: "BTC-CTC",
      korean_name: "크레딧코인",
      english_name: "Creditcoin",
    },
    { market: "BTC-LPT", korean_name: "라이브피어", english_name: "Livepeer" },
    { market: "KRW-AVAX", korean_name: "아발란체", english_name: "Avalanche" },
    {
      market: "BTC-IMX",
      korean_name: "이뮤터블엑스",
      english_name: "Immutable X",
    },
    {
      market: "BTC-RNDR",
      korean_name: "렌더토큰",
      english_name: "Render Token",
    },
    { market: "BTC-RLY", korean_name: "랠리", english_name: "Rally" },
    { market: "KRW-T", korean_name: "쓰레스홀드", english_name: "Threshold" },

    { market: "KRW-CELO", korean_name: "셀로", english_name: "Celo" },
    { market: "KRW-GMT", korean_name: "스테픈", english_name: "Stepn" },
    { market: "KRW-APT", korean_name: "앱토스", english_name: "Aptos" },
    { market: "KRW-SHIB", korean_name: "시바이누", english_name: "Shiba Inu" },
    {
      market: "KRW-MASK",
      korean_name: "마스크네트워크",
      english_name: "Mask Network",
    },
    { market: "KRW-ARB", korean_name: "아비트럼", english_name: "Arbitrum" },
  ];

  let z = allUpbitList.filter((el: any) => el.market.substr(0, 3) === "KRW");
  console.log(z);

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
    getBinanceAllList();
  }, []);

  //바이낸스와 업비트 중복되는 코인
  const [sameList, setSameList] = useState<any>();
  useEffect(() => {
    if (!isLoading1) {
      let LastData = [];
      for (let i = 0; i < z.length; i++) {
        for (let j = 0; j < firstBinance.length; j++) {
          let upbitName = z[i].market.split("").slice(4).join("");
          let binanceName = firstBinance[j].symbol
            .split("")
            .reverse()
            .slice(4)
            .reverse()
            .join("");
          if (upbitName === binanceName) {
            LastData.push({ name: upbitName, checked: true });
          }
        }
      }
      console.log(LastData);
      setSameList(LastData);
      let resultStr = "";
      for (let i = 0; i < LastData.length; i++) {
        if (i !== 0) {
          resultStr += `,'${LastData[i]}USDT'`;
        } else {
          resultStr += `'${LastData[i]}USDT'`;
        }
      }
      console.log(resultStr);
    }
  }, [isLoading, isLoading1]);
};
