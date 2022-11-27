"use client";

import { usePathname, useRouter } from "next/navigation";
import { FC } from "react";
import { Tabs } from "../../components/tabs";

export const MainNavigation: FC = () => {
  const { push } = useRouter();
  const pathname = usePathname();

  return (
    <nav>
      <Tabs
        items={[
          { label: "Home", value: "/" },
          { label: "About", value: "/about" },
          { label: "Products", value: "/products" },
          { label: "Blog", value: "/blog" },
        ]}
        active={pathname ?? undefined}
        onChange={push}
      />
    </nav>
  );
};
