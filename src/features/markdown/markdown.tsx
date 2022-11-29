import { FC, PropsWithChildren } from "react";

export type MarkdownComponentProps = PropsWithChildren<{
  node: any;
}>;
export type MarkdownComponents = Record<string, FC<MarkdownComponentProps>>;

export type MarkdownRendererProps = {
  tree: any;
  components: MarkdownComponents;
};

export const MarkdownRenderer: FC<MarkdownRendererProps> = ({
  tree,
  components,
}) => {
  const Component = components[tree.type];

  if (typeof Component === "undefined") return null;

  if (tree.children) {
    return (
      <Component node={tree}>
        {tree.children.map((child: any, index: number) => (
          <MarkdownRenderer key={index} tree={child} components={components} />
        ))}
      </Component>
    );
  }

  return <Component node={tree} />;
};
