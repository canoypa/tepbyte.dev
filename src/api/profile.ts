import { getFunctions, httpsCallableFromURL } from "firebase/functions";
import { cache } from "react";
import { firebaseApp } from "~/client/firebase";

export const fetchProfile = cache(async () => {
  const functions = getFunctions(firebaseApp);

  const profileGet = httpsCallableFromURL(
    functions,
    "https://profile-get-qy5wbcvsoq-uc.a.run.app"
  );

  const response = await profileGet();

  return response.data as any;
});
