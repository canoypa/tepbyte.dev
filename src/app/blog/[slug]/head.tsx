import { fetchPost } from "~/api/post";
import { AppHead } from "~/features/head";

const Head = async ({ params: { slug } }: { params: { slug: string } }) => {
  const post = await fetchPost(slug);

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
