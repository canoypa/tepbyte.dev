import { region } from "firebase-functions";
import { fetchChangeFiles } from "./changes_fetcher";
import { updateProcessor } from "./contents/update";

export const update = region("asia-northeast1").https.onRequest(
  async (request, response) => {
    if (request.method !== "POST") {
      response.status(405).end();
      return;
    }

    if (request.body.token !== process.env.UPDATE_TOKEN) {
      response.status(401).end();
      return;
    }

    const changeFiles = await fetchChangeFiles(request.body.sha);
    updateProcessor(changeFiles);

    response.status(200).end();
  }
);
