import { notFound } from "next/navigation";
import { fetchPost, fetchPostList } from "~/api/post";
import { PostInfo, Thumbnail } from "~/features/blog";
import { MainContents } from "~/features/main_contents";
import { MarkdownRenderer } from "~/features/markdown";

export const generateStaticParams = async () => {
  const posts = await fetchPostList();

  return posts.map((post) => ({ slug: post.id }));
};

const PostPage = async ({ params: { slug } }: { params: { slug: string } }) => {
  const post = await fetchPost(slug);

  if (post === null) {
    notFound();
  }

  return (
    <MainContents>
      <Thumbnail image={post.frontmatter.image} />
      <PostInfo post={post.frontmatter} />
      <MarkdownRenderer tree={post} />
    </MainContents>
  );
};
export default PostPage;
