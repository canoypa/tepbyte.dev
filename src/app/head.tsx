import { FC } from "react";
import { generateHead } from "~/core/generate_head";

const Head: FC = () => {
  return generateHead({
    path: "/",
  });
};
export default Head;
