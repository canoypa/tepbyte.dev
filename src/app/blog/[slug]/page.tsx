import { notFound } from "next/navigation";
import { fetchPost, fetchPostList } from "~/api/post";
import { PostInfo, Tags, Thumbnail } from "~/features/blog";
import { MainContents } from "~/features/main_contents";
import { MarkdownRenderer } from "~/features/markdown";

export const generateStaticParams = async () => {
  const posts = await fetchPostList();

  return posts.map(({ slug }) => ({ slug }));
};

const PostPage = async ({ params: { slug } }: { params: { slug: string } }) => {
  const post = await fetchPost(slug);

  if (post === null) {
    notFound();
  }

  return (
    <MainContents>
      <Thumbnail image={post.meta.image} />
      <PostInfo post={post.meta} />
      <MarkdownRenderer tree={post.body} />
      <Tags tags={post.meta.tags} />
    </MainContents>
  );
};
export default PostPage;
