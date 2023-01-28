import { FC } from "react";
import { ArticleMeta } from "~/types/parsed";
import styles from "./info.module.scss";

export type PostInfoProps = {
  post: ArticleMeta;
};

export const PostInfo: FC<PostInfoProps> = ({ post }) => {
  return (
    <div className={styles.root}>
      <div className={styles.primary}>
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.subhead}>{post.subhead}</p>
      </div>
      <div className={styles.date}>
        <span>{post.publishedAt}</span>
        {post.updatedAt && (
          <>
            <span>-</span>
            <span>Updated {post.updatedAt}</span>
          </>
        )}
      </div>
    </div>
  );
};
