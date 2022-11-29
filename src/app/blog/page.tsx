import { FC } from "react";
import { MainContents } from "~/features/main_contents";
import { PageHeadline } from "~/features/page_headline";

const BlogPage: FC = () => {
  return (
    <MainContents>
      <PageHeadline>Blog</PageHeadline>
    </MainContents>
  );
};
export default BlogPage;
