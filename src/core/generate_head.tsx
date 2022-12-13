import { ReactElement } from "react";

export type HeadOptions = Partial<{
  /** Page title */
  title: string;
  /** Remove site name suffix */
  titleSuffix: boolean;

  /** Description */
  description: string;

  /** Is page not found */
  notFound: boolean;
}>;

const resolveTitle = (options: HeadOptions = {}) => {
  const suffix = options.titleSuffix !== false ? " - Tepbyte" : "";

  if (options.notFound) {
    return `404 Not Found${suffix}`;
  }

  if (options.title) {
    return `${options.title}${suffix}`;
  }

  return "Tepbyte";
};

export const generateHead = (options: HeadOptions = {}): ReactElement => {
  const title = resolveTitle(options);
  const description = options.description ?? "Cano's portfolio site.";

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />

      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

      <meta name="viewport" content="width=device-width" />
    </>
  );
};
