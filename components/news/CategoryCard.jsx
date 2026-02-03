import { Link } from "react-router-dom";
import "./Stylings/CategoryCard.css";

const CategoryCard = ({ news }) => {
  const isLoading = Boolean(news?.isLoading);

  const createdAtLabel = news?.createdAt
    ? new Date(news.createdAt).toLocaleDateString()
    : null;

  return (
    <div className="category-card">
      <div className="CardImageContainer">
        <img
          src={news.newsimg || "/placeholder.png"}
          onError={(e) => {
            e.target.src = "/placeholder.png";
          }}
          loading="lazy"
          alt={news.title}
        />
      </div>
      <div className="category-card-content">
        {createdAtLabel && (
          <p className="category-card-date">{createdAtLabel}</p>
        )}
        <h3 className="category-card-title">{news.title}</h3>

        {isLoading ? (
          <span className="category-card-link is-loading">Loading...</span>
        ) : (
          <Link
            className="category-card-link"
            to={`/category/${news.category}/${news.id}`}
          >
            Read More
          </Link>
        )}
      </div>
    </div>
  );
};

export default CategoryCard;
