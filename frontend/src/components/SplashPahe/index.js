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
    console.log("next");
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
    console.log("prev");
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
            className={index === currentSlide ? "image current" : "image"}
            key={index}
          >
            {index === currentSlide && (
              <div>
                <img src={image.image} alt="image" className="splash-image" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Slider;
