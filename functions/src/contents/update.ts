import { ChangeFile } from "../types";
import { PostRemover, postUpdater } from "./updater/post";
import { postAssetRemover, postAssetUpdater } from "./updater/post_asset";
import { privacyUpdater } from "./updater/privacy";
import { productRemover, productUpdater } from "./updater/product";
import {
  productAssetRemover,
  productAssetUpdater,
} from "./updater/product_asset";
import { profileUpdater } from "./updater/profile";

const processMatcher: [
  RegExp,
  {
    [key in ChangeFile["action"]]: (change: ChangeFile) => Promise<void> | void;
  }
][] = [
  [
    /^posts\/(?<slug>.+)\/index\.md$/,
    {
      update: postUpdater,
      remove: PostRemover,
    },
  ],
  [
    /^posts\/(?<slug>.+)\/(?<filename>.+\.(?:png|jpg))$/,
    {
      update: postAssetUpdater,
      remove: postAssetRemover,
    },
  ],
  [
    /^products\/(?<slug>.+)\/index\.md$/,
    {
      update: productUpdater,
      remove: productRemover,
    },
  ],
  [
    /^products\/(?<slug>.+)\/(?<filename>.+\.(?:png|jpg))$/,
    {
      update: productAssetUpdater,
      remove: productAssetRemover,
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
      return match[1].update(change);
    }
    if (change.action === "remove") {
      return match[1].remove(change);
    }
  });

  await Promise.allSettled(promises);
};
