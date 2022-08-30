import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NaverLogin from "../components/NaverLogin";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import MainPage from "../pages/MainPage"

import HelpForm from "../components/helpBoard/HelpForm";

import InformationPage from "../pages/InformationPage";
import FreeTalkPage from "../pages/FreeTalkPage";
import ScrollTest from "../components/test/ScrollTest"
import InformationForm from "../components/informationBoard/InformationForm";
import CalendarTest from "../components/test/CalendarTest";


const Router = () => {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/naverlogin" element={<NaverLogin />} />
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/signup" element={<SignUpPage />}/>
        <Route path="/" element={<MainPage />} />

        <Route path="/helpform" element={<HelpForm />}/>

        <Route path="/information" element={<InformationPage />} />
        <Route path="/freetalk" element={<FreeTalkPage />} />
        {/* 하단 페이지 추후 정리 */}
        <Route path="/test" element={<ScrollTest />} />
        <Route path="/calendar" element={<CalendarTest />} />
        <Route path="/informationtest" element={<InformationForm />} />

      </Routes>
    </BrowserRouter>
  );
};
export default Router;