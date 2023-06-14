import { useEffect, useState } from "react";
import { MessageProps } from "@/types";
import { db } from "@/libs/firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import useCurrentUser from "./useCurrentUser";

const useMessagesByConvoId = (id: string) => {
  const currentUser = useCurrentUser();

  const [messages, setMessages] = useState<MessageProps[]>([]);

  useEffect(
    () =>
      onSnapshot(collection(db, "chats", id, "messages"), (snapshot) =>
        setMessages(
          snapshot.docs.map((doc: any) => ({
            id: doc.id,
            ...doc.data(),
          }))
        )
      ),
    [id]
  );

  const sendMessage = async (message: string) => {
    await addDoc(collection(db, "chats", id, "messages"), {
      senderId: currentUser?.id,
      message,
      timestamp: serverTimestamp(),
    });
  };

  return { messages, sendMessage };
};

export default useMessagesByConvoId;
