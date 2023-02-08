import { BlogList } from "~/features/blog";
import { MainContents } from "~/features/main_contents";
import { PageHeadline } from "~/features/page_headline";
import { api } from "~/lib/api";

const BlogPage = async () => {
  const posts = await api.posts.list();

  return (
    <MainContents>
      <PageHeadline title="Blog" />
      <BlogList items={posts} />
    </MainContents>
  );
};
export default BlogPage;
