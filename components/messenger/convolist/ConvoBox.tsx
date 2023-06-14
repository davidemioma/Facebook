import React, { useCallback, useMemo } from "react";
import { ConversationProps } from "@/types";
import { useRouter } from "next/router";
import useOtherUser from "@/hooks/useOtherUser";
import useAccountById from "@/hooks/useAccountById";
import Avatar from "@/components/Avatar";
import useMessagesByConvoId from "@/hooks/useMessagesByConvoId";
import useCurrentUser from "@/hooks/useCurrentUser";

interface Props {
  conversation: ConversationProps;
  selected?: boolean;
}

const ConvoBox = ({ conversation, selected }: Props) => {
  const router = useRouter();

  const currentUser = useCurrentUser();

  const otherUserId = useOtherUser(conversation);

  const account = useAccountById(otherUserId);

  const { messages } = useMessagesByConvoId(conversation.id);

  const lastMessage = messages[messages.length - 1];

  const hasSeen = useMemo(() => {
    if (!lastMessage) return false;

    const seenArr = lastMessage?.hasSeen || [];

    if (!currentUser?.id) return false;

    return seenArr.findIndex((id) => id === `${currentUser.id}`) !== -1;
  }, [currentUser?.id, lastMessage]);

  const onClick = useCallback(() => {
    router.push(`/chats/conversations/${conversation.id}`);
  }, [conversation.id, router]);

  return (
    <div
      className={`relative flex w-full cursor-pointer items-center gap-3 rounded-lg ${
        selected ? "bg-neutral-100" : "bg-white"
      } p-3 transition hover:bg-neutral-100 disabled:cursor-not-allowed`}
      onClick={onClick}
    >
      <Avatar user={account!} />

      <div className="flex flex-1 flex-col text-left">
        <p className="text-sm font-medium text-gray-900">
          {account?.displayName}
        </p>

        <p
          className={`text-sm ${
            hasSeen ? "text-gray-500" : "font-medium text-black"
          } truncate`}
        >
          {lastMessage?.message || "Started a conversation"}
        </p>
      </div>
    </div>
  );
};

export default ConvoBox;
