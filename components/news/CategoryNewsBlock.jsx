// src/components/CategoryNewsBlock.jsx
import { useNavigate } from "react-router-dom";
import "./Stylings/CategoryNewsBlock.css";

const MAX_TITLE_LENGTH = 90;

const CategoryNewsBlock = ({ news }) => {
  const navigate = useNavigate();

  const truncatedTitle =
    news.title.length > MAX_TITLE_LENGTH
      ? news.title.slice(0, MAX_TITLE_LENGTH) + "..."
      : news.title;

  return (
    <div className="category-news-block">
      <img
        src={news.image}
        alt={news.title}
        className="news-image"
      />

      <h3 className="news-title">
        {truncatedTitle}
        {news.title.length > MAX_TITLE_LENGTH && (
          <span
            className="read-more-inline"
            onClick={() => navigate(`/news/${news.id}`)}
          >
            {" "}Read More
          </span>
        )}
      </h3>

      <button
        className="read-more-btn"
        onClick={() => navigate(`/news/${news.id}`)}
      >
        Read More
      </button>
    </div>
  );
};

export default CategoryNewsBlock;
