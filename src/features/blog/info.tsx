import { FC } from "react";
import { ArticleMeta } from "~/types/parsed";
import { PageHeadline } from "../page_headline";
import styles from "./info.module.scss";

export type PostInfoProps = {
  post: ArticleMeta;
};

export const PostInfo: FC<PostInfoProps> = ({ post }) => {
  const dateFormatter = Intl.DateTimeFormat("en-us", { dateStyle: "long" });

  const publishedAt = dateFormatter.format(Date.parse(post.publishedAt));
  const updatedAt =
    post.updatedAt && dateFormatter.format(Date.parse(post.updatedAt));

  return (
    <div className={styles.root}>
      <PageHeadline title={post.title} subhead={post.subhead} />
      <div className={styles.dateTime}>
        <time dateTime={post.publishedAt}>{publishedAt}</time>
        {updatedAt && (
          <>
            <span> - </span>
            <time dateTime={post.updatedAt}>Updated {updatedAt}</time>
          </>
        )}
      </div>
    </div>
  );
};
