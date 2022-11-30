export type AssetTypes = "profile" | "posts" | "products";

export const resolveImagePath = (type: AssetTypes, path: string) => {
  if (/^http/.test(path)) return path;

  const location = encodeURIComponent(`${type}/${path}`);
  return `${process.env.STORAGE_BASEURL}${location}?alt=media`;
};
