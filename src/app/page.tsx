import { MainContents } from "~/features/main_contents";
import { Hero } from "~/features/profile";
import { api } from "~/lib/api";

const HomePage = async () => {
  const profile = await api.profile.get();

  return (
    <MainContents>
      <Hero profile={profile.meta} />
    </MainContents>
  );
};
export default HomePage;
