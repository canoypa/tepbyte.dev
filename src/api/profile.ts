import { getFunctions, httpsCallableFromURL } from 'firebase/functions';
import { cache } from 'react';
import { firebaseApp } from '~/client/firebase';
import { ProfileMeta } from '~/types/parsed';

export const fetchProfile = cache(async () => {
  const functions = getFunctions(firebaseApp);

  const profileGet = httpsCallableFromURL(
    functions,
    'https://profile-get-qy5wbcvsoq-an.a.run.app'
  );

  const response = await profileGet();

  return response.data as { meta: ProfileMeta; body: any };
});
