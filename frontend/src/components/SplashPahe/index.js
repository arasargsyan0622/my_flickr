import { useState, useEffect } from "react";
import { images } from "../images";
import "./slide.css"

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideLength = images.length;

  const autoScroll = true;
  let slideInterval;
  let intervalTime = 5000;

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
  };

  function auto() {
    slideInterval = setInterval(nextSlide, intervalTime);
  }

  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  useEffect(() => {
    if (autoScroll) {
      auto();
    }
    return () => clearInterval(slideInterval);
  }, [currentSlide]);

  return (
    <div className="slider">
      {images.map((image, index) => {
        return (
          <div
            className={index === currentSlide ? "image-current" : "image"}
            key={index}
          >
            {index === currentSlide && (
              <div>
                <img src={image.image} alt="" className="splash-image" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Slider;
