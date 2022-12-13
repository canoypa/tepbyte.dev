import { fetchProduct } from "~/api/product";
import { generateHead } from "~/core/generate_head";

const Head = async ({ params: { slug } }: { params: { slug: string } }) => {
  const product = await fetchProduct(slug);

  if (product === null) {
    return generateHead({
      notFound: true,
      path: `/products/${slug}`,
    });
  }

  return generateHead({
    title: product.frontmatter.title,
    path: `/products/${slug}`,
  });
};
export default Head;
