import { fetchPostList } from "~/api/post";
import { BlogList } from "~/features/blog";
import { MainContents } from "~/features/main_contents";
import { PageHeadline } from "~/features/page_headline";

const BlogPage = async () => {
  const posts = await fetchPostList();

  return (
    <MainContents>
      <PageHeadline>Blog</PageHeadline>
      <BlogList items={posts} />
    </MainContents>
  );
};
export default BlogPage;
