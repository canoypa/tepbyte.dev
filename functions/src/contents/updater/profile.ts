import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import { firebaseApp } from "../../client/firebase_admin";
import { ChangeFile } from "../../types";
import { fetchParsedMarkdown } from "../parser";

export const profileUpdater = async (change: ChangeFile) => {
  const firestore = getFirestore(firebaseApp);
  const storage = getStorage(firebaseApp);

  const parsedMd = await fetchParsedMarkdown(change.filename);

  const root = parsedMd as any;
  const frontmatter = root.frontmatter;

  const meta = {
    name: frontmatter.name,
    subhead: frontmatter.subhead,
    photo: frontmatter.photo,
    background: frontmatter.background,
    links: frontmatter.links,
  };

  await firestore.doc("profile/data").set(meta);
  await storage
    .bucket()
    .file("profile/data/_parsed.json")
    .save(JSON.stringify(root));
};
