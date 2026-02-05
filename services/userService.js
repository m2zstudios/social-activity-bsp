import { account } from "../admin/appwrite/auth";
import {
  databases,
  Query,
  ID,
  DATABASE_ID,
  USERS_COLLECTION_ID,
} from "../admin/appwrite/appwrite";

const requireUsersConfig = () => {
  if (!DATABASE_ID || !USERS_COLLECTION_ID) {
    throw new Error("Missing Appwrite users collection configuration.");
  }
};

export const isUsernameAvailable = async (username) => {
  requireUsersConfig();
  const trimmed = username.trim();
  if (!trimmed) return false;

  const existing = await databases.listDocuments(
    DATABASE_ID,
    USERS_COLLECTION_ID,
    [Query.equal("username", trimmed)]
  );

  return existing.total === 0;
};

export const createUserProfile = async ({ userId, name, username, avatar }) => {
  requireUsersConfig();

  return databases.createDocument(
    DATABASE_ID,
    USERS_COLLECTION_ID,
    ID.unique(),
    {
      userId,
      name,
      username,
      avatar: avatar || null,
      role: "user",
      status: "active",
      isVerified: false,
      joinedAt: new Date().toISOString(),
    }
  );
};

export const getProfileByUserId = async (userId) => {
  requireUsersConfig();
  const res = await databases.listDocuments(
    DATABASE_ID,
    USERS_COLLECTION_ID,
    [Query.equal("userId", userId)]
  );

  return res.documents?.[0] || null;
};

export const getCurrentUserProfile = async () => {
  const currentAccount = await account.get();
  const profile = await getProfileByUserId(currentAccount.$id);

  return { account: currentAccount, profile };
};
