import React from "react";
import Router from "./shared/Router";
import { useMediaQuery } from "react-responsive"
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

function App() {
  const isPc = useMediaQuery({
    query: "(min-width:1024px)"
  });
  const isTablet = useMediaQuery({
    query: "(min-width:768px) and (max-width:1023px)"
  });
  const isMobile = useMediaQuery({
    query: "(max-width:767px)"
  });

  return (
    <>
      {/* <Router /> */}
      {isPc && <Router />}
      {isTablet && <Router />}
      {isMobile && <Router />}
    </>
  )
}

export default App;
