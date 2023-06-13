import { useEffect, useState } from "react";
import { db } from "@/libs/firebase";
import { RequestProps, User } from "@/types";
import useCurrentUser from "./useCurrentUser";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

const useFriendRequests = () => {
  const currentUser = useCurrentUser();

  const [requests, setRequests] = useState<RequestProps[]>([]);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "users", `${currentUser?.id}`, "friend requests"),
          orderBy("timstamp", "desc")
        ),
        (snapshot) =>
          setRequests(
            snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }))
          )
      ),
    [currentUser?.id]
  );

  const answerFriendRequest = async (
    userAccount: User,
    requestId: string,
    task: string
  ) => {
    if (task === "add") {
      await deleteDoc(
        doc(db, "users", `${currentUser?.id}`, "friend requests", requestId)
      );

      await addDoc(collection(db, "users", `${currentUser?.id}`, "friends"), {
        userId: userAccount.id,
        mail: userAccount.mail,
      });

      await addDoc(collection(db, "users", userAccount.id, "friends"), {
        userId: currentUser?.id,
        mail: currentUser?.mail,
      });
    } else {
      await deleteDoc(
        doc(db, "users", `${currentUser?.id}`, "friend requests", requestId)
      );
    }
  };

  return { requests, answerFriendRequest };
};

export default useFriendRequests;
