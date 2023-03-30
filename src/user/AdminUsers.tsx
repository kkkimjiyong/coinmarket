import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Army from "../../public/Army.png";
import { Loading } from "../components/Loading";
import { supabase } from "../lib/supabase";
import { IoMdClose } from "react-icons/io";

export const AdminUsers = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<any>();
  const [clickedUser, setClickedUser] = useState<any>();
  const getUsers = async () => {
    try {
      const { data, error } = await supabase.from("user").select(`id,pw`);
      console.log(data);
      setUsers(data);
      setTimeout(() => {
        setIsLoading(false);
      }, 1200);
    } catch (error) {}
  };

  const deleteUser = async (user: any) => {
    try {
      const { data, error } = await supabase
        .from("user")
        .delete()
        .eq("id", user.id)
        .eq("pw", user.pw)
        .select("id,pw");
      alert("삭제되었습니다");
      setUsers(data);
    } catch (error) {}
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <Container>
      {isLoading && <Loading />}
      <Background />
      <WhiteBackground />
      <img className="img" src={Army} alt="메인이미지" />
      <Header>클릭 시, 회원이 삭제됩니다.</Header>
      {users?.map((el: any) => {
        return (
          <UserBox onClick={() => deleteUser(el)}>
            <UserItem>{el.id}</UserItem>
            <UserItem>{el.pw}</UserItem>
            <IoMdClose />
          </UserBox>
        );
      })}
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

const Header = styled.div`
  z-index: 4;
  margin-top: 15px;
  width: 80%;
  max-width: 300px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  background-color: #303550;
  font-size: 14px;
  font-weight: 700;
  box-shadow: 12px 12px 16px 0 rgba(0, 0, 0, 0.25),
    -2px -3px 4px 0 rgba(255, 255, 255, 0.3);

  color: gray;
`;

const UserBox = styled.div`
  z-index: 4;
  margin-top: 15px;
  width: 80%;
  max-width: 300px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  background-color: #303550;
  font-size: 14px;
  font-weight: 700;
  box-shadow: 12px 12px 16px 0 rgba(0, 0, 0, 0.25),
    -2px -3px 4px 0 rgba(255, 255, 255, 0.3);
  :hover {
    background-color: #1b1f31;
    color: gray;
    cursor: pointer;
    box-shadow: 8px 8px 12px 3px rgba(0, 0, 0, 0.25) inset;
  }
  &.header {
    color: gray;
  }
`;

const UserItem = styled.div`
  &.header {
    color: gray;
  }
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
