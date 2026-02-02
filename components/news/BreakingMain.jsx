import { useEffect, useState } from "react";
import "./Stylings/BreakingMain.css";
import { breakingNewsData } from "./contexts/NewsContext";

export default function BreakingMain() {
  const { images, title, description } = breakingNewsData;
  const [index, setIndex] = useState(0);

  // auto swipe every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  const prevImage = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const nextImage = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };


  const MAX_CHARS = 360;

const getShortDescription = (text) => {
  if (!text) return "";

  if (text.length <= MAX_CHARS) {
    return text;
  }

  return text.slice(0, MAX_CHARS) + "...";
};




  return (
    <section className="breaking-main">
      <div className="breaking-image-area">
         {/* IMAGE + CONTROLS WRAPPER */}
  <div className="image-wrapper">

    <img
      src={images[index]}
      alt="Breaking News"
      className="main-image"
    />

    {/* PROFESSIONAL CONTROLS */}
    <button className="img-btn left" onClick={prevImage}>❮</button>
    <button className="img-btn right" onClick={nextImage}>❯</button>


        {/* DOT INDICATORS */}
        {/* LINE INDICATORS */}
<div className="line-indicators">
  {images.map((_, i) => (
    <span
      key={i}
      className={i === index ? "line active" : "line"}
      onClick={() => setIndex(i)}
    />
  ))}
</div>

  </div>



      </div>

      <div className="breaking-content">
        <h2>{title}</h2>
        <p className="breaking-description">
  {getShortDescription(description)}
  {description.length > MAX_CHARS && (
    <>
      {" "}
      <a href="#" className="read-more">Read More</a>
    </>
  )}
</p>

      </div>
    </section>
  );
}