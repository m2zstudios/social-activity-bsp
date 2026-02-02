import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { databases, Query } from "../admin/appwrite/appwrite";
import NewsPreviewPage from "../admin/NewsPreviewPage";


const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const POSTS_COLLECTION_ID =
  import.meta.env.VITE_APPWRITE_POSTS_COLLECTION_ID;

const NewsDetails = () => {
  const { identifier } = useParams();
  const navigate = useNavigate();

  const [news, setNews] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadNews = async () => {
      try {
        let doc = null;

        // 1️⃣ Try slug first
        const res = await databases.listDocuments(
          DATABASE_ID,
          POSTS_COLLECTION_ID,
          [Query.equal("slug", identifier)]
        );

        doc = res.documents?.[0] || null;

        // 2️⃣ Fallback to document ID
        if (!doc && identifier.length > 20) {
          doc = await databases.getDocument(
            DATABASE_ID,
            POSTS_COLLECTION_ID,
            identifier
          );
        }

        // ❌ Nothing found → redirect
        if (!doc) {
          navigate("/not-found", { replace: true });
          return;
        }

        if (!isMounted) return;

        setNews({
          ...doc,
          blocks: doc.blocks ? JSON.parse(doc.blocks) : [],
          author: doc.author ? JSON.parse(doc.author) : null,
        });
      } catch (err) {
        console.error("❌ Failed to load news", err);
        if (isMounted) {
          navigate("/not-found", { replace: true });
        }
      }
    };

    loadNews();
    return () => {
      isMounted = false;
    };
  }, [identifier, navigate]);

  if (error) return <div className="news-error">{error}</div>;
  if (!news) return <div className="news-loading">Loading...</div>;

  return <NewsPreviewPage news={news} />;
};

export default NewsDetails;
