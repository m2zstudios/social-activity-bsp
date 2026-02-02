import { Link } from "react-router-dom";
import "./Stylings/CategoryHero.css";

const CategoryHero = ({ news }) => {
  return (
    <div className="category-heroic">
      <img src={news.newsimg} alt={news.title} />

      <div className="overlay">
        <h2>{news.title}</h2>
        <Link to={`/category/${news.category}/${news.id}`}>
          Read Full Story
        </Link>
      </div>
    </div>
  );
};

export default CategoryHero;
