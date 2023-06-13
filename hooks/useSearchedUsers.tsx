import { useEffect, useState } from "react";
import { User } from "@/types";
import { db } from "@/libs/firebase";
import { collection, onSnapshot } from "firebase/firestore";

const useSearchedUsers = (searchTerm: string) => {
  const [users, setUsers] = useState<User[]>([]);

  const [searchedUsers, setSearchedUsers] = useState<User[]>([]);

  useEffect(
    () =>
      onSnapshot(collection(db, "users"), (snapshot) =>
        setUsers(
          snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }))
        )
      ),
    []
  );

  useEffect(
    () =>
      setSearchedUsers(
        users.filter((user) =>
          user.displayName.toLowerCase().includes(searchTerm.toLowerCase())
        )
      ),
    [searchTerm]
  );

  return searchedUsers;
};

export default useSearchedUsers;
