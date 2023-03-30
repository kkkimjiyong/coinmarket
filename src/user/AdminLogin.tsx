import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Army from "../../public/Army.png";

export const AdminLogin = () => {
  const navigate = useNavigate();
  const [id, setId] = useState<string>("");
  const [pw, setPw] = useState<string>("");

  const onLoginHandler = () => {
    if (id === "y11yny11k" && pw === "Pjhssh!6848") {
      navigate("/admin/users");
    } else {
      alert("관리자가 아닙니다");
    }
  };

  return (
    <Container>
      <Background />
      <WhiteBackground />
      <img className="img" src={Army} alt="메인이미지" />
      <Title>관리자페이지</Title>
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
  background-color: #303550;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .img {
    z-index: 3;
    margin-top: -210px;
    margin-bottom: -30px;
    width: 100%;
    max-width: 400px;
  }
`;

const Title = styled.div`
  margin-top: 10px;
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

const LoginBtn = styled.button`
  z-index: 3;
  width: 250px;
  margin-top: 50px;
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
  font-size: 14px;
  color: #9ea0c5;
  :hover {
    cursor: pointer;
    color: white;
  }
`;
