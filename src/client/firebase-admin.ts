import { credential } from "firebase-admin";
import { AppOptions, getApp, getApps, initializeApp } from "firebase-admin/app";

const options: AppOptions = {
  credential: credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  }),
};

export const firebaseAdminApp =
  getApps().length > 0 ? getApp() : initializeApp(options);
