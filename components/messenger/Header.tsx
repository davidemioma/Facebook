import React from "react";
import Link from "next/link";
import { ConversationProps } from "@/types";
import useOtherUser from "@/hooks/useOtherUser";
import useAccountById from "@/hooks/useAccountById";
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2";
import Avatar from "../Avatar";

interface Props {
  conversation: ConversationProps | null;
}

const Header = ({ conversation }: Props) => {
  const otherUserId = useOtherUser(conversation!);

  const account = useAccountById(`${otherUserId}`);

  return (
    <div className="flex w-full items-center justify-between border-b bg-white px-4 py-3 shadow-sm lg:px-6">
      <div className="flex items-center gap-3">
        <Link
          href={"/chats/conversations"}
          className="cursor-pointer text-sky-500 transition hover:text-sky-600 lg:hidden"
        >
          <HiChevronLeft size={32} />
        </Link>

        <Avatar user={account!} />

        <p>{account?.displayName}</p>
      </div>

      <HiEllipsisHorizontal
        className="cursor-pointer text-sky-500 transition hover:text-sky-600"
        size={32}
      />
    </div>
  );
};

export default Header;
