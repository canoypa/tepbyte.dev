import { Metadata, ResolvingMetadata } from 'next';
import { MainContents } from '~/features/main_contents';
import { MarkdownRenderer } from '~/features/markdown';
import { PageHeadline } from '~/features/page_headline';
import { api } from '~/lib/api';

type Props = {};

export async function generateMetadata(
  _: Props,
  resolvingParent: ResolvingMetadata
): Promise<Metadata> {
  const parent = await resolvingParent;

  return {
    title: 'Privacy',

    openGraph: {
      ...parent?.openGraph,
      title: 'Privacy',
      url: '/privacy',
    },

    alternates: {
      canonical: '/privacy',
    },
  };
}

export default async function () {
  const privacy = await api.privacy.get();

  return (
    <MainContents>
      <PageHeadline title="Privacy" />
      <MarkdownRenderer tree={privacy.body} />
    </MainContents>
  );
}
