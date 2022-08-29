import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../components/Header";
import Layout from "../components/Layout";
import NaverLogin from "../components/NaverLogin";
import MainHelp from "../pages/MainHelp"
import MainPage from "../pages/MainPage";

const Router = () => {

  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/naverlogin" element={<NaverLogin />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/mainhelp" element={<MainHelp />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;