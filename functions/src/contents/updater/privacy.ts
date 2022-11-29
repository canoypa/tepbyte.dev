import { getStorage } from "firebase-admin/storage";
import { firebaseApp } from "../../client/firebase_admin";
import { ChangeFile } from "../../types";
import { fetchParsedMarkdown } from "../parser";

export const privacyUpdater = async (change: ChangeFile) => {
  const storage = getStorage(firebaseApp);

  const parsedMd = await fetchParsedMarkdown(change.filename);

  const root = parsedMd as any;

  await storage
    .bucket()
    .file(`privacy/data/_parsed.json`)
    .save(JSON.stringify(root));
};
