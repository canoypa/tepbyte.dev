import { notFound } from "next/navigation";
import { fetchProduct, fetchProductList } from "~/api/product";
import { MainContents } from "~/features/main_contents";
import { MarkdownRenderer } from "~/features/markdown";
import { Info, Screenshot } from "~/features/product";

export const generateStaticParams = async () => {
  const products = await fetchProductList();

  return products.map((v: any) => ({ slug: v.slug }));
};

const ProductPage = async ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  const product = await fetchProduct(slug);

  if (product === null) {
    notFound();
  }

  return (
    <MainContents>
      <Screenshot images={product.frontmatter.images} />
      <Info product={product.frontmatter} />
      <MarkdownRenderer tree={product} />
    </MainContents>
  );
};
export default ProductPage;
