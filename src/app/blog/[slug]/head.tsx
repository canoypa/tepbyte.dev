import { fetchPost } from "~/api/post";
import { generateHead } from "~/core/generate_head";

const Head = async ({ params: { slug } }: { params: { slug: string } }) => {
  const post = await fetchPost(slug);

  if (post === null) {
    return generateHead({
      notFound: true,
    });
  }

  return generateHead({
    title: post.frontmatter.title,
  });
};
export default Head;
