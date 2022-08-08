import React from "react"
import { useSelector } from "react-redux";
import Footer from "../Footer";
import SplashPage from "../SplashPage";
import LoggedSplash from "../LoggedSplash";

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
        <LoggedSplash />
      </>
    );
  }
};

export default HomePage
