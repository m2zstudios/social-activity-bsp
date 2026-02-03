import CategoryCard from "./CategoryCard";
import "./Stylings/CategoryGrid.css";

const CategoryGrid = ({ newsList, isLoading = false, emptyMessage }) => {
  const loadingItems = Array.from({ length: 6 }, (_, index) => ({
    id: `loading-${index}`,
    title: "Loading...",
    newsimg: "/placeholder.png",
    category: "",
    isLoading: true,
  }));

  const items = isLoading ? loadingItems : newsList;

  if (!isLoading && (!newsList || newsList.length === 0)) {
    return <p className="category-grid-empty">{emptyMessage}</p>;
  }

  return (
    <div className="category-grid">
      {items.map((news) => (
        <CategoryCard key={news.id} news={news} />
      ))}
    </div>
  );
};

export default CategoryGrid;
