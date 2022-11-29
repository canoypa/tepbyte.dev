import { FC } from "react";
import { MainContents } from "~/features/main_contents";
import { PageHeadline } from "~/features/page_headline";

const PrivacyPage: FC = () => {
  return (
    <MainContents>
      <PageHeadline>Privacy</PageHeadline>
    </MainContents>
  );
};
export default PrivacyPage;
