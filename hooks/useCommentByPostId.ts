import { useEffect, useState } from "react";
import { db } from "@/libs/firebase";
import { CommentProps } from "@/types";
import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

import useCurrentUser from "./useCurrentUser";

const useCommentByPostId = (id: string) => {
  const currentUser = useCurrentUser();

  const [comments, setComments] = useState<CommentProps[]>([]);

  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "comments"), (snapshot) =>
        setComments(
          snapshot.docs.map((doc: any) => ({
            id: doc.id,
            ...doc.data(),
          }))
        )
      ),
    [id]
  );

  const addComment = async (comment: string) => {
    await addDoc(collection(db, "posts", id, "comments"), {
      userId: currentUser?.id,
      comment,
      timestamp: serverTimestamp(),
    });
  };

  return { comments, addComment };
};

export default useCommentByPostId;
