import React from "react";
import Router from "./shared/Router";
import { BrowserView, MobileView } from 'react-device-detect'
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <>
      {/* <Router /> */}
      <BrowserView><Router/></BrowserView>
      <MobileView><Router/></MobileView>
    </>
  )
}

export default App;
