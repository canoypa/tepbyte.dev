import { getStorage } from "firebase-admin/storage";
import { firebaseApp } from "../../client/firebase_admin";
import { ghRest } from "../../client/github";
import { ChangeFile } from "../../types";

export const postAssetUpdater = async (change: ChangeFile) => {
  const storage = getStorage(firebaseApp);

  const match = change.filename.match(
    /^posts\/(?<slug>\w+)\/(?<filename>.+\.(?:png|jpg))$/
  )!;
  const slug = match.groups!.slug;
  const filename = match.groups!.filename;

  const file = await ghRest.repos.getContent({
    owner: process.env.CONTENTS_REPO_OWNER!,
    repo: process.env.CONTENTS_REPO_NAME!,
    path: change.filename,
  });

  // assertion
  if (!("content" in file.data)) {
    throw new Error("Invalid data");
  }

  const fileContent = Buffer.from(file.data.content, "base64").toString();

  await storage.bucket().file(`posts/${slug}/${filename}`).save(fileContent);
};

export const postAssetRemover = async (change: ChangeFile) => {
  const storage = getStorage(firebaseApp);

  const match = change.filename.match(
    /^posts\/(?<slug>\w+)\/(?<filename>.+\.(?:png|jpg))$/
  )!;
  const slug = match.groups!.slug;
  const filename = match.groups!.filename;

  await storage.bucket().file(`posts/${slug}/${filename}`).delete();
};
