import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../components/common/MainLayout";
import CategoryHero from "../components/news/CategoryHero";
import CategoryGrid from "../components/news/CategoryGrid";
import { databases, Query } from "../admin/appwrite/appwrite";
import { getFirstImageFromBlocks } from "../admin/components/utils/newsHelpers";
import "./Stylings/Category.css";

const Category = () => {
  const { name } = useParams();
  const [categoryNews, setCategoryNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchNews = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const res = await databases.listDocuments(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_POSTS_COLLECTION_ID,
          [
            Query.equal("category", name),
            Query.equal("status", "published"),
            Query.orderDesc("createdDate"),
            Query.limit(50),
          ]
        );

        const mapped = res.documents.map((doc) => {
          const heroImage = doc.hero || getFirstImageFromBlocks(doc.blocks);
          const createdAt = doc.createdDate || doc.$createdAt;
          return {
            id: doc.$id,
            category: doc.category,
            title: doc.title,
            newsimg: heroImage || "/placeholder.png",
            createdAt,
          };
        });

        const sorted = mapped.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        if (isMounted) {
          setCategoryNews(sorted);
        }
      } catch (err) {
        console.error("Failed to load category news", err);
        if (isMounted) {
          setError("Failed to load news right now.");
          setCategoryNews([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchNews();

    return () => {
      isMounted = false;
    };
  }, [name]);

  const { heroNews, restNews } = useMemo(() => {
    const hero = categoryNews[0] || null;
    return {
      heroNews: hero,
      restNews: categoryNews.slice(1),
    };
  }, [categoryNews]);

  return (
    <MainLayout>
      <h1 className="category-title">
        {name.toUpperCase()} News
      </h1>

      {error && <p>{error}</p>}

      {(heroNews || isLoading) && (
        <CategoryHero
          news={heroNews}
          categoryName={name}
          isLoading={isLoading}
        />
      )}

      <CategoryGrid
        newsList={restNews}
        isLoading={isLoading}
        emptyMessage="No news published yet."
      />
    </MainLayout>
  );
};

export default Category;
