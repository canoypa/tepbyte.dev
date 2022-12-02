import Link from "next/link";
import { FC } from "react";
import { Button } from "~/components/button";
import { NavigateNext } from "~/components/icons/navigate_next";
import { ProfileCard } from "./card";
import styles from "./hero.module.scss";
import { ProfileLink } from "./profile_link";

export type HeroProps = {
  profile: any;
};

export const Hero: FC<HeroProps> = ({ profile }) => {
  return (
    <div className={styles.root}>
      <div className={styles.card}>
        <ProfileCard
          name={profile.name}
          photo={profile.photo}
          image={profile.background}
        />
      </div>
      <div className={styles.info}>
        <span className={styles.subhead}>{profile.subhead}</span>
        <ProfileLink links={profile.links} />
        <span>
          <Link href="/about">
            <Button label="Read more" trailing={<NavigateNext />} />
          </Link>
        </span>
      </div>
    </div>
  );
};
