import { cache } from "react";
import { ProductMeta } from "~/types/parsed";
import { request } from "./request";

type Product = { meta: ProductMeta; body: any };
export const get = cache(async (params: { slug: string }) => {
  const path = "products/get";
  const data = await request<Product>(path, params);
  return data;
});

export const list = cache(async (params?: { limit?: number }) => {
  const path = "products/list";
  const data = await request<ProductMeta[]>(path, params);
  return data;
});
