import { components } from "@octokit/openapi-types";

export type ChangeFile = {
  filename: string;
  status: components["schemas"]["diff-entry"]["status"];
};
