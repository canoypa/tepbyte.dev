import { cache } from "react";
import { request } from "./request";

type Privacy = { body: any };
export const get = cache(async () => {
  const path = "privacy/get";
  const data = await request<Privacy>(path);
  return data;
});
