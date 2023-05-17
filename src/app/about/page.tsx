import { Metadata, ResolvingMetadata } from 'next';
import { MainContents } from '~/features/main_contents';
import { MarkdownRenderer } from '~/features/markdown';
import { PageHeadline } from '~/features/page_headline';
import { Profile } from '~/features/profile/profile';
import { api } from '~/lib/api';

type Props = {};

export async function generateMetadata(
  _: Props,
  resolvingParent: ResolvingMetadata
): Promise<Metadata> {
  const parent = await resolvingParent;

  return {
    title: 'About',

    openGraph: {
      ...parent?.openGraph,
      title: 'About',
      url: '/about',
    },

    alternates: {
      canonical: '/about',
    },
  };
}

export default async function () {
  const profile = await api.profile.get();

  return (
    <MainContents>
      <PageHeadline title="About" />
      <Profile profile={profile.meta} />
      <MarkdownRenderer tree={profile.body} />
    </MainContents>
  );
}
