import { fetchProfile } from "~/api/profile";
import { MainContents } from "~/features/main_contents";
import { Hero } from "~/features/profile";

const HomePage = async () => {
  const profile = await fetchProfile();

  return (
    <MainContents>
      <Hero profile={profile.frontmatter} />
    </MainContents>
  );
};
export default HomePage;
