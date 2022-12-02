import { fetchProduct } from "~/api/product";
import { generateHead } from "~/core/generate_head";

const Head = async ({ params: { slug } }: { params: { slug: string } }) => {
  const product = await fetchProduct(slug);

  return generateHead({
    title: product.frontmatter.title,
  });
};
export default Head;
