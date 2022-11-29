import { FC } from "react";
import { MainContents } from "~/features/main_contents";
import { PageHeadline } from "~/features/page_headline";

const ProductsPage: FC = () => {
  return (
    <MainContents>
      <PageHeadline>Products</PageHeadline>
    </MainContents>
  );
};
export default ProductsPage;
