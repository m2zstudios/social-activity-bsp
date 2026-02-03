import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./Stylings/BreakingMain.css";
import { breakingNewsData } from "./contexts/NewsContext";
import {
  databases,
  DATABASE_ID,
  POSTS_COLLECTION_ID,
  Query,
} from "../../admin/appwrite/appwrite";

export default function BreakingMain() {
  const [breakingItem, setBreakingItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);

  const parsedBreaking = useMemo(() => {
    if (!breakingItem) return null;

    const blocks = (() => {
      if (!breakingItem.blocks) return [];
      if (Array.isArray(breakingItem.blocks)) return breakingItem.blocks;
      try {
        return JSON.parse(breakingItem.blocks);
      } catch {
        return [];
      }
    })();

    const images = blocks
      .filter((block) => block?.type === "image")
      .map((block) => block?.src || block?.imageUrl || block?.url)
      .filter(Boolean);

    const textFromBlocks = blocks.find(
      (block) => block?.type === "paragraph" && block?.text
    );

    return {
      id: breakingItem.$id,
      title: breakingItem.title || "",
      description:
        breakingItem.content ||
        textFromBlocks?.text ||
        "Breaking news update",
      images,
    };
  }, [breakingItem]);

  const mergedImages =
    parsedBreaking?.images?.length > 0
      ? parsedBreaking.images
      : breakingNewsData.images;

  const title = parsedBreaking?.title || breakingNewsData.title;
  const description =
    parsedBreaking?.description || breakingNewsData.description;
  const readMoreLink = parsedBreaking?.id
    ? `/news/${parsedBreaking.id}`
    : null;

  useEffect(() => {
    let isMounted = true;

    const loadBreakingNews = async () => {
      setLoading(true);
      try {
        const breakingRes = await databases.listDocuments(
          DATABASE_ID,
          POSTS_COLLECTION_ID,
          [
            Query.equal("status", "published"),
            Query.equal("isBreakingMain", true),
            Query.limit(1),
          ]
        );

        let doc = breakingRes.documents?.[0];

        if (!doc) {
          const latestRes = await databases.listDocuments(
            DATABASE_ID,
            POSTS_COLLECTION_ID,
            [
              Query.equal("status", "published"),
              Query.orderDesc("publishedAt"),
              Query.limit(1),
            ]
          );
          doc = latestRes.documents?.[0];
        }

        if (isMounted) {
          setBreakingItem(doc || null);
        }
      } catch (error) {
        console.error("Failed to load breaking main news", error);
        if (isMounted) {
          setBreakingItem(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadBreakingNews();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (mergedImages.length <= 1) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % mergedImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [mergedImages.length]);

  useEffect(() => {
    if (index >= mergedImages.length) {
      setIndex(0);
    }
  }, [index, mergedImages.length]);

  const prevImage = () => {
    setIndex((prev) => (prev - 1 + mergedImages.length) % mergedImages.length);
  };

  const nextImage = () => {
    setIndex((prev) => (prev + 1) % mergedImages.length);
  };

  const MAX_CHARS = 360;

  const getShortDescription = (text) => {
    if (!text) return "";

    if (text.length <= MAX_CHARS) {
      return text;
    }

    return text.slice(0, MAX_CHARS) + "...";
  };

  return (
    <section className="breaking-main">
      <div className="breaking-image-area">
        {/* IMAGE + CONTROLS WRAPPER */}
        <div className="image-wrapper">
          <img
            src={mergedImages[index]}
            alt="Breaking News"
            className="main-image"
          />

          {/* PROFESSIONAL CONTROLS */}
          <button className="img-btn left" onClick={prevImage}>
            ❮
          </button>
          <button className="img-btn right" onClick={nextImage}>
            ❯
          </button>

          {/* DOT INDICATORS */}
          {/* LINE INDICATORS */}
          <div className="line-indicators">
            {mergedImages.map((_, i) => (
              <span
                key={i}
                className={i === index ? "line active" : "line"}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="breaking-content">
        <h2>{title}</h2>
        {loading && (
          <span className="breaking-loading">Loading breaking news...</span>
        )}
        <p className="breaking-description">
          {getShortDescription(description)}
          {description.length > MAX_CHARS && readMoreLink && (
            <>
              {" "}
              <Link to={readMoreLink} className="read-more">
                Read More
              </Link>
            </>
          )}
        </p>
      </div>
    </section>
  );
}
