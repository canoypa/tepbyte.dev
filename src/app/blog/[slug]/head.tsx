import { fetchPost } from "~/api/post";
import { generateHead } from "~/core/generate_head";

const Head = async ({ params: { slug } }: { params: { slug: string } }) => {
  const post = await fetchPost(slug);

  return generateHead({
    title: post.frontmatter.title,
  });
};
export default Head;
