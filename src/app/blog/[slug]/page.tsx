import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { PostInfo, Thumbnail } from '~/features/blog';
import { MainContents } from '~/features/main_contents';
import { MarkdownRenderer } from '~/features/markdown';
import { Tags } from '~/features/tags';
import { api } from '~/lib/api';

type Params = {
  slug: string;
};

type Props = {
  params: Params;
};

export const generateStaticParams = async (): Promise<Params[]> => {
  const posts = await api.posts.list();
  if (!posts) return [];

  return posts.map(({ slug }) => ({ slug }));
};

export async function generateMetadata(
  { params: { slug } }: Props,
  resolvingParent: ResolvingMetadata
): Promise<Metadata> {
  const parent = await resolvingParent;

  const product = await api.posts.get({ slug });

  if (product === null) {
    return {
      title: '404 Not Found',
    };
  }

  return {
    title: product.meta.title,
    description: product.meta.subhead,

    openGraph: {
      ...parent?.openGraph,
      title: product.meta.title,
      description: product.meta.subhead,
      url: `/blog/${slug}`,
    },

    alternates: {
      canonical: `/blog/${slug}`,
    },
  };
}

export default async function ({ params: { slug } }: Props) {
  const post = await api.posts.get({ slug });

  if (post === null) {
    notFound();
  }

  return (
    <MainContents>
      <Thumbnail image={post.meta.image} />
      <PostInfo post={post.meta} />
      <MarkdownRenderer tree={post.body} />
      {post.meta.tags.length > 0 && <Tags tags={post.meta.tags} />}
    </MainContents>
  );
}
