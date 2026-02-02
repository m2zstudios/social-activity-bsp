import { databases } from "../admin/appwrite/appwrite";
import { ID, Permission, Role } from "appwrite";
import {
  DATABASE_ID,
  DRAFTS_COLLECTION_ID,
} from "../admin/appwrite/appwrite";

/**
 * Create or Update Draft (Live Save)
 */
export async function saveDraft({
  draftId,
  payload,
  userId,
}) {
  if (!userId) {
    throw new Error("UserId missing while saving draft");
  }

  const data = {
    ...payload,
    status: "draft",
    userId,
    updatedAt: new Date().toISOString(),
  };

  // ───────── CREATE ─────────
  if (!draftId) {
    return databases.createDocument(
      DATABASE_ID,
      DRAFTS_COLLECTION_ID,
      ID.unique(),
      data,
      [
        Permission.read(Role.user(userId)),
        Permission.update(Role.user(userId)),
        Permission.delete(Role.user(userId)),
      ]
    );
  }

  // ───────── UPDATE ─────────
  return databases.updateDocument(
    DATABASE_ID,
    DRAFTS_COLLECTION_ID,
    draftId,
    data
  );
}
