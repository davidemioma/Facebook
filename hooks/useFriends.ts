import { useEffect, useState } from "react";
import { db } from "@/libs/firebase";
import { FriendProps } from "@/types";
import { collection, onSnapshot } from "firebase/firestore";

const useFriends = (userId: string) => {
  const [friends, setFriends] = useState<FriendProps[]>([]);

  useEffect(
    () =>
      onSnapshot(collection(db, "users", userId, "friends"), (snapshot) =>
        setFriends(
          snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }))
        )
      ),
    [userId]
  );

  return { friends };
};

export default useFriends;
