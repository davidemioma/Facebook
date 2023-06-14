import React, { useEffect, useRef } from "react";
import { MessageProps } from "@/types";
import MessageBox from "./MessageBox";
import useMessagesByConvoId from "@/hooks/useMessagesByConvoId";
import useCurrentUser from "@/hooks/useCurrentUser";

interface Props {
  conversationId: string;
  messages: MessageProps[];
}

const Body = ({ conversationId, messages }: Props) => {
  const currentUser = useCurrentUser();

  const bottomRef = useRef<HTMLDivElement>(null);

  const { updateMessage } = useMessagesByConvoId(conversationId);

  const lastMessage = messages[messages.length - 1];

  useEffect(() => {
    if (currentUser?.id && lastMessage?.senderId !== currentUser?.id) {
      updateMessage(lastMessage, `${currentUser?.id}`);
    }

    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [updateMessage, lastMessage, currentUser?.id]);

  return (
    <div className="flex-1 overflow-y-auto bg-white">
      {messages?.map((message, i) => (
        <MessageBox
          key={message.id}
          message={message}
          isLast={messages.length - 1 === i}
        />
      ))}

      <div ref={bottomRef} />
    </div>
  );
};

export default Body;
