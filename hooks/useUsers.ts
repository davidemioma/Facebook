import { useEffect, useState } from "react";
import { User } from "@/types";
import { db } from "@/libs/firebase";
import useCurrentUser from "./useCurrentUser";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const useUsers = () => {
  const currentUser = useCurrentUser();

  const [users, setUsers] = useState<User[]>([]);

  const [requestsEmails, setRequestsEmails] = useState([]);

  const [friendsEmails, setFriendsEmails] = useState([]);

  const [sentEmails, setSentEmails] = useState([]);

  useEffect(
    () =>
      onSnapshot(
        collection(db, "users", `${currentUser?.id}`, "friend requests"),
        (snapshot: any) =>
          setRequestsEmails(snapshot?.docs?.map((doc: any) => doc.data()?.mail))
      ),
    [currentUser?.id]
  );

  useEffect(
    () =>
      onSnapshot(
        collection(db, "users", `${currentUser?.id}`, "friends"),
        (snapshot: any) =>
          setFriendsEmails(snapshot?.docs?.map((doc: any) => doc.data()?.mail))
      ),
    [currentUser?.id]
  );

  useEffect(
    () =>
      onSnapshot(
        collection(db, "users", `${currentUser?.id}`, "sent"),
        (snapshot: any) =>
          setSentEmails(snapshot?.docs?.map((doc: any) => doc.data()?.mail))
      ),
    [currentUser?.id]
  );

  useEffect(() => {
    const newRequestsEmails =
      requestsEmails.length > 0 ? requestsEmails : ["test"];

    const newFriendsEmails =
      friendsEmails.length > 0 ? friendsEmails : ["test"];

    const newSentEmails = sentEmails.length > 0 ? sentEmails : ["test"];

    const unSub = onSnapshot(
      query(
        collection(db, "users"),
        where("mail", "not-in", [
          ...newRequestsEmails,
          ...newFriendsEmails,
          ...newSentEmails,
        ])
      ),
      (snapshot) => {
        const users = snapshot?.docs
          ?.map((doc: any) => ({ id: doc.id, ...doc.data() }))
          ?.filter((doc) => doc.id !== `${currentUser?.id}`);

        setUsers(users || []);
      }
    );

    return unSub;
  }, [requestsEmails, friendsEmails, sentEmails, currentUser?.id]);

  return users;
};

export default useUsers;
