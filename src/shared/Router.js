import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NaverLogin from "../components/loginSigunUpBoard/NaverLogin";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import MainPage from "../pages/MainPage"
import InformationPage from "../pages/InformationPage";
import FreeTalkPage from "../pages/FreeTalkPage";
import SchoolInfoPage from '../pages/SchoolInfoPage';
import HelpCard from "../components/helpBoard/HelpCard";
import CalendarDetail from "../components/calendarBoard/CalendarDetail"
import CalendarUpdate from "../components/calendarBoard/CalendarUpdate"
import CalendarPage from "../pages/CalendarPage"
import HelpDetail from "../components/helpBoard/HelpDetail";
import HelpUpdate from "../components/helpBoard/HelpUpdate";
import InformationDetail from "../components/informationBoard/InformationDetail";
import InformationUpdate from "../components/informationBoard/InformationUpdate";
import FreeTalkDetail from "../components/freeTalkBoard/FreeTalkDetail"
import FreeTalkUpdate from "../components/freeTalkBoard/FreeTalkUpdate"
import SearchPage from "../pages/SearchPage";
import SearchCard from "../components/searchBoard/SearchCard";
import ChatPage from "../pages/ChatPage"
import SignupCompletePage from '../pages/SignupCompletePage';
import NoticePage from "../pages/NoticePage";
import MyPage from "../pages/MyPage";
import Splash from "../components/loginSigunUpBoard/Splash";
import { getCookie } from "./cookies";
import { Navigate } from "react-router-dom";
import FormPage from "../pages/FormPage";
import ChatDetail from "../components/chatBoard/ChatDetail"

const Router = () => {

  const token = getCookie("accessToken")
  // console.log(token);

  return (
    // <BrowserRouter>
    <Routes>
      {/* <Route path="/" element={<Splash />} /> */}
      <Route path="/" element={token ? <Navigate to="/main" /> : <Splash />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/naverlogin" element={<NaverLogin />} />
      <Route path="/schoolinfo" element={<SchoolInfoPage />}></Route>
      {/* <Route path="/login" element={token ? <Navigate to="/main" /> : <LoginPage />}/> */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={token ? <Navigate to="/main" /> : <SignUpPage />} />
      {/* <Route path="/signup" element={<SignUpPage />}/> */}
      <Route path="/information" element={<InformationPage />} />
      <Route path="/freetalk" element={<FreeTalkPage />} />
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/signupcomplete" element={<SignupCompletePage />} />
      <Route path="/notice" element={<NoticePage />} />
      <Route path="/mypage" element={<MyPage />} />
      {/* 하단 페이지 추후 정리 */}
      <Route path="/helpcard" element={<HelpCard />} />
      <Route path="/searchcard" element={<SearchCard />} />
      <Route path="/form" element={<FormPage />} />
      <Route path="/helpdetail/:id" element={<HelpDetail />} />
      <Route path="/helpupdate/:id" element={<HelpUpdate />} />
      <Route path="/informationdetail/:id" element={<InformationDetail />} />
      <Route path="/informationupdate/:id" element={<InformationUpdate />} />
      <Route path="/freetalkdetail/:id" element={<FreeTalkDetail />} />
      <Route path="/freetalkupdate/:id" element={<FreeTalkUpdate />} />
      <Route path="/calendardetail/:id" element={<CalendarDetail />} />
      <Route path="/calendarupdate/:id" element={<CalendarUpdate />} />
      <Route path="/chat/:id" element={<ChatDetail />} />
    </Routes>
    // </BrowserRouter>
  );
};
export default Router;