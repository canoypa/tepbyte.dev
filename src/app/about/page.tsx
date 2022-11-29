import { FC } from "react";
import { MainContents } from "~/features/main_contents";
import { PageHeadline } from "~/features/page_headline";

const AboutPage: FC = () => {
  return (
    <MainContents>
      <PageHeadline>About</PageHeadline>
    </MainContents>
  );
};
export default AboutPage;
