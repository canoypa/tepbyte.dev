import { getFunctions, httpsCallableFromURL } from "firebase/functions";
import { cache } from "react";
import { firebaseApp } from "~/client/firebase";

export const fetchPrivacy = cache(async () => {
  const functions = getFunctions(firebaseApp);

  const privacyGet = httpsCallableFromURL(
    functions,
    "https://privacy-get-qy5wbcvsoq-uc.a.run.app"
  );

  const response = await privacyGet();

  return response.data as any;
});
