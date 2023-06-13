import { useEffect, useState } from "react";
import { FriendProps } from "@/types";
import { db } from "@/libs/firebase";
import useCurrentUser from "./useCurrentUser";
import { collection, onSnapshot } from "firebase/firestore";

const useMyFriend = (userId: string) => {
  const currentUser = useCurrentUser();

  const [hasAdded, setHasAdded] = useState(false);

  const [myFriends, setMyFriends] = useState<FriendProps[]>([]);

  useEffect(
    () =>
      onSnapshot(
        collection(db, "users", `${currentUser?.id}`, "friends"),
        (snapshot) =>
          setMyFriends(
            snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }))
          )
      ),
    [currentUser?.id]
  );

  useEffect(
    () =>
      setHasAdded(
        myFriends.findIndex((myFriend) => myFriend.userId === userId) !== -1
      ),
    [myFriends, userId]
  );

  return { myFriends, hasAdded };
};

export default useMyFriend;
