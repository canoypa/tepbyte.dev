import { ChangeFile } from "../types";
import { postUpdater } from "./updater/post";
import { privacyUpdater } from "./updater/privacy";
import { productUpdater } from "./updater/product";
import { profileUpdater } from "./updater/profile";

const processMatcher = [
  [/^posts\/(?<slug>\w+)\/index\.md$/, postUpdater],
  [/^products\/(?<slug>\w+)\/index\.md$/, productUpdater],
  [/^profile\/index\.md$/, profileUpdater],
  [/^privacy\/index\.md$/, privacyUpdater],
] as const;

export const updateProcessor = async (changeFiles: ChangeFile[]) => {
  const promises = changeFiles.map((change) => {
    const match = processMatcher.find(([pattern]) =>
      pattern.test(change.filename)
    );

    if (!match) return;

    const updater = match[1];
    return updater(change);
  });

  await Promise.allSettled(promises);
};
