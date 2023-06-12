import { User } from "@/types";
import { db } from "@/libs/firebase";
import { useEffect, useState } from "react";
import { onSnapshot, doc } from "@firebase/firestore";

const useAccountById = (id: string) => {
  const [account, setAccount] = useState<User | null>(null);

  useEffect(
    () =>
      onSnapshot(doc(db, "users", id), (snapshot: any) => {
        setAccount({
          id: snapshot.id,
          ...snapshot.data(),
        });
      }),
    [id]
  );

  return account;
};

export default useAccountById;
