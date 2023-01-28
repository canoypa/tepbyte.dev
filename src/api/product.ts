import { getFunctions, httpsCallableFromURL } from "firebase/functions";
import { cache } from "react";
import { firebaseApp } from "~/client/firebase";

export const fetchProduct = cache(async (slug: string) => {
  const functions = getFunctions(firebaseApp);

  const productsGet = httpsCallableFromURL(
    functions,
    "https://products-get-qy5wbcvsoq-uc.a.run.app"
  );

  const response = await productsGet({ slug });

  return response.data as any;
});

export const fetchProductList = cache(async (limit?: number) => {
  const functions = getFunctions(firebaseApp);

  const productsList = httpsCallableFromURL(
    functions,
    "https://products-list-qy5wbcvsoq-uc.a.run.app"
  );

  const response = await productsList({ limit });

  return response.data as any;
});
