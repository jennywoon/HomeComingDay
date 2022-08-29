import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NaverLogin from "../components/NaverLogin";
import MainHelp from "../pages/MainHelp"

const Router = () => {

  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/naverlogin" element={<NaverLogin />} />
        <Route path="/mainhelp" element={<MainHelp />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;