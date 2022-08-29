import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NaverLogin from "../components/NaverLogin";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";

const Router = () => {

  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/naverlogin" element={<NaverLogin />} />
        <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/signup" element={<SignUpPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
export default Router;