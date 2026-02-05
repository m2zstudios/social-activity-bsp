import {
  databases,
  Query,
  ID,
  DATABASE_ID,
  COMMENTS_COLLECTION_ID,
} from "../admin/appwrite/appwrite";

const requireCommentsConfig = () => {
  if (!DATABASE_ID || !COMMENTS_COLLECTION_ID) {
    throw new Error("Missing Appwrite comments collection configuration.");
  }
};

export const listCommentsForPost = async (postId) => {
  requireCommentsConfig();

  const res = await databases.listDocuments(
    DATABASE_ID,
    COMMENTS_COLLECTION_ID,
    [Query.equal("postId", postId), Query.orderDesc("$createdAt")]
  );

  return res.documents || [];
};

export const createComment = async ({ comment, postId, userId, userName }) => {
  requireCommentsConfig();

  return databases.createDocument(
    DATABASE_ID,
    COMMENTS_COLLECTION_ID,
    ID.unique(),
    {
      comment,
      postId,
      userId,
      userName,
    }
  );
};
