import { FC } from "react";
import { ArticleMeta } from "~/types/parsed";
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
      <div className={styles.primary}>
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.subhead}>{post.subhead}</p>
      </div>
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
