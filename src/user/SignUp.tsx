import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Army from "../../public/Army.png";
import { supabase } from "../lib/supabase";
import { defaultCoinList } from "../assets/defaultCoinList";

export const SignUp = () => {
  const navigate = useNavigate();
  const [id, setId] = useState<string>("");
  const [pw, setPw] = useState<string>("");
  const [errorIdTxt, setErrorIdTxt] = useState<string>("");
  const [errorPwTxt, setErrorPwTxt] = useState<string>("");
  const [submitChk, setSubmitChk] = useState<boolean>(false);

  useEffect(() => {
    setErrorIdTxt("");
    if (id.trim().length < 4 || id.trim().length > 6) {
      setErrorIdTxt("4~6자리의 아이디를 입력해주세요");
    } else {
    }
  }, [id]);
  useEffect(() => {
    setErrorPwTxt("");
    if (pw.trim().length < 6 || pw.trim().length > 8) {
      setErrorPwTxt("6~8자리의 비밀번호를 입력해주세요");
    }
  }, [pw]);
  console.log(errorIdTxt);
  console.log(id);

  //! ======== supabase 함수 ================

  const postSignUp = async () => {
    let coinList: any = [];
    for (let i = 0; i < defaultCoinList.length; i++) {
      coinList.push({
        name: defaultCoinList[i],
        checked: true,
      });
    }
    try {
      const { data, error }: any = await supabase
        .from("user")
        .select("id")
        .eq("id", id);
      console.log(data.length);
      if (data.length >= 1) {
        alert("이미 존재하는 아이디입니다");
      } else {
        try {
          await supabase.from("user").insert({
            id,
            pw,
            coinList,
          });
          alert("회원가입 성공");
          navigate("/");
        } catch (error) {
          alert(error);
        }
      }
    } catch (error) {
      alert("이미 존재하는 아이디입니다");
    }
  };

  const onSubmitHandler = () => {
    if (errorIdTxt || errorPwTxt) {
      setSubmitChk(true);
    } else {
      postSignUp();
    }
  };

  return (
    <Container>
      <Background />
      <WhiteBackground />
      <img
        className="img"
        src={Army}
        alt="메인이미지"
        onClick={() => navigate("/")}
      />
      <SignUpTxt onClick={() => navigate("/")} className="imgTxt">
        클릭 시, 로그인페이지로 돌아갑니다
      </SignUpTxt>
      {/* <Title>CoinMarket</Title> */}
      <Input
        onChange={(e) => setId(e.target.value)}
        placeholder="4~6자리의 아이디를 입력해주세요"
      />
      {errorIdTxt && submitChk && <ErrorTxt>{errorIdTxt}</ErrorTxt>}
      <Input
        onChange={(e) => setPw(e.target.value)}
        type={"password"}
        placeholder="6~8자리의 비밀번호를 입력해주세요"
      />
      {errorPwTxt && submitChk && <ErrorTxt>{errorPwTxt}</ErrorTxt>}
      <LoginBtn onClick={onSubmitHandler}>회원가입</LoginBtn>
      <SignUpTxt>회원가입 요청 후, 관리자 승인이 필요합니다</SignUpTxt>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #303550;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .img {
    z-index: 3;
    margin-top: -200px;
    margin-bottom: -30px;
    width: 100%;
    max-width: 400px;
  }
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
`;

const WhiteBackground = styled.div`
  position: absolute;
  margin-bottom: 450px;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: rgb(255, 255, 255);
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.665893271461717) 0%,
    rgba(255, 255, 255, 0) 100%
  );
`;

const Background = styled.div`
  z-index: 2;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgb(122, 69, 69);
  background: radial-gradient(
    circle,
    rgba(122, 69, 69, 0) 0%,
    rgba(0, 0, 0, 1) 100%
  );
`;

const Input = styled.input`
  margin-top: 20px;
  border: none;
  border-radius: 5px;
  height: 40px;
  padding: 0 15px;
  width: 250px;
  z-index: 3;
`;

const ErrorTxt = styled.div`
  margin-top: 5px;
  color: red;
  font-size: 12px;
`;

const LoginBtn = styled.button`
  z-index: 3;
  width: 250px;
  margin-top: 40px;
  height: 40px;
  border-radius: 15px;
  border: none;
  background-color: #303550;
  color: white;
  font-size: 16px;
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

const SignUpTxt = styled.div`
  z-index: 3;
  margin-top: 20px;
  text-decoration: underline;
  font-size: 12px;
  color: #9ea0c5;
  &.imgTxt {
    text-decoration: none;
    margin-top: 0;
    color: #9ea0c595;
    :hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
`;
