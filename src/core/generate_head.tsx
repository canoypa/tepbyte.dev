import { ReactElement } from "react";

export type HeadOptions = Partial<{
  /** Page title */
  title: string;
  /** Remove site name suffix */
  titleSuffix: boolean;

  /** Is page not found */
  notFound: boolean;
}>;

const resolveTitle = (options: HeadOptions = {}) => {
  if (options.notFound) {
    return "404 Not Found - Tepbyte";
  }

  if (options.title && options.titleSuffix !== false) {
    return `${options.title} - Tepbyte`;
  }

  return "Tepbyte";
};

export const generateHead = (options: HeadOptions = {}): ReactElement => {
  const title = resolveTitle(options);

  return (
    <>
      <title>{title}</title>

      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

      <meta name="viewport" content="width=device-width" />
    </>
  );
};
