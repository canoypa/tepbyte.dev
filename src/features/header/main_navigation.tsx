"use client";

import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import { FC } from "react";
import { Tab, Tabs } from "~/components/tabs";

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
        renderItem={(item) => (
          <Tab
            key={item.value}
            label={item.label}
            value={item.value}
            active={`/${layout ?? ""}` === item.value}
            onClick={push}
          />
        )}
      />
    </nav>
  );
};
