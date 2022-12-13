import { fetchPost } from "~/api/post";
import { generateHead } from "~/core/generate_head";

const Head = async ({ params: { slug } }: { params: { slug: string } }) => {
  const post = await fetchPost(slug);

  if (post === null) {
    return generateHead({
      notFound: true,
      path: `/blog/${slug}`,
    });
  }

  return generateHead({
    title: post.frontmatter.title,
    description: post.frontmatter.subhead,
    path: `/blog/${slug}`,
  });
};
export default Head;
