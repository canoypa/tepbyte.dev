import { FC } from "react";
import { generateHead } from "~/core/generate_head";

const Head: FC = () => {
  return generateHead({
    title: "Products",
  });
};
export default Head;