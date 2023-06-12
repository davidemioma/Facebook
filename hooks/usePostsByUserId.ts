import { useEffect, useState } from "react";
import { PostProps } from "@/types";
import { db } from "@/libs/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const usePostsByUserId = (id: string) => {
  const [posts, setPosts] = useState<PostProps[]>([]);

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), where("userId", "==", id)),
        (snapshot) =>
          setPosts(
            snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }))
          )
      ),
    [id]
  );

  return posts;
};

export default usePostsByUserId;
