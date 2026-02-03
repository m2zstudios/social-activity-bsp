import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { databases, Query } from "../../admin/appwrite/appwrite";
import { getFirstImageFromBlocks } from "../../admin/components/utils/newsHelpers";
import "./Stylings/HomeNewsCategory2.css";

const VISIBLE = 3;
const MAX_PER_CATEGORY = 10;

const HomeNewsCategory2 = ({ categoryName }) => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
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
            Query.equal("category", categoryName),
            Query.equal("status", "published"),
            Query.orderDesc("createdDate"),
            Query.limit(MAX_PER_CATEGORY),
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

        if (isMounted) {
          setCategoryNews(mapped);
          setIndex(0);
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
  }, [categoryName]);

  const newsToRender = useMemo(() => {
    if (isLoading) {
      return Array.from({ length: VISIBLE }, (_, idx) => ({
        id: `loading-${categoryName}-${idx}`,
        title: "Loading...",
        newsimg: "/placeholder.png",
      }));
    }

    return categoryNews;
  }, [categoryName, categoryNews, isLoading]);

  const maxIndex = Math.max(newsToRender.length - VISIBLE, 0);

  return (
    <section className="home-category-section">
      <h2>{categoryName}</h2>

      {error && <p>{error}</p>}

      <div className="carousel-wrapper">
        {/* LEFT ARROW */}
        <button
          className="slay-btn"
          onClick={() => setIndex(i => Math.max(i - 1, 0))}
          disabled={index === 0}
        >
          ‹
        </button>

        {/* CAROUSEL */}
        <div className="carousel-viewport">
          <div
            className="carousel-track"
            style={{
              transform: `translateX(-${index * (100 / VISIBLE)}%)`
            }}
          >
            {newsToRender.map(news => (
              <div className="carousel-item" key={news.id}>
                <img
                  src={news.newsimg}
                  alt={news.title}
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.png";
                  }}
                  loading="lazy"
                />
                <h3>{news.title}</h3>

                <button
                  className="rm-btn"
                  onClick={() =>
                    navigate(`/category/${categoryName}/${news.id}`)
                  }
                  disabled={isLoading || Boolean(error)}
                >
                  Read More
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT ARROW / SEE MORE */}
        {index < maxIndex ? (
          <button
            className="slay-btn"
            onClick={() => setIndex(i => Math.min(i + 1, maxIndex))}
            disabled={isLoading || Boolean(error)}
          >
            ›
          </button>
        ) : (
          <button
            className="see-more-btn"
            onClick={() => navigate(`/category/${categoryName}`)}
            disabled={isLoading || Boolean(error)}
          >
            See More
          </button>
        )}
      </div>
    </section>
  );
};

export default HomeNewsCategory2;
