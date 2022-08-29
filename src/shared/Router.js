import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NaverLogin from "../components/NaverLogin";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import MainHelp from "../pages/MainHelp"
import MainPage from "../pages/MainPage";

const Router = () => {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/naverlogin" element={<NaverLogin />} />
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignUpPage />}></Route>
        <Route path="/" element={<MainPage />} />
        <Route path="/mainhelp" element={<MainHelp />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;