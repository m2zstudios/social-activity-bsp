import CategoryCard from "./CategoryCard";
import "./Stylings/CategoryGrid.css";

const CategoryGrid = ({ newsList }) => {
  return (
    <div className="category-grid">
      {newsList.map((news) => (
        <CategoryCard key={news.id} news={news} />
      ))}
    </div>
  );
};

export default CategoryGrid;
