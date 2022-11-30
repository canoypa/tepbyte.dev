import { fetchProfile } from "~/api/profile";
import { MainContents } from "~/features/main_contents";
import { PageHeadline } from "~/features/page_headline";
import { Profile } from "~/features/profile/profile";

const AboutPage = async () => {
  const profile = await fetchProfile();

  return (
    <MainContents>
      <PageHeadline>About</PageHeadline>
      <Profile profile={profile.frontmatter} />
    </MainContents>
  );
};
export default AboutPage;
