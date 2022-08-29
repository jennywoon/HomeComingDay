import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NaverLogin from "../components/NaverLogin";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import MainPage from "../pages/MainPage"
import InformationPage from "../pages/InformationPage";
import FreeTalkPage from "../pages/FreeTalkPage";

const Router = () => {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/naverlogin" element={<NaverLogin />} />
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignUpPage />}></Route>
        <Route path="/" element={<MainPage />} />
        <Route path="/information" element={<InformationPage />} />
        <Route path="/freetalk" element={<FreeTalkPage />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;