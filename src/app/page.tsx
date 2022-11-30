import { fetchProfileMeta } from "~/api/profile";
import { MainContents } from "~/features/main_contents";
import { Hero } from "~/features/profile";

const HomePage = async () => {
  const profile = await fetchProfileMeta();

  return (
    <MainContents>
      <Hero profile={profile} />
    </MainContents>
  );
};
export default HomePage;
