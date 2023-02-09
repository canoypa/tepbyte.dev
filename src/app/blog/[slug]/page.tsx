import { notFound } from 'next/navigation';
import { PostInfo, Thumbnail } from '~/features/blog';
import { MainContents } from '~/features/main_contents';
import { MarkdownRenderer } from '~/features/markdown';
import { Tags } from '~/features/tags';
import { api } from '~/lib/api';

export const generateStaticParams = async () => {
  const posts = await api.posts.list();

  return posts.map(({ slug }) => ({ slug }));
};

const PostPage = async ({ params: { slug } }: { params: { slug: string } }) => {
  const post = await api.posts.get({ slug });

  if (post === null) {
    notFound();
  }

  return (
    <MainContents>
      <Thumbnail image={post.meta.image} />
      <PostInfo post={post.meta} />
      <MarkdownRenderer tree={post.body} />
      {post.meta.tags.length > 0 && <Tags tags={post.meta.tags} />}
    </MainContents>
  );
};
export default PostPage;
