import React from "react";
import styled, { keyframes } from "styled-components";

export const Loading = ({ text }: { text?: string }) => {
  return (
    <Container>
      <Wrap>
        <Spinner></Spinner>
        <HelpTxt>{text ? `${text}` : "잠시만 기다려 주세요.."}</HelpTxt>
      </Wrap>
    </Container>
  );
};

const spin = keyframes`
    from {transform: rotate(0deg); }
  to {transform: rotate(360deg);}
`;

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #17171bf9;
  opacity: 0.7;
`;

const RowLogo = styled.img`
  position: absolute;
  width: 60%;
  left: 3%;
  top: 5%;
`;

const BackGroundImg = styled.img`
  width: 100%;
  position: absolute;
  z-index: -1;
`;

const HelpTxt = styled.div`
  position: absolute;
  margin-top: 200px;
  color: var(--color-thickSub);
  font-weight: 700;
`;

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: transparent;
`;

const Spinner = styled.div`
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 64px;
  height: 64px;
  margin-top: -32px;
  margin-left: -32px;
  border-radius: 50%;
  border: 8px solid transparent;
  border-top-color: var(--color-main);
  border-bottom-color: var(--color-main);
  animation: ${spin} 0.8s ease infinite;
`;
