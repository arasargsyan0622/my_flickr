import "./splash.css";

const SplashPage = () => {
  return (
    <>
      <div className="splash-page-container">
        <div className="splash-page-text-container">
          <h1>Find your inspiration.</h1>
          <p>
            Join the e-flickr community, home to travel enthusiasts and
            explorists.
          </p>
        </div>
      </div>
      <ul className="slideshow">
        <li>
          <span></span>
        </li>
        <li>
          <span></span>
        </li>
        <li>
          <span></span>
        </li>
        <li>
          <span></span>
        </li>
      </ul>
    </>
  );
};

export default SplashPage;
