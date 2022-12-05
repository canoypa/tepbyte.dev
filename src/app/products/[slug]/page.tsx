import { fetchProduct, fetchProductList } from "~/api/product";
import { MainContents } from "~/features/main_contents";
import { MarkdownRenderer } from "~/features/markdown";
import { Info, Screenshot } from "~/features/product";

export const generateStaticParams = async () => {
  const products = await fetchProductList();

  return products.map((product) => ({ slug: product.id }));
};

const ProductPage = async ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  const product = await fetchProduct(slug);

  return (
    <MainContents>
      <Screenshot images={product.frontmatter.images} />
      <Info product={product.frontmatter} />
      <MarkdownRenderer tree={product} />
    </MainContents>
  );
};
export default ProductPage;
