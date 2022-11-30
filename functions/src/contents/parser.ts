import { parseMarkdown } from "tepbyte-markdown";
import { ghRest } from "../client/github";

export const fetchParsedMarkdown = async (path: string) => {
  const file = await ghRest.repos.getContent({
    owner: process.env.CONTENTS_REPO_OWNER!,
    repo: process.env.CONTENTS_REPO_NAME!,
    path: path,
  });

  // assertion
  if (!("content" in file.data)) {
    throw new Error("Invalid data");
  }

  const fileContent = Buffer.from(file.data.content, "base64").toString();

  const parsed = await parseMarkdown(fileContent);

  return parsed;
};
