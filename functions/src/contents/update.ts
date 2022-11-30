import { ChangeFile } from "../types";
import { PostRemover, postUpdater } from "./updater/post";
import { privacyUpdater } from "./updater/privacy";
import { productRemover, productUpdater } from "./updater/product";
import { profileUpdater } from "./updater/profile";

const processMatcher: [
  RegExp,
  { [key in ChangeFile["action"]]: (change: ChangeFile) => void }
][] = [
  [
    /^posts\/(?<slug>\w+)\/index\.md$/,
    {
      update: postUpdater,
      remove: PostRemover,
    },
  ],
  [
    /^products\/(?<slug>\w+)\/index\.md$/,
    {
      update: productUpdater,
      remove: productRemover,
    },
  ],
  [
    /^profile\/index\.md$/,
    {
      update: profileUpdater,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      remove: () => {},
    },
  ],
  [
    /^privacy\/index\.md$/,
    {
      update: privacyUpdater,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      remove: () => {},
    },
  ],
];

export const updateProcessor = async (changeFiles: ChangeFile[]) => {
  const promises = changeFiles.map((change) => {
    const match = processMatcher.find(([pattern]) =>
      pattern.test(change.filename)
    );

    if (!match) return;

    if (change.action === "update") {
      match[1].update(change);
    }
    if (change.action === "remove") {
      match[1].remove(change);
    }
  });

  await Promise.allSettled(promises);
};
