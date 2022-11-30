import { fetchPost } from "~/api/post";
import { PostInfo, Thumbnail } from "~/features/blog";
import { MainContents } from "~/features/main_contents";
import { MarkdownRenderer } from "~/features/markdown";

const PostPage = async ({ params: { slug } }: { params: { slug: string } }) => {
  const post = await fetchPost(slug);

  return (
    <MainContents>
      <Thumbnail image={post.frontmatter.image} />
      <PostInfo post={post.frontmatter} />
      <MarkdownRenderer tree={post} />
    </MainContents>
  );
};
export default PostPage;
