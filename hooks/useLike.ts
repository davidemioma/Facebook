import { useEffect, useState } from "react";
import { Likeprops } from "@/types";
import { db } from "@/libs/firebase";
import useCurrentUser from "./useCurrentUser";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";

const useLike = (postId: string) => {
  const currentUser = useCurrentUser();

  const [likes, setLikes] = useState<Likeprops[]>([]);

  const [hasLiked, setHasLiked] = useState(false);

  useEffect(
    () =>
      onSnapshot(collection(db, "posts", postId, "likes"), (snapshot) =>
        setLikes(
          snapshot.docs.map((doc: any) => ({
            id: doc.id,
            ...doc.data(),
          }))
        )
      ),
    [postId]
  );

  useEffect(
    () =>
      setHasLiked(
        likes?.findIndex((like) => like.id === currentUser?.id) !== -1
      ),
    [likes, currentUser?.id]
  );

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", postId, "likes", currentUser?.id!));
    } else {
      await setDoc(doc(db, "posts", postId, "likes", currentUser?.id!), {
        firstname: currentUser?.firstname,
        surname: currentUser?.surname,
      });
    }
  };

  return { likes, hasLiked, likePost };
};

export default useLike;
