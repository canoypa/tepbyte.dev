import axios from "axios";
import { ChangeFile } from "./types";

export const revalidate = (changes: ChangeFile[]) => {
  const paths: Set<string> = new Set();

  changes.forEach((change) => {
    const postMatch = change.filename.match(/^posts\/(?<slug>.+)\/index\.md$/);
    if (postMatch) {
      paths.add("/blog");
      paths.add(`/blog/${postMatch.groups!.slug}`);
    }

    const productMatch = change.filename.match(
      /^products\/(?<slug>.+)\/index\.md$/
    );
    if (productMatch) {
      paths.add("/products");
      paths.add(`/products/${productMatch.groups!.slug}`);
    }

    const profileMatch = change.filename.match(/^profile\/index\.md$/);
    if (profileMatch) {
      paths.add("/");
      paths.add("/about");
    }

    const privacyMatch = change.filename.match(/^privacy\/index\.md$/);
    if (privacyMatch) {
      paths.add("/privacy");
    }
  });

  paths.forEach((path) => {
    axios.post(process.env.REVALIDATE_ENDPOINT!, {
      token: process.env.REVALIDATE_TOKEN!,
      path: path,
    });
  });
};
