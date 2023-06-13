import { useEffect, useState } from "react";
import { db } from "@/libs/firebase";
import { ConversationProps } from "@/types";
import useCurrentUser from "./useCurrentUser";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const useConversations = () => {
  const currentUser = useCurrentUser();

  const [conversations, setConversations] = useState<ConversationProps[]>([]);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "chats"),
          where("usersMatched", "array-contains", `${currentUser?.id}`)
        ),
        (snapshot) =>
          setConversations(
            snapshot.docs.map((doc: any) => ({
              id: doc.id,
              ...doc.data(),
            }))
          )
      ),
    [currentUser?.id]
  );

  return conversations;
};

export default useConversations;
