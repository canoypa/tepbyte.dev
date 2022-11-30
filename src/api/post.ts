import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import { firebaseAdminApp } from "~/client/firebase-admin";

export const fetchPost = async (slug: string) => {
  const storage = getStorage(firebaseAdminApp);

  const query = storage
    .bucket("tepbyte.appspot.com")
    .file(`posts/${slug}/_parsed.json`);

  const snapshot = await query.download();

  const data = JSON.parse(snapshot.toString());

  return data;
};

export const fetchPostList = async (limit?: number) => {
  const firestore = getFirestore(firebaseAdminApp);

  let query = firestore.collection("posts").orderBy("published_at");
  if (limit) query = query.limit(limit);

  const snapshot = await query.get();

  if (snapshot.empty) return [];

  const data = snapshot.docs.map((v) => ({ id: v.id, ...v.data() }));

  return data;
};
