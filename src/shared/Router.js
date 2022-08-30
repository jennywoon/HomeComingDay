import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NaverLogin from "../components/NaverLogin";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import MainPage from "../pages/MainPage"

import HelpForm from "../components/HelpForm";

import InformationPage from "../pages/InformationPage";
import FreeTalkPage from "../pages/FreeTalkPage";
import SchoolInfoPage from '../pages/SchoolInfoPage';
import ScrollTest from "../components/test/ScrollTest"
import InformationCard from "../components/InformationCard";
import InformationForm from "../components/InformationForm";
import CalendarTest from "../components/test/CalendarTest";

const Router = () => {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/naverlogin" element={<NaverLogin />} />
        <Route path="/schoolinfo" element={<SchoolInfoPage />}></Route>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/signup" element={<SignUpPage />}/>
        <Route path="/helpform" element={<HelpForm />}/>
        <Route path="/information" element={<InformationPage />} />
        <Route path="/freetalk" element={<FreeTalkPage />} />
        {/* 하단 페이지 추후 정리 */}
        <Route path="/test" element={<ScrollTest />} />
        <Route path="/calendar" element={<CalendarTest />} />
        <Route path="/informationtest" element={<InformationForm />} />
        <Route path="/informationtest2" element={<InformationCard />} />

      </Routes>
    </BrowserRouter>
  );
};
export default Router;