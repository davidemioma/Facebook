import { useMemo } from "react";
import { ConversationProps } from "@/types";
import useCurrentUser from "./useCurrentUser";

const useOtherUser = (conversation: ConversationProps) => {
  const currentUser = useCurrentUser();

  const otherUser = useMemo(
    () =>
      conversation?.usersMatched?.filter((id) => id !== `${currentUser?.id}`),
    [currentUser?.id, conversation]
  );

  return otherUser?.[0];
};

export default useOtherUser;
