import { useMemo } from "react";
import { db } from "@/libs/firebase";
import useCurrentUser from "./useCurrentUser";
import { generateId } from "@/utils/functions";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

const useCreateChat = (userId: string) => {
  const currentUser = useCurrentUser();

  const createChat = async () => {
    const id = useMemo(() => {
      return generateId(currentUser?.id, userId);
    }, [currentUser?.id, userId]);

    await setDoc(doc(db, "chats", id), {
      usersMatched: [currentUser?.id, userId],
      timestamp: serverTimestamp(),
    });

    return id;
  };

  return createChat;
};

export default useCreateChat;
