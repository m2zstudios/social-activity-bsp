import { useMemo, useState } from "react";
import { tempCategoryNews } from "../../Context/TempData.jsx";
import { useNavigate } from "react-router-dom";
import "./Stylings/HomeNewsCategory2.css";

const VISIBLE = 3;
const MAX_PER_CATEGORY = 10;

const HomeNewsCategory2 = ({ categoryName }) => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  const categoryNews = useMemo(() => {
    return tempCategoryNews
      .filter(n => n.category === categoryName)
      .sort((a, b) => b.uploadedAt - a.uploadedAt)
      .slice(0, MAX_PER_CATEGORY);
  }, [categoryName]);

  const maxIndex = Math.max(categoryNews.length - VISIBLE, 0);

  return (
    <section className="home-category-section">
      <h2>{categoryName}</h2>

      <div className="carousel-wrapper">
        {/* LEFT ARROW */}
        <button
          className="slay-btn"
          onClick={() => setIndex(i => Math.max(i - 1, 0))}
          disabled={index === 0}
        >
          ‹
        </button>

        {/* CAROUSEL */}
        <div className="carousel-viewport">
          <div
            className="carousel-track"
            style={{
              transform: `translateX(-${index * (100 / VISIBLE)}%)`
            }}
          >
            {categoryNews.map(news => (
              <div className="carousel-item" key={news.id}>
                <img src={news.newsimg} alt={news.title} />
                <h3>{news.title}</h3>

                <button
                  className="rm-btn"
                  onClick={() => navigate(`/category/${categoryName}/${news.id}`)}
                >
                  Read More
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT ARROW / SEE MORE */}
        {index < maxIndex ? (
          <button
            className="slay-btn"
            onClick={() => setIndex(i => Math.min(i + 1, maxIndex))}
          >
            ›
          </button>
        ) : (
          <button
            className="see-more-btn"
            onClick={() => navigate(`/category/${categoryName}`)}
          >
            See More
          </button>
        )}
      </div>
    </section>
  );
};

export default HomeNewsCategory2;
