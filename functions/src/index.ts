import { https } from "firebase-functions/v2";
import { fetchChangeFiles } from "./changes_fetcher";
import { updateProcessor } from "./contents/update";

export const update = https.onRequest(
  {
    region: "asia-northeast1",
  },
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
