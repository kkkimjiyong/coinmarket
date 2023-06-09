import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { supabase } from "../lib/supabase";

export const AdminLogin = () => {
  const navigate = useNavigate();
  const [id, setId] = useState<string>("");
  const [pw, setPw] = useState<string>("");
  const onLoginHandler = async () => {
    try {
      const { data } = await supabase
        .from("admin")
        .select("num")
        .eq("id", id)
        .eq("pw", pw);
      console.log(data);
      if (data?.length === 1) {
        navigate("/admin/users");
      } else {
        alert("관리자가 아닙니다");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      {/* <Background />
      <WhiteBackground />
      <img className="img" src={Army} alt="메인이미지" /> */}
      <Title>Admin</Title>
      <Input
        onChange={(e) => setId(e.target.value)}
        placeholder="아이디를 입력해주세요"
      />
      <Input
        onChange={(e) => setPw(e.target.value)}
        placeholder="비밀번호를 입력해주세요"
      />
      <LoginBtn onClick={onLoginHandler}>로그인</LoginBtn>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #000000;
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
  font-family: "Lobster", cursive;
  letter-spacing: 2px;
  color: #00ffff;
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 100px;
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

const LoginBtn = styled.button`
  z-index: 3;
  width: 250px;
  margin-top: 50px;
  height: 40px;
  border-radius: 15px;
  border: none;
  background-color: #00ffff;
  font-size: 16px;
  font-weight: 700;
  :hover {
    background-color: #1b1f31;
    color: #474646;
    cursor: pointer;
    box-shadow: 8px 8px 12px 3px rgba(0, 0, 0, 0.25) inset;
  }
`;

const SignUpTxt = styled.div`
  z-index: 3;
  margin-top: 20px;
  text-decoration: underline;
  font-size: 14px;
  color: gray;
  :hover {
    cursor: pointer;
    color: white;
  }
`;
