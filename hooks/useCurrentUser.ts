import { useEffect, useState } from "react";
import { User } from "@/types";
import { db, auth } from "@/libs/firebase";
import { onSnapshot, doc } from "@firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const useCurrentUser = () => {
  const [user] = useAuthState(auth);

  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(
    () =>
      onSnapshot(doc(db, "users", user?.uid!), (snapshot: any) => {
        setCurrentUser({
          id: snapshot.id,
          ...snapshot.data(),
        });
      }),
    []
  );

  return currentUser;
};

export default useCurrentUser;
