import { useEffect, useRef } from "react";
import "./Stylings/NewsMarquee.css";
import { marqueeNews } from "./contexts/NewsContext";

export default function NewsMarquee() {
  const { headline1, headline2, headline3 } = marqueeNews;

  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let x = 0;
    let speed = 0.6;
    let rafId;

    const animate = () => {
      const halfWidth = track.scrollWidth / 2;

      x -= speed;

      // 🔁 PERFECT LOOP POINT
      if (x <= -halfWidth) {
        x = 0;
      }

      track.style.transform = `translateX(${x}px)`;
      rafId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div className="news-marquee">
      <div className="marquee-label">Breaking News</div>

      <div className="marquee-wrapper">
        <div className="marquee-track" ref={trackRef}>
          <span>{headline1}</span>
          <span>{headline2}</span>
          <span>{headline3}</span>

          {/* duplicate */}
          <span>{headline1}</span>
          <span>{headline2}</span>
          <span>{headline3}</span>
        </div>
      </div>
    </div>
  );
}
