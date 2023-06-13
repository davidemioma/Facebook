import React, { useState } from "react";
import { FriendProps } from "@/types";
import { toast } from "react-hot-toast";
import Avatar from "@/components/Avatar";
import { useRouter } from "next/router";
import useAccountById from "@/hooks/useAccountById";
import useCreateChat from "@/hooks/useCreateChat";
import { generateId } from "@/utils/functions";
import useCurrentUser from "@/hooks/useCurrentUser";

interface Props {
  friend: FriendProps;
}

const UserBox = ({ friend }: Props) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const currentUser = useCurrentUser();

  const account = useAccountById(friend.userId);

  const createChat = useCreateChat(account?.id!);

  const createConverstion = async () => {
    if (!account?.id) return;

    setLoading(true);

    try {
      const id = generateId(currentUser?.id, account?.id);

      await createChat(id);

      toast.success("Chat created");

      router.push(`/chats/conversations/${id}`);
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className="relative flex w-full cursor-pointer items-center gap-3 rounded-lg bg-white p-3 transition hover:bg-neutral-100 disabled:cursor-not-allowed"
      onClick={createConverstion}
      disabled={loading}
    >
      <Avatar user={account!} />

      <div className="flex-1 text-left">
        <p className="text-sm font-medium text-gray-900">
          {account?.displayName}
        </p>
      </div>
    </button>
  );
};

export default UserBox;
