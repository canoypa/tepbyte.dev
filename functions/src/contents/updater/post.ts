import { getFirestore, Timestamp } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import { firebaseApp } from "../../client/firebase_admin";
import { ChangeFile } from "../../types";
import { fetchParsedMarkdown } from "../parser";

export const postUpdater = async (change: ChangeFile) => {
  const firestore = getFirestore(firebaseApp);
  const storage = getStorage(firebaseApp);

  const match = change.filename.match(/^posts\/(?<slug>\w+)\/index\.md$/)!;
  const slug = match.groups!.slug;

  const parsedMd = await fetchParsedMarkdown(change.filename);

  const root = parsedMd as any;
  const frontmatter = root.frontmatter;

  const meta = {
    title: frontmatter.title,
    subhead: frontmatter.subhead,
    image: frontmatter.image,
    tags: frontmatter.tags,
    published_at:
      frontmatter["published-at"] &&
      Timestamp.fromDate(new Date(frontmatter["published-at"])),
    updated_at:
      frontmatter["updated-at"] &&
      Timestamp.fromDate(new Date(frontmatter["updated-at"])),
  };

  await firestore.doc(`posts/${slug}`).set(meta);
  await storage
    .bucket()
    .file(`posts/${slug}/_parsed.json`)
    .save(JSON.stringify(root));
};

export const PostRemover = async (change: ChangeFile) => {
  const firestore = getFirestore(firebaseApp);
  const storage = getStorage(firebaseApp);

  const match = change.filename.match(/^posts\/(?<slug>\w+)\/index\.md$/)!;
  const slug = match.groups!.slug;

  await firestore.doc(`posts/${slug}`).delete();
  await storage.bucket().file(`posts/${slug}/_parsed.json`).delete();
};
