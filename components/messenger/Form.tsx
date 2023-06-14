import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { HiPaperAirplane } from "react-icons/hi2";
import useMessagesByConvoId from "@/hooks/useMessagesByConvoId";

interface Props {
  conversationId: string;
}

const Form = ({ conversationId }: Props) => {
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const { sendMessage } = useMessagesByConvoId(conversationId as string);

  const sendMessageHandler = (e: React.FormEvent<HTMLFormElement>) => {
    if (!message.trim()) return;

    e.preventDefault();

    setLoading(true);

    sendMessage(message)
      .then(() => {
        toast.success("Message sent");

        setMessage("");
      })
      .catch((err) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="w-full border-t bg-white px-4 py-4 lg:gap-4 lg:px-6">
      <form className="flex items-center gap-2" onSubmit={sendMessageHandler}>
        <input
          className="w-full flex-1 rounded-full bg-neutral-100 px-4 py-2 text-black focus:outline-none"
          value={message}
          type="text"
          placeholder="Write a message"
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          type="submit"
          className="cursor-pointer rounded-full bg-sky-500 p-2 transition hover:bg-sky-600 disabled:opacity-80"
          disabled={!message.trim() || loading}
        >
          <HiPaperAirplane size={18} className="text-white" />
        </button>
      </form>
    </div>
  );
};

export default Form;
