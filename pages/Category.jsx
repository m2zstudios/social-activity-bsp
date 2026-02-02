import { useParams } from "react-router-dom";
import MainLayout from "../components/common/MainLayout";
import CategoryHero from "../components/news/CategoryHero";
import CategoryGrid from "../components/news/CategoryGrid";
import { tempCategoryNews } from "../Context/TempData.jsx";
import "./Stylings/Category.css";

const Category = () => {
  const { name } = useParams();

  // category filter
  const categoryNews = tempCategoryNews
    .filter(
      (news) => news.category.toLowerCase() === name.toLowerCase()
    )
    .sort((a, b) => b.uploadedAt - a.uploadedAt);

  const heroNews = categoryNews[0];      // latest = hero
  const restNews = categoryNews.slice(1);

  return (
    <MainLayout>
      <h1 className="category-title">
        {name.toUpperCase()} News
      </h1>

      {heroNews && <CategoryHero news={heroNews} />}

      <CategoryGrid newsList={restNews} />
    </MainLayout>
  );
};

export default Category;
