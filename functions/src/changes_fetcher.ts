import { ghRest } from "./client/github";
import { ChangeFile } from "./types";

export const fetchChangeFiles = async (ref: string): Promise<ChangeFile[]> => {
  const commit = await ghRest.repos.getCommit({
    owner: process.env.CONTENTS_REPO_OWNER!,
    repo: process.env.CONTENTS_REPO_NAME!,
    ref: ref,
  });

  const fileChanges = commit.data.files ?? [];

  const changeFiles = fileChanges.map((change) => ({
    filename: change.filename,
    status: change.status,
  }));

  return changeFiles;
};
