import React, { useEffect, useState } from "react";
import styled from "styled-components";

export const Header = () => {
  const [upData, setUpData] = useState<any>();
  const [upData1, setUpData1] = useState<any>();

  const [usdt, setUsdt] = useState<any>();

  useEffect(() => {
    const upbitSocket = new WebSocket("wss://api.upbit.com/websocket/v1");
    upbitSocket.onopen = (e: any) => {
      upbitSocket.send(
        '[{"ticket":"test"},{"type":"trade","codes":["KRW-BTC","USDT-BTC"]},{"format":"SIMPLE"}]'
      );
    };
    upbitSocket.onmessage = (e: any) => {
      e.data.text().then((data: any) => {
        const response = JSON.parse(data);
        // console.log(response.tp);
        setUpData(response.tp);
      });
    };
    return () => upbitSocket.close();
  }, []);
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
        console.log("환율", upData1 / response.tp);
      });
    };
    return () => upbitUsdtSocket.close();
  }, []);
  //! -------------------------  바이낸스  --------------------
  const [data, setData] = useState<any>();
  const [data1, setData1] = useState<any>();

  useEffect(() => {
    const binanceSocket = new WebSocket("wss://stream.binance.com:9443/ws");
    binanceSocket.onopen = function (e) {
      const msg = {
        method: "SUBSCRIBE",
        params: ["btcusdt@trade"],
        id: 1,
      };
      binanceSocket.send(JSON.stringify(msg));
    };

    binanceSocket.onmessage = (e) => {
      const response = JSON.parse(e.data);
      // console.log(response);
      setData(response.p);
    };
    return () => binanceSocket.close();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      // 500ms마다 데이터 처리

      setData1(~~Number(data * (upData / usdt)));
      setUpData1(upData);
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, [data]);
  return (
    <StyledContainer>
      <StyledExchaneBox>
        BTC-KRW(업비트)
        <div>{upData1}</div>
      </StyledExchaneBox>
      <StyledExchaneBox>
        BTC_KRW(바이낸스)<div>{data1}</div>
      </StyledExchaneBox>
      <StyledExchaneBox>
        시세차이 per{" "}
        <div>{(((data1 - upData1) / upData1) * 100).toFixed(2)}</div>
      </StyledExchaneBox>
      <StyledExchaneBox>
        USDT환율 <div>{(upData1 / usdt).toFixed(2)}</div>
      </StyledExchaneBox>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
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
