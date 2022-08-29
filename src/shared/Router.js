import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
<<<<<<< Updated upstream
import NaverLogin from "../components/NaverLogin";
=======
import GoogleLogin from "../components/GoogleLogin";
>>>>>>> Stashed changes

const Router = () => {

  
  return (
    <BrowserRouter>
      <Routes>
<<<<<<< Updated upstream
        <Route path="/naverlogin" element={<NaverLogin />} />
=======
      <Route path="/" element={<GoogleLogin />} />
        {/* <Route path="/main" element={<MainPage />} /> */}
>>>>>>> Stashed changes
      </Routes>
    </BrowserRouter>
  );
};
export default Router;