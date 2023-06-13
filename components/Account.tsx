import React from "react";
import Avatar from "./Avatar";
import { User } from "@/types";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-hot-toast";
import { HiUserAdd, HiUserRemove } from "react-icons/hi";
import useRequestByUserId from "@/hooks/useRequestByUserId";

interface Props {
  user: User;
}

const Account = ({ user }: Props) => {
  const { sendRequest, hasSent } = useRequestByUserId(user.id);

  const sendFriendRequest = () => {
    sendRequest(uuidv4())
      .then(() => {
        toast.success("Request sent");
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  };

  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <Avatar user={user} small />

        <p className="text-sm font-semibold capitalize">{user.displayName}</p>
      </div>

      <button
        className={`${
          hasSent ? "bg-gray-300" : "bg-blue-200/50 text-blue-500"
        } flex w-[70px] justify-center rounded py-1 text-xs font-bold disabled:cursor-not-allowed sm:text-sm`}
        disabled={hasSent}
        onClick={sendFriendRequest}
      >
        {hasSent ? <HiUserRemove size={20} /> : <HiUserAdd size={20} />}
      </button>
    </div>
  );
};

export default Account;
