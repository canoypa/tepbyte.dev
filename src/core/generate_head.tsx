import { ReactElement } from "react";

export type HeadOptions = Partial<{
  /** Page title */
  title: string;
  /** Remove site name suffix */
  titleSuffix: boolean;
}>;

export const generateHead = (options: HeadOptions = {}): ReactElement => {
  const title =
    options.title && options.titleSuffix !== false
      ? `${options.title} - Tepbyte`
      : "Tepbyte";

  return (
    <>
      <title>{title}</title>

      <meta name="viewport" content="width=device-width" />
    </>
  );
};
