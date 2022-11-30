import { FC } from "react";
import { components } from "./nodes";

export type MarkdownRendererProps = {
  tree: any;
};

export const MarkdownRenderer: FC<MarkdownRendererProps> = ({ tree }) => {
  const Component = components[tree.type];

  if (typeof Component === "undefined") return null;

  if (tree.children) {
    return (
      <Component node={tree}>
        {tree.children.map((child: any, index: number) => (
          <MarkdownRenderer key={index} tree={child} />
        ))}
      </Component>
    );
  }

  return <Component node={tree} />;
};
