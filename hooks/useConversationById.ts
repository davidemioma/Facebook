import { useEffect, useState } from "react";
import { db } from "@/libs/firebase";
import { ConversationProps } from "@/types";
import { doc, onSnapshot } from "firebase/firestore";

const useConversationById = (id: string) => {
  const [conversation, setConversation] = useState<ConversationProps | null>(
    null
  );

  useEffect(
    () =>
      onSnapshot(doc(db, "chats", id), (snapshot: any) => {
        setConversation({
          id: snapshot.id,
          ...snapshot.data(),
        });
      }),
    [id]
  );

  return conversation;
};

export default useConversationById;
