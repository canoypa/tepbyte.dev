import { notFound } from "next/navigation";
import { fetchProduct, fetchProductList } from "~/api/product";
import { MainContents } from "~/features/main_contents";
import { MarkdownRenderer } from "~/features/markdown";
import { Info, Screenshot, Tags } from "~/features/product";

export const generateStaticParams = async () => {
  const products = await fetchProductList();

  return products.map(({ slug }) => ({ slug }));
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
      <Screenshot images={product.meta.images} />
      <Info product={product.meta} />
      <MarkdownRenderer tree={product.body} />
      <Tags tags={product.meta.tags} />
    </MainContents>
  );
};
export default ProductPage;
