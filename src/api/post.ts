import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import { cache } from "react";
import { firebaseAdminApp } from "~/client/firebase-admin";

export const fetchPost = cache(async (slug: string) => {
  const storage = getStorage(firebaseAdminApp);

  const query = storage
    .bucket("tepbyte.appspot.com")
    .file(`posts/${slug}/_parsed.json`);

  const snapshot = await query.download().catch(() => {
    return null;
  });

  if (snapshot === null) return null;

  const data = JSON.parse(snapshot.toString());

  return data;
});

export const fetchPostList = cache(async (limit?: number) => {
  const firestore = getFirestore(firebaseAdminApp);

  let query = firestore.collection("posts").orderBy("published_at", "desc");
  if (limit) query = query.limit(limit);

  const snapshot = await query.get();

  if (snapshot.empty) return [];

  const data = snapshot.docs.map((v) => ({ id: v.id, ...v.data() }));

  return data;
});
