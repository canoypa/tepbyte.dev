import { FC } from "react";
import { generateHead } from "~/core/generate_head";

const Head: FC = () => {
  return generateHead({
    title: "About",
    path: "/about",
  });
};
export default Head;
