import React from "react"
import { useSelector } from "react-redux";
import Navigation from "../Navigation";
import ImageBrowser from "../ShowImages";
import SplashPage from "../SplashPage";
import Slider from "../SplashPahe";


const HomePage = () => {
  const session = useSelector((state) => state.session.user);

  if (!session) {
    return (
      <>
        <Slider />
        {/* <Navigation /> */}
      </>
    );
  } else {
    return (
      <>
        <ImageBrowser />
      </>
    );
  }
};

export default HomePage
