import { MainContents } from '~/features/main_contents';
import { MarkdownRenderer } from '~/features/markdown';
import { PageHeadline } from '~/features/page_headline';
import { Profile } from '~/features/profile/profile';
import { api } from '~/lib/api';

const AboutPage = async () => {
  const profile = await api.profile.get();

  return (
    <MainContents>
      <PageHeadline title="About" />
      <Profile profile={profile.meta} />
      <MarkdownRenderer tree={profile.body} />
    </MainContents>
  );
};
export default AboutPage;
