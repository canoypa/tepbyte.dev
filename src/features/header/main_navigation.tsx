"use client";

import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import { FC } from "react";
import { Tabs } from "~/components/tabs";

export const MainNavigation: FC = () => {
  const { push } = useRouter();
  const layout = useSelectedLayoutSegment();

  return (
    <nav>
      <Tabs
        items={[
          { label: "Home", value: "/" },
          { label: "About", value: "/about" },
          { label: "Products", value: "/products" },
          { label: "Blog", value: "/blog" },
        ]}
        active={`/${layout}` ?? undefined}
        onChange={push}
      />
    </nav>
  );
};
