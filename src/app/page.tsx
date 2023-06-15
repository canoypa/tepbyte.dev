import { Metadata, ResolvingMetadata } from 'next';
import { MainContents } from '~/features/main_contents';
import { Hero } from '~/features/profile';
import { api } from '~/lib/api';

type Props = {};

export async function generateMetadata(
  _: Props,
  resolvingParent: ResolvingMetadata
): Promise<Metadata> {
  const parent = await resolvingParent;

  return {
    openGraph: {
      ...parent?.openGraph,
      url: '/',
    },

    alternates: {
      canonical: '/',
    },
  };
}

export default async function () {
  const profile = await api.profile.get();

  if (!profile) {
    throw new Error('API Error');
  }

  return (
    <MainContents>
      <Hero profile={profile.meta} />
    </MainContents>
  );
}
