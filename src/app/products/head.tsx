import { FC } from "react";
import { generateHead } from "~/core/generate_head";

const Head: FC = () => {
  return generateHead({
    title: "Products",
    path: "/products",
  });
};
export default Head;
