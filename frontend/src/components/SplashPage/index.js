import { useHistory } from "react-router-dom";
import "./splash.css";

const SplashPage = () => {
  const history = useHistory()

  return (
    <>
      <div className="splash-page-container">
        <div className="splash-page-text-container">
          <h1>Find your inspiration</h1>
          <button className="splash-btn" onClick={() => history.push("/signup")}>Start for free</button>
        </div>
      </div>
      <ul className="slide">
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
