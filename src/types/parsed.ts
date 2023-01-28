export type ImageMeta = {
  url: string;
  blurhash: string;
  attribution?: {
    username: string;
    user_url: string;
    site_url: string;
  };
};

export type LabelData = {
  label: string;
};

export type LinkData = LabelData & {
  url: string;
};

export type ProfileMeta = {
  name: string;
  subhead: string;
  photo: ImageMeta;
  background: ImageMeta;
  links: LinkData[];
};

export type ProductMeta = {
  title: string;
  subhead: string;
  links: LinkData[];
  images: ImageMeta[];
  tags: LabelData[];
};

export type ArticleMeta = {
  title: string;
  subhead: string;
  image: ImageMeta;
  tags: LabelData[];
  publishedAt: string;
  updatedAt?: string;
};
