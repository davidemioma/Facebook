import { useEffect, useState } from "react";
import { PostFiles } from "../types";
import { db } from "@/libs/firebase";
import { collection, onSnapshot } from "firebase/firestore";

const useFilesByPostId = (id: string) => {
  const [files, setFiles] = useState<PostFiles[]>([]);

  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "files"), (snapshot) =>
        setFiles(
          snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }))
        )
      ),
    [id]
  );

  return files;
};

export default useFilesByPostId;
