import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage/HomePage";
import ImageBrowser from "./components/ShowImages";
import CreateImage from "./components/CreateImage/index";
import UpdateImage from "./components/UpdateImage";
import SingleImagePage from "./components/SingleImage/Image";
import { Helmet } from "react-helmet";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Helmet>
          <meta charSet="utf-8" />
          <title>e-flickr</title>
          <link rel="canonical" href="http://mysite.com/example" />
          <meta name="description" content="Title and icon" />
      </Helmet>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/images" exact>
            <ImageBrowser />
          </Route>
          <Route path="/editimage/:imageId">
            <UpdateImage />
          </Route>
          <Route path="/images/:id">
            <SingleImagePage />
          </Route>
          <Route path="/add">
            <CreateImage/>
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
