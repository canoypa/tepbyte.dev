import { ReactElement } from "react";

const BASE_URL = "https://www.tepbyte.dev";

export type HeadOptions = Partial<{
  /** Page title */
  title: string;
  /** Remove site name suffix */
  titleSuffix: boolean;

  /** Description */
  description: string;

  /** Is page not found */
  notFound: boolean;
}> & {
  /** URL path */
  path: string;
};

const resolveTitle = (options: HeadOptions) => {
  const suffix = options.titleSuffix !== false ? " - Tepbyte" : "";

  if (options.notFound) {
    return `404 Not Found${suffix}`;
  }

  if (options.title) {
    return `${options.title}${suffix}`;
  }

  return "Tepbyte";
};

export const generateHead = (options: HeadOptions): ReactElement => {
  const title = resolveTitle(options);
  const description = options.description ?? "Cano's portfolio site.";
  const url = new URL(options.path, BASE_URL);

  const ogImageUrl = new URL("/assets/og-image.png", BASE_URL);

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="canonical" content={url.href} />

      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Tepbyte" />
      <meta property="og:url" content={url.href} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImageUrl.href} />

      <meta name="viewport" content="width=device-width" />
    </>
  );
};
