import { useCallback, useEffect, useState } from "react";
import { db } from "@/libs/firebase";
import { NotificationProps } from "@/types";
import useCurrentUser from "./useCurrentUser";
import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";

const useNotifications = () => {
  const currentUser = useCurrentUser();

  const [notifications, setNotifications] = useState<NotificationProps[]>([]);

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "users", `${currentUser?.id}`, "notifications")),
        (snapshot) =>
          setNotifications(
            snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }))
          )
      ),
    [currentUser?.id]
  );

  const viewNotification = useCallback(
    async (notificationId: string) => {
      await updateDoc(
        doc(db, "users", `${currentUser?.id}`, "notifications", notificationId),
        {
          seen: true,
        }
      );
    },
    [currentUser?.id]
  );

  return { notifications, viewNotification };
};

export default useNotifications;
