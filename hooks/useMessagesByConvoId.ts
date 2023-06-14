import { useEffect, useState } from "react";
import { MessageProps } from "@/types";
import { db } from "@/libs/firebase";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import useCurrentUser from "./useCurrentUser";

const useMessagesByConvoId = (id: string) => {
  const currentUser = useCurrentUser();

  const [messages, setMessages] = useState<MessageProps[]>([]);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "chats", id, "messages"),
          orderBy("timestamp", "asc")
        ),
        (snapshot) =>
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
      hasSeen: [currentUser?.id],
      timestamp: serverTimestamp(),
    });
  };

  const updateMessage = async (message: MessageProps, userId: string) => {
    if (!message) return;

    await updateDoc(doc(db, "chats", id, "messages", message?.id), {
      hasSeen: [message?.senderId, userId],
    });
  };

  return { messages, sendMessage, updateMessage };
};

export default useMessagesByConvoId;
