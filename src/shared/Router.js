import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NaverLogin from "../components/NaverLogin";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import MainPage from "../pages/MainPage"

import HelpForm from "../components/helpBoard/HelpForm";

import InformationPage from "../pages/InformationPage";
import FreeTalkPage from "../pages/FreeTalkPage";
import SchoolInfoPage from '../pages/SchoolInfoPage';
import ScrollTest from "../components/test/ScrollTest"
import InformationForm from "../components/informationBoard/InformationForm";
import HelpCard from "../components/helpBoard/HelpCard";
import FreeTalkForm from "../components/freeTalkBoard/FreeTalkForm"
import CalendarPage from "../pages/CalendarPage"
import Form from "../components/test/Form"
import HelpDetail from "../components/helpBoard/HelpDetail";
import HelpUpdate from "../components/helpBoard/HelpUpdate";

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
        <Route path="/informationform" element={<InformationForm />}/>
        <Route path="/information" element={<InformationPage />} />
        <Route path="/freetalk" element={<FreeTalkPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        {/* 하단 페이지 추후 정리 */}
        <Route path="/test" element={<ScrollTest />} />
        <Route path="/helpcard" element={<HelpCard />} />
        <Route path="/freetest" element={<FreeTalkForm />} />
        <Route path="/form" element={<Form />} />
        <Route path="/helpdetail/:id" element={<HelpDetail />} />

        <Route path="/helpupdate/:id" element={<HelpUpdate />} />

      </Routes>
    </BrowserRouter>
  );
};
export default Router;