import React, { useState } from "react";
import Avatar from "./Avatar";
import { RequestProps } from "@/types";
import useAccountById from "@/hooks/useAccountById";
import useFriendRequests from "@/hooks/useFriendRequests";
import { toast } from "react-hot-toast";

interface Props {
  request: RequestProps;
}

const Request = ({ request }: Props) => {
  const account = useAccountById(request.requestId);

  const { answerFriendRequest } = useFriendRequests();

  const [loading, setLoading] = useState(false);

  const onClickHandler = (task: string) => {
    if (!account) return;

    setLoading(true);

    answerFriendRequest(account, request.id, task)
      .then(() => {
        toast.success(`User has been ${task === "add" ? " added" : "removed"}`);
      })
      .catch((err) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="w-56 overflow-hidden rounded-xl bg-white p-3">
      <div className="mb-3 flex items-center gap-3">
        <Avatar user={account!} />

        <p className="font-semibold capitalize">{account?.displayName}</p>
      </div>

      <div className="text-sm md:text-base">
        <button
          className="mb-2 w-full rounded bg-blue-100 py-0.5 font-medium text-blue-500 disabled:cursor-not-allowed disabled:opacity-75"
          onClick={() => onClickHandler("add")}
          disabled={loading}
        >
          Add Friend
        </button>

        <button
          className="w-full rounded bg-gray-300 py-0.5 font-medium disabled:cursor-not-allowed disabled:opacity-75"
          onClick={() => onClickHandler("remove")}
          disabled={loading}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default Request;
