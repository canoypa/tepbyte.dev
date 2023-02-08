import * as posts from "./posts";
import * as privacy from "./privacy";
import * as products from "./products";
import * as profile from "./profile";

export const api = {
  posts: {
    get: posts.get,
    list: posts.list,
  },
  products: {
    get: products.get,
    list: products.list,
  },
  profile: {
    get: profile.get,
  },
  privacy: {
    get: privacy.get,
  },
};
