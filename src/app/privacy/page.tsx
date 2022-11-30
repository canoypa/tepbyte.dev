import { fetchPrivacy } from "~/api/privacy";
import { MainContents } from "~/features/main_contents";
import { MarkdownRenderer } from "~/features/markdown";
import { PageHeadline } from "~/features/page_headline";

const PrivacyPage = async () => {
  const privacy = await fetchPrivacy();

  return (
    <MainContents>
      <PageHeadline>Privacy</PageHeadline>
      <MarkdownRenderer tree={privacy} />
    </MainContents>
  );
};
export default PrivacyPage;
