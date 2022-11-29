import { Octokit } from "@octokit/rest";

export const ghRest = new Octokit({
  auth: process.env.GITHUB_TOKEN,
}).rest;
