import { FC } from "react";
import styles from "./info.module.scss";

export type PostInfoProps = {
  post: any;
};

export const PostInfo: FC<PostInfoProps> = ({ post }) => {
  return (
    <div className={styles.root}>
      <div className={styles.primary}>
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.subhead}>{post.subhead}</p>
      </div>
      <div className={styles.date}>
        <span>{post["published-at"]}</span>
        {post["updated-at"] && (
          <>
            <span>-</span>
            <span>Updated {post["updated-at"]}</span>
          </>
        )}
      </div>
    </div>
  );
};
