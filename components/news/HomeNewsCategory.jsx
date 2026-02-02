// src/components/HomeNewsCategory.jsx
import { useMemo, useState } from "react";
import { tempCategoryNews } from "../../Context/TempData";
import CategoryNewsBlock from "./CategoryNewsBlock";
import "./Stylings/HomeNewsCategory.css";
import { useNavigate } from "react-router-dom";

const MAX_VISIBLE = 3;
const MAX_PER_CATEGORY = 10;

const HomeNewsCategory = ({ categoryName }) => {
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(MAX_VISIBLE);

  const categoryNews = useMemo(() => {
    return tempCategoryNews
      .filter(news => news.category === categoryName)
      .sort((a, b) => b.uploadedAt - a.uploadedAt)
      .slice(0, MAX_PER_CATEGORY);
  }, [categoryName]);

  const showLoadMore = visibleCount < categoryNews.length;

  return (
    <section className="home-category-section">
      <div className="category-header">
        <h2>{categoryName}</h2>
      </div>

      <div className="category-news-row">
        {categoryNews.slice(0, visibleCount).map(news => (
          <CategoryNewsBlock key={news.id} news={news} />
        ))}

        {showLoadMore ? (
          <button
            className="arrow-btn"
            onClick={() => setVisibleCount(prev => prev + 3)}
          >
            →
          </button>
        ) : (
          <button
            className="see-more-btn"
            onClick={() => navigate(`/category/${categoryName.toLowerCase()}`)}
          >
            See More
          </button>
        )}
      </div>
    </section>
  );
};

export default HomeNewsCategory;
