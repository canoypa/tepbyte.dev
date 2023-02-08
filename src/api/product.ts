import { getFunctions, httpsCallableFromURL } from 'firebase/functions';
import { cache } from 'react';
import { firebaseApp } from '~/client/firebase';
import { ProductMeta } from '~/types/parsed';

export const fetchProduct = cache(async (slug: string) => {
  const functions = getFunctions(firebaseApp);

  const productsGet = httpsCallableFromURL(
    functions,
    'https://products-get-qy5wbcvsoq-an.a.run.app'
  );

  const response = await productsGet({ slug });

  return response.data as { meta: ProductMeta; body: any };
});

export const fetchProductList = cache(async (limit?: number) => {
  const functions = getFunctions(firebaseApp);

  const productsList = httpsCallableFromURL(
    functions,
    'https://products-list-qy5wbcvsoq-an.a.run.app'
  );

  const response = await productsList({ limit });

  return response.data as ProductMeta[];
});
