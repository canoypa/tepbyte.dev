import { getStorage } from "firebase-admin/storage";
import { firebaseApp } from "../../client/firebase_admin";
import { ghRest } from "../../client/github";
import { ChangeFile } from "../../types";

export const productAssetUpdater = async (change: ChangeFile) => {
  const storage = getStorage(firebaseApp);

  const match = change.filename.match(
    /^products\/(?<slug>\w+)\/(?<filename>.+\.(?:png|jpg))$/
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

  const fileContent = Buffer.from(file.data.content, "base64");

  await storage.bucket().file(`products/${slug}/${filename}`).save(fileContent);
};

export const productAssetRemover = async (change: ChangeFile) => {
  const storage = getStorage(firebaseApp);

  const match = change.filename.match(
    /^products\/(?<slug>\w+)\/(?<filename>.+\.(?:png|jpg))$/
  )!;
  const slug = match.groups!.slug;
  const filename = match.groups!.filename;

  await storage.bucket().file(`products/${slug}/${filename}`).delete();
};
