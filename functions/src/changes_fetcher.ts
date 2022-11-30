import { ghRest } from "./client/github";
import { ChangeFile } from "./types";

export const fetchChangeFiles = async (ref: string): Promise<ChangeFile[]> => {
  const commit = await ghRest.repos.getCommit({
    owner: process.env.CONTENTS_REPO_OWNER!,
    repo: process.env.CONTENTS_REPO_NAME!,
    ref: ref,
  });

  const fileChanges = commit.data.files ?? [];

  const changeFiles = fileChanges.flatMap<ChangeFile>((change) => {
    if (
      change.status === "added" ||
      change.status === "copied" ||
      change.status === "modified"
    ) {
      return [{ filename: change.filename, action: "update" }];
    }

    if (change.status === "removed") {
      return [{ filename: change.filename, action: "remove" }];
    }

    if (change.status === "renamed" && change.previous_filename) {
      return [
        { filename: change.previous_filename, action: "remove" },
        { filename: change.filename, action: "update" },
      ];
    }

    return [];
  });

  return changeFiles;
};
