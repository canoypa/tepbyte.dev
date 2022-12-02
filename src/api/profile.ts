import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import { cache } from "react";
import { firebaseAdminApp } from "~/client/firebase-admin";

export const fetchProfile = cache(async () => {
  const storage = getStorage(firebaseAdminApp);

  const query = storage
    .bucket("tepbyte.appspot.com")
    .file("profile/data/_parsed.json");
  const snapshot = await query.download();

  const data = JSON.parse(snapshot.toString());

  return data;
});

export const fetchProfileMeta = cache(async () => {
  const firestore = getFirestore(firebaseAdminApp);

  const query = firestore.doc("profile/data");
  const snapshot = await query.get();

  const data = snapshot.data();

  return data;
});
