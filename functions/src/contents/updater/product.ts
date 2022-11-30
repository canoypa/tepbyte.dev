import { getFirestore, Timestamp } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import { firebaseApp } from "../../client/firebase_admin";
import { ChangeFile } from "../../types";
import { fetchParsedMarkdown } from "../parser";

export const productUpdater = async (change: ChangeFile) => {
  const firestore = getFirestore(firebaseApp);
  const storage = getStorage(firebaseApp);

  const match = change.filename.match(/^products\/(?<slug>\w+)\/index\.md$/)!;
  const slug = match.groups!.slug;

  const parsedMd = await fetchParsedMarkdown(change.filename);

  const root = parsedMd as any;
  const frontmatter = root.frontmatter;

  const meta = {
    title: frontmatter.title,
    subhead: frontmatter.subhead,
    images: frontmatter.images,
    tags: frontmatter.tags,
    homepage: frontmatter.homepage ?? null,
    play_store: frontmatter["play-store"] ?? null,
    app_store: frontmatter["app-store"] ?? null,
    repository: frontmatter.repository ?? null,
    published_at:
      frontmatter["published-at"] &&
      Timestamp.fromDate(new Date(frontmatter["published-at"])),
  };

  await firestore.doc(`products/${slug}`).set(meta);
  await storage
    .bucket()
    .file(`products/${slug}/_parsed.json`)
    .save(JSON.stringify(root));
};

export const productRemover = async (change: ChangeFile) => {
  const firestore = getFirestore(firebaseApp);
  const storage = getStorage(firebaseApp);

  const match = change.filename.match(/^products\/(?<slug>\w+)\/index\.md$/)!;
  const slug = match.groups!.slug;

  await firestore.doc(`products/${slug}`).delete();
  await storage.bucket().file(`products/${slug}/_parsed.json`).delete();
};
