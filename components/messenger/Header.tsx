import React, { useMemo } from "react";
import Link from "next/link";
import { ConversationProps } from "@/types";
import useOtherUser from "@/hooks/useOtherUser";
import useAccountById from "@/hooks/useAccountById";
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2";
import Avatar from "../Avatar";
import useProfileDrawer from "@/hooks/useProfileDrawer";

interface Props {
  conversation: ConversationProps | null;
}

const Header = ({ conversation }: Props) => {
  const otherUserId = useOtherUser(conversation!);

  const account = useAccountById(`${otherUserId}`);

  const profileDrawer = useProfileDrawer();

  const statusText = useMemo(() => {
    return account?.isActive ? "Active" : "Offline";
  }, [account?.isActive]);

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

        <div className="flex flex-col">
          <p>{account?.displayName}</p>

          <p className="text-sm font-light text-neutral-500">{statusText}</p>
        </div>
      </div>

      <HiEllipsisHorizontal
        className="cursor-pointer text-sky-500 transition hover:text-sky-600"
        size={32}
        onClick={() => profileDrawer.onOpen()}
      />
    </div>
  );
};

export default Header;
