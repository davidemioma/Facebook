import { db } from "@/libs/firebase";
import { doc, deleteDoc } from "firebase/firestore";

const useDeleteConversation = (id: string) => {
  const deleteConversation = async () => {
    if (!id) return;

    await deleteDoc(doc(db, "chats", id));
  };

  return deleteConversation;
};

export default useDeleteConversation;
