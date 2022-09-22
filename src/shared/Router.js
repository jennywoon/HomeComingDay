import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NaverLogin from "../components/loginSigunUpBoard/NaverLogin";
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
import CalendarDetail from "../components/calendarBoard/CalendarDetail"
import CalendarUpdate from "../components/calendarBoard/CalendarUpdate"
import CalendarPage from "../pages/CalendarPage"
import Form2 from "../components/test/Form2";
import HelpDetail from "../components/helpBoard/HelpDetail";
import HelpUpdate from "../components/helpBoard/HelpUpdate";
import InformationDetail from "../components/informationBoard/InformationDetail";
import InformationUpdate from "../components/informationBoard/InformationUpdate";
import FreeTalkDetail from "../components/freeTalkBoard/FreeTalkDetail"
import FreeTalkUpdate from "../components/freeTalkBoard/FreeTalkUpdate"
import SearchPage from "../pages/SearchPage";
import SearchCard from "../components/searchBoard/SearchCard";
import ChatPage from "../pages/ChatPage"
import ChatFormPage from "../pages/ChatFormPage"
import SignupCompletePage from '../pages/SignupCompletePage';
import NoticePage from "../pages/NoticePage";
import MyPage from "../pages/MyPage";
import Splash from "../components/loginSigunUpBoard/Splash";
// import LoginErrorModal from "../components/loginSigunUpBoard/LoginErrorModal";
import { useSelector } from "react-redux";
import { getCookie } from "./cookies";
import { Navigate } from "react-router-dom";
import FormPage from "../pages/FormPage";
import ChatFrontTest from "../components/chatBoard/ChatFrontTest";

const Router = () => {

  const token = getCookie("accessToken")
  console.log(token);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/main" element={<MainPage />} />
        <Route path="/naverlogin" element={<NaverLogin />} />
        <Route path="/schoolinfo" element={<SchoolInfoPage />}></Route>
        <Route path="/login" element={token ? <Navigate to="/main" /> : <LoginPage />}/>
        {/* <Route path="/login" element={token ? <Navigate to="/main" /> : <Navigate to="/login" />}/> */}
        <Route path="/signup" element={token ? <Navigate to="/main" /> :<SignUpPage />}/>
        <Route path="/helpform" element={<HelpForm />}/>
        <Route path="/informationform" element={<InformationForm />}/>
        <Route path="/information" element={<InformationPage />} />
        <Route path="/freetalk" element={<FreeTalkPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/chatform" element={<ChatFormPage />} />
        <Route path="/signupcomplete" element={<SignupCompletePage />} />
        <Route path="/notice" element={<NoticePage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/" element={<Splash />} />
        {/* 하단 페이지 추후 정리 */}
        <Route path="/test" element={<ScrollTest />} />
        <Route path="/helpcard" element={<HelpCard />} />
        <Route path="/freetest" element={<FreeTalkForm />} />
        <Route path="/searchcard" element={<SearchCard />} />
        {/* <Route path="/form" element={<Form2 />} /> */}
        <Route path="/form" element={<FormPage />} />
        <Route path="/helpdetail/:id" element={<HelpDetail />} />
        <Route path="/helpupdate/:id" element={<HelpUpdate />} />
        <Route path="/informationdetail/:id" element={<InformationDetail />} />
        <Route path="/informationupdate/:id" element={<InformationUpdate />} />
        <Route path="/freetalkdetail/:id" element={<FreeTalkDetail />} />
        <Route path="/freetalkupdate/:id" element={<FreeTalkUpdate />} />
        <Route path="/calendardetail/:id" element={<CalendarDetail />} />
        <Route path="/calendarupdate/:id" element={<CalendarUpdate />} />
        <Route path="/chattest" element={<ChatFrontTest />} />

      </Routes>
    </BrowserRouter>
  );
};
export default Router;