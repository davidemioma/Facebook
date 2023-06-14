import React, { useCallback } from "react";
import { ConversationProps } from "@/types";
import { useRouter } from "next/router";
import useOtherUser from "@/hooks/useOtherUser";
import useAccountById from "@/hooks/useAccountById";
import Avatar from "@/components/Avatar";
import useMessagesByConvoId from "@/hooks/useMessagesByConvoId";

interface Props {
  conversation: ConversationProps;
  selected?: boolean;
}

const ConvoBox = ({ conversation, selected }: Props) => {
  const router = useRouter();

  const otherUserId = useOtherUser(conversation);

  const account = useAccountById(otherUserId);

  const { messages } = useMessagesByConvoId(conversation.id);

  const lastMessage = messages[messages.length - 1];

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

        <p className="truncate text-sm font-medium">
          {lastMessage.message || "Started a conversation"}
        </p>
      </div>
    </div>
  );
};

export default ConvoBox;
