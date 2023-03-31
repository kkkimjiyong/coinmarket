import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Add } from "../Add";
import { Index } from "../Index";
import { AdminLogin } from "../user/AdminLogin";
import { AdminUsers } from "../user/AdminUsers";
import { Login } from "../user/Login";
import { SignUp } from "../user/SignUp";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/add" element={<Add />} />
        <Route path="/main" element={<Index />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};
