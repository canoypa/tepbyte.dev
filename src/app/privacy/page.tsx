import { Metadata, ResolvingMetadata } from 'next';
import { MainContents } from '~/features/main_contents';
import { MarkdownRenderer } from '~/features/markdown';
import { PageHeadline } from '~/features/page_headline';
import { api } from '~/lib/api';

export async function generateMetadata(
  _: unknown,
  resolvingParent?: ResolvingMetadata
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

const PrivacyPage = async () => {
  const privacy = await api.privacy.get();

  return (
    <MainContents>
      <PageHeadline title="Privacy" />
      <MarkdownRenderer tree={privacy.body} />
    </MainContents>
  );
};
export default PrivacyPage;
