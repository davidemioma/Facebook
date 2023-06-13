import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import useCurrentUser from "./useCurrentUser";
import { db } from "@/libs/firebase";
import useAccountById from "./useAccountById";
import { useEffect, useState } from "react";

const useRequestByUserId = (userId: string) => {
  const currentUser = useCurrentUser();

  const account = useAccountById(userId);

  const [sent, setSent] = useState([]);

  const [hasSent, setHasSent] = useState(false);

  useEffect(
    () =>
      onSnapshot(
        collection(db, "users", `${currentUser?.id}`, "sent"),
        (snapshot: any) =>
          setSent(
            snapshot.docs.map((doc: any) => ({
              id: doc.id,
              ...doc.data(),
            }))
          )
      ),
    [currentUser?.id]
  );

  useEffect(
    () =>
      setHasSent(
        sent?.findIndex((item: any) => item.mail === account?.mail) !== -1
      ),
    [sent, account?.id]
  );

  const sendRequest = async (id: string) => {
    await addDoc(collection(db, "users", userId, "notifications"), {
      requestId: currentUser?.id,
      task: "friend request",
      seen: false,
      timstamp: serverTimestamp(),
    });

    await setDoc(doc(db, "users", userId, "friend requests", id), {
      requestId: currentUser?.id,
      mail: currentUser?.mail,
      timstamp: serverTimestamp(),
    });

    await addDoc(collection(db, "users", currentUser?.id!, "sent"), {
      mail: account?.mail,
    });

    await updateDoc(doc(db, "users", userId), {
      hasNotification: true,
    });
  };

  return { sendRequest, hasSent };
};

export default useRequestByUserId;
