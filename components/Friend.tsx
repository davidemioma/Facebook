import React, { useState } from "react";
import Avatar from "./Avatar";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-hot-toast";
import { FriendProps } from "@/types";
import { HiUserAdd } from "react-icons/hi";
import useMyFriend from "@/hooks/useMyFriend";
import useAccountById from "@/hooks/useAccountById";
import useCurrentUser from "@/hooks/useCurrentUser";
import useRequestByUserId from "@/hooks/useRequestByUserId";

interface Props {
  friend: FriendProps;
}

const Friend = ({ friend }: Props) => {
  const currentUser = useCurrentUser();

  const account = useAccountById(friend.userId);

  const { hasAdded } = useMyFriend(friend.userId);

  const { sendRequest } = useRequestByUserId(friend.userId);

  const [loading, setIsLoading] = useState(false);

  const sendFriendRequest = () => {
    setIsLoading(true);

    sendRequest(uuidv4())
      .then(() => {
        toast.success("Request sent");
      })
      .catch((err) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="flex items-center space-x-3 rounded-lg border px-4 py-3">
      <Avatar user={account!} />

      <p className="flex-1 text-sm font-bold capitalize md:text-base">
        {account?.displayName}
      </p>

      {friend.userId !== currentUser?.id && (
        <>
          {!hasAdded && (
            <button
              className="flex items-center space-x-1 rounded bg-blue-100 px-3 py-1 text-blue-500 transition-transform duration-200 hover:scale-105 disabled:cursor-not-allowed"
              onClick={sendFriendRequest}
              disabled={loading}
            >
              <HiUserAdd size={20} />

              <p className="hidden sm:inline">Add Friend</p>
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Friend;
