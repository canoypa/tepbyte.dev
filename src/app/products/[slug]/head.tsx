import { fetchProduct } from "~/api/product";
import { generateHead } from "~/core/generate_head";

const Head = async ({ params: { slug } }: { params: { slug: string } }) => {
  const product = await fetchProduct(slug);

  if (product === null) {
    return generateHead({
      notFound: true,
    });
  }

  return generateHead({
    title: product.frontmatter.title,
  });
};
export default Head;
