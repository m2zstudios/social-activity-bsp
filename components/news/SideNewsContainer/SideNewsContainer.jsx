// SideNewsContainer.jsx
import { useEffect, useMemo, useState } from "react";
import NewsBlock from "./NewsBlock";
import RectAdBlock from "./RectAdBlock";
import { sideNewsData } from "./TempData";
import { databases, Query } from "../../../admin/appwrite/appwrite";
import { getFirstImageFromBlocks } from "../../../admin/components/utils/newsHelpers";
import "./Stylings/SideNewsContainer.css";

const MAX_NEWS_ITEMS = 2;

export default function SideNewsContainer() {
  const [newsItems, setNewsItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const adItem = useMemo(
    () => sideNewsData.find(item => item.type === "ad"),
    []
  );

  useEffect(() => {
    let isMounted = true;
    const fetchLatestNews = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const res = await databases.listDocuments(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_POSTS_COLLECTION_ID,
          [
            Query.equal("status", "published"),
            Query.orderDesc("createdDate"),
            Query.limit(MAX_NEWS_ITEMS),
          ]
        );

        const mapped = res.documents.map((doc) => {
          const heroImage = doc.hero || getFirstImageFromBlocks(doc.blocks);
          const createdAt = doc.createdDate || doc.$createdAt;
          return {
            id: doc.$id,
            slug: doc.slug || doc.$id,
            title: doc.title,
            image: heroImage || "/placeholder.png",
            createdAt,
          };
        });

        const sorted = mapped.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        if (isMounted) {
          setNewsItems(sorted);
        }
      } catch (err) {
        console.error("Failed to load side news", err);
        if (isMounted) {
          setError("Failed to load breaking news.");
          setNewsItems([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchLatestNews();

    return () => {
      isMounted = false;
    };
  }, []);

  const itemsToRender = useMemo(() => {
    if (isLoading) {
      return Array.from({ length: MAX_NEWS_ITEMS }, (_, idx) => ({
        id: `loading-${idx}`,
        title: "Loading...",
        image: "/placeholder.png",
        slug: "",
        isLoading: true,
      }));
    }

    return newsItems;
  }, [isLoading, newsItems]);

  return (
    <div className="side-news-container">
      <div className="side-news-header">BREAKING NEWS</div>

      {error && <p className="side-news-error">{error}</p>}

      {itemsToRender.map(news => (
        <NewsBlock
          key={news.id}
          title={news.title}
          image={news.image}
          slug={news.slug}
          isLoading={news.isLoading}
        />
      ))}

      {adItem && (
        <RectAdBlock
          image={adItem.image}
          link={adItem.link} // ✅ HERE
        />
      )}
    </div>
  );
}
