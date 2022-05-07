import React from "react"
import { useSelector } from "react-redux";
import Footer from "../Footer";
import ImageBrowser from "../ShowImages";
import SplashPage from "../SplashPage";


const HomePage = () => {
  const session = useSelector((state) => state.session.user);

  if (!session) {
    return (
      <>
        <SplashPage />
        <Footer />
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
