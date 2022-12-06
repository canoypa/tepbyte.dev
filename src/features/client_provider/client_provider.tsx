import { getAnalytics } from "firebase/analytics";
import { FC } from "react";
import { firebaseApp } from "~/client/firebase";

if (typeof window !== "undefined") {
  getAnalytics(firebaseApp);
}

export const ClientProvider: FC = () => {
  return <></>;
};
