import { FC } from "react";
import { generateHead } from "~/core/generate_head";

const Head: FC = () => {
  return generateHead({
    title: "Privacy",
    path: "/privacy",
  });
};
export default Head;
