import { Link } from "react-router-dom";
import "./Stylings/CategoryHero.css";

const CategoryHero = ({ news, categoryName, isLoading = false }) => {
  if (!news && !isLoading) {
    return null;
  }

  const publishedAt = news?.createdAt
    ? new Date(news.createdAt).toLocaleDateString()
    : null;

  return (
    <div className={`category-heroic${isLoading ? " loading" : ""}`}>
      {news ? (
        <img
          src={news.newsimg}
          alt={news.title}
          onError={(e) => {
            e.currentTarget.src = "/placeholder.png";
          }}
          loading="lazy"
        />
      ) : (
        <div className="category-hero-image-placeholder" />
      )}

      <div className="overlay">
        <div className="category-hero-meta">
          {categoryName && (
            <span className="category-hero-tag">{categoryName}</span>
          )}
          {publishedAt && (
            <span className="category-hero-date">{publishedAt}</span>
          )}
        </div>
        <h2>{news ? news.title : "Loading latest story..."}</h2>
        {news && (
          <Link to={`/news/${news.slug}`}>
            Read Full Story
          </Link>
        )}
      </div>
    </div>
  );
};

export default CategoryHero;
