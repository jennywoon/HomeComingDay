import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NaverLogin from "../components/NaverLogin";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import MainPage from "../pages/MainPage"
import Test from "../components/Test";

const Router = () => {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/naverlogin" element={<NaverLogin />} />
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignUpPage />}></Route>
        <Route path="/" element={<MainPage />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;