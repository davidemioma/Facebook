import React, { useEffect, useRef } from "react";
import { MessageProps } from "@/types";
import MessageBox from "./MessageBox";

interface Props {
  messages: MessageProps[];
}

const Body = ({ messages }: Props) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="flex-1 overflow-y-auto">
      {messages?.map((message, i) => (
        <MessageBox key={message.id} message={message} />
      ))}

      <div ref={bottomRef} />
    </div>
  );
};

export default Body;
