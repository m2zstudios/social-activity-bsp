import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../admin/components/Stylings/LeftPreview.css";

import waIcon from "/images/social-icons/waicon.png";
import igIcon from "/images/social-icons/igicon.png";
import fbIcon from "/images/social-icons/fbicon.png";
import xIcon from "/images/social-icons/xicon.png";

/**
 * NewsPreviewPage
 * - Static preview only
 * - Loads blocks + styles from DB
 * - NO editor logic
 */
const NewsPreviewPage = () => {
  const { newsId } = useParams(); // or slug
  const [blocks, setBlocks] = useState([]);
  const [theme, setTheme] = useState("light");
  const [loading, setLoading] = useState(true);

  /* -------------------------------
     🔹 Fetch news from DB
  -------------------------------- */
  useEffect(() => {
    const loadNews = async () => {
      try {
        // 🔁 replace with Appwrite / API call
        const res = await fetch(`/api/news/${newsId}`);
        const data = await res.json();

        setBlocks(data.blocks || []);
        setTheme(data.theme || "light");
      } catch (err) {
        console.error("❌ Failed to load news", err);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, [newsId]);

  /* -------------------------------
     🔹 Helpers
  -------------------------------- */
  const getTextColor = (block, theme) => {
    if (block.styles?.isCustomColor) return block.styles.color;
    return theme === "light" ? "#020617" : "#e5e7eb";
  };

  const withLink = (block, content) => {
    if (!block.link?.url) return content;

    return (
      <a
        href={block.link.url}
        target={block.link.target || "_self"}
        rel="noopener noreferrer"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        {content}
      </a>
    );
  };

  const renderRichText = (richText = []) =>
    richText.map((node, i) => {
      let content = node.text;

      if (node.marks?.includes("bold")) content = <strong>{content}</strong>;
      if (node.marks?.includes("italic")) content = <em>{content}</em>;
      if (node.marks?.includes("underline")) content = <u>{content}</u>;
      if (node.marks?.includes("highlight")) {
        content = <span style={{ background: "#fde047" }}>{content}</span>;
      }
      if (node.marks?.includes("link")) {
        content = (
          <a href={node.attrs?.href} target="_blank" rel="noreferrer">
            {content}
          </a>
        );
      }

      return <span key={node.id || `rt-${i}`}>{content}</span>;
    });

  /* -------------------------------
     🔹 Social Icons
  -------------------------------- */
  const SOCIAL_ICON_URLS = {
    whatsapp: waIcon,
    instagram: igIcon,
    facebook: fbIcon,
    twitter: xIcon,
  };

  const AuthorSocialIcons = ({ socials, position, showText = true }) => {
    if (!socials) return null;

    return (
      <div className={`author-socials ${position}`}>
        {showText && <span className="follow-text">Follow Me On</span>}

        {Object.entries(socials).map(([key, url]) =>
          url ? (
            <a key={key} href={url} target="_blank" rel="noreferrer">
              <img
                src={SOCIAL_ICON_URLS[key]}
                className={`social-icon ${key}`}
              />
            </a>
          ) : null
        )}
      </div>
    );
  };

  /* -------------------------------
     🔹 STATIC renderBlock
  -------------------------------- */
  const renderBlock = (block) => {
    if (!block || typeof block !== "object") return null;

    switch (block.type) {
      case "paragraph":
        return withLink(
          block,
          <p
            className={`lp-paragraph ${block.variant}`}
            style={{
              fontSize: block.styles?.fontSize,
              color: getTextColor(block, theme),
              fontWeight: block.styles?.fontWeight,
              lineHeight: block.styles?.lineHeight,
              textAlign: block.styles?.textAlign,
              letterSpacing: block.styles?.letterSpacing,
              background: block.styles?.background,
              padding: block.styles?.padding,
              margin: block.styles?.margin,
              borderLeft: block.styles?.borderLeft,
              whiteSpace: "pre-wrap",
            }}
          >
            {renderRichText(block.richText || [{ text: block.text || "" }])}
          </p>
        );

      case "subheading":
        return withLink(
          block,
          <h3
            className="lp-subheading"
            style={{
              fontSize: block.styles?.fontSize,
              fontWeight: block.styles?.fontWeight,
              color: getTextColor(block, theme),
              textAlign: block.styles?.textAlign,
              textTransform: block.styles?.textTransform,
              margin: block.styles?.margin,
            }}
          >
            {block.text}
          </h3>
        );

      case "image":
        return (
          <div className="lp-image">
            <img
              src={block.src}
              alt={block.alt || ""}
              className={`lp-image-${block.size}`}
              style={{
                borderRadius: block.radius,
                boxShadow:
                  block.shadow === "soft"
                    ? "0 10px 25px rgba(0,0,0,.15)"
                    : block.shadow === "strong"
                    ? "0 20px 40px rgba(0,0,0,.35)"
                    : "none",
              }}
            />
            {block.caption && (
              <div className="lp-image-caption">{block.caption}</div>
            )}
            {block.credit && (
              <div className="lp-image-credit">Source: {block.credit}</div>
            )}
          </div>
        );

      case "video":
        return (
          <div className="lp-video">
            <div
              className="lp-video-inner"
              style={{
                justifyContent:
                  block.align === "left"
                    ? "flex-start"
                    : block.align === "right"
                    ? "flex-end"
                    : "center",
              }}
            >
              <video
                src={block.src}
                controls={block.controls !== false}
                autoPlay={block.autoplay}
                muted={block.muted}
                loop={block.loop}
                playsInline
                className="lp-video-player"
              />
            </div>
            {block.caption && (
              <div className="lp-video-caption">{block.caption}</div>
            )}
          </div>
        );

      case "youtube":
        return (
          <div className="lp-embed">
            <div
              className="lp-embed-inner"
              style={{
                justifyContent:
                  block.align === "left"
                    ? "flex-start"
                    : block.align === "right"
                    ? "flex-end"
                    : "center",
              }}
            >
              <iframe
                className="lp-embed-frame"
                src={block.src}
                title={block.title || "YouTube video"}
                allow={
                  block.allow ||
                  "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                }
                referrerPolicy={
                  block.referrerPolicy ||
                  "strict-origin-when-cross-origin"
                }
                allowFullScreen={block.allowFullScreen !== false}
              />
            </div>
            {block.caption && (
              <div className="lp-embed-caption">{block.caption}</div>
            )}
          </div>
        );

      case "gallery":
        return (
          <div
            className="lp-gallery"
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${block.columns || 3}, 1fr)`,
              gap: 12,
            }}
          >
            {(block.images || []).map((img, i) => (
              <figure key={i}>
                <img src={img.src} alt={img.alt || ""} />
                {img.caption && <figcaption>{img.caption}</figcaption>}
              </figure>
            ))}
          </div>
        );

      case "author":
        return (
          <div className="lp-author default">
            <img src={block.author.image} />
            <div>
              <h4>{block.author.name}</h4>
              <p className="role">{block.author.role}</p>
              <p>{block.author.about}</p>
              <AuthorSocialIcons socials={block.socials} position="bottom-right" />
            </div>
          </div>
        );

      case "quote":
        return (
          <blockquote className="lp-quote">
            “{block.text}”
          </blockquote>
        );

      case "list":
        return (
          <ul className="lp-list">
            {(block.items || []).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        );

      case "ad":
        return <div className="lp-ad">Advertisement</div>;

      default:
        return null;
    }
  };

  /* -------------------------------
     🔹 Render
  -------------------------------- */
  if (loading) return <div className="left-preview">Loading…</div>;

  return (
    <div className="left-preview">
      {blocks.map((block) => (
        <div key={block.id} className="preview-block">
          <div className="preview-content">{renderBlock(block)}</div>
        </div>
      ))}
    </div>
  );
};

export default NewsPreviewPage;
