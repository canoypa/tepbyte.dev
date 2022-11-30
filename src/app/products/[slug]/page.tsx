import { fetchProduct } from "~/api/product";
import { MainContents } from "~/features/main_contents";
import { Info, Screenshot } from "~/features/product";

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
    </MainContents>
  );
};
export default ProductPage;
