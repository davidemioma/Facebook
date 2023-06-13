import { db } from "@/libs/firebase";
import useCurrentUser from "./useCurrentUser";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

const useCreateChat = (userId: string) => {
  const currentUser = useCurrentUser();

  const createChat = async (chataId: string) => {
    await setDoc(doc(db, "chats", chataId), {
      usersMatched: [currentUser?.id, userId],
      timestamp: serverTimestamp(),
    });
  };

  return createChat;
};

export default useCreateChat;
