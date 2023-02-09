import Link from 'next/link';
import { FC } from 'react';
import { Card } from '~/components/card';
import { tw } from '~/lib/tw';
import { ArticleMeta } from '~/types/parsed';

const styles = {
  root: /* Tailwind */ tw`
    flex flex-col gap-4
    sm:gap-6`,
};

export type BlogListProps = {
  items: Array<ArticleMeta & { slug: string }>;
};

export const BlogList: FC<BlogListProps> = ({ items }) => {
  return (
    <div className={styles.root}>
      {items.map((v) => (
        <Card
          key={v.slug}
          as={Link}
          href={`/blog/${v.slug}`}
          title={v.title}
          summery={v.subhead}
          media={v.image.url}
        />
      ))}
    </div>
  );
};
