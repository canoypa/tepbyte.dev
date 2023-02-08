import { getFunctions, httpsCallableFromURL } from 'firebase/functions';
import { cache } from 'react';
import { firebaseApp } from '~/client/firebase';
import { ArticleMeta } from '~/types/parsed';

export const fetchPost = cache(async (slug: string) => {
  const functions = getFunctions(firebaseApp);

  const postsGet = httpsCallableFromURL(
    functions,
    'https://posts-get-qy5wbcvsoq-an.a.run.app'
  );

  const response = await postsGet({ slug });

  return response.data as { meta: ArticleMeta; body: any };
});

export const fetchPostList = cache(async (limit?: number) => {
  const functions = getFunctions(firebaseApp);

  const postsList = httpsCallableFromURL(
    functions,
    'https://posts-list-qy5wbcvsoq-an.a.run.app'
  );

  const response = await postsList({ limit });

  return response.data as ArticleMeta[];
});
