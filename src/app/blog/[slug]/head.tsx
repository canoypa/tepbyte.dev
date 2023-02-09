import { AppHead } from '~/features/head';
import { api } from '~/lib/api';

const Head = async ({ params: { slug } }: { params: { slug: string } }) => {
  const post = await api.posts.get({ slug });

  if (post === null) {
    return <AppHead notFound path={`/blog/${slug}`} />;
  }

  return (
    <AppHead
      title={post.meta.title}
      description={post.meta.subhead}
      path={`/blog/${slug}`}
    />
  );
};
export default Head;
