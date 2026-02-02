import { Link } from "react-router-dom";
import "./Stylings/CategoryCard.css";

const CategoryCard = ({ news }) => {
  return (
    <div className="category-card">
      <div className="CardImageContainer">
      <img 
      src={news.newsimg || "/placeholder.png"}
      onError={(e) => e.target.src = "/placeholder.png"}
      loading="lazy"
      alt={news.title} />
      </div>
      <h3>{news.title}</h3>

      <Link to={`/category/${news.category}/${news.id}`}>
        Read More
      </Link>
    </div>
  );
};

export default CategoryCard;
