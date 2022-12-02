import { getStorage } from "firebase-admin/storage";
import { cache } from "react";
import { firebaseAdminApp } from "~/client/firebase-admin";

export const fetchPrivacy = cache(async () => {
  const storage = getStorage(firebaseAdminApp);

  const query = storage
    .bucket("tepbyte.appspot.com")
    .file("privacy/data/_parsed.json");

  const snapshot = await query.download();

  const data = JSON.parse(snapshot.toString());

  return data;
});
