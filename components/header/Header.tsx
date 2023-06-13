import React from "react";
import Image from "next/image";
import IconBtn from "./IconBtn";
import { useRouter } from "next/router";
import { RiNotification2Fill } from "react-icons/ri";
import { FaFacebookMessenger } from "react-icons/fa";
import { SearchIcon } from "@heroicons/react/outline";
import useCurrentUser from "@/hooks/useCurrentUser";
import useProfileModal from "@/hooks/useProfileModal";
import { useSearchModal } from "@/context/SearchProvider";

const Header = () => {
  const router = useRouter();

  const currentUser = useCurrentUser();

  const profileModal = useProfileModal();

  const searchModal = useSearchModal();

  return (
    <header className="fixed top-0 z-30 flex h-12 w-screen items-center justify-between gap-2 border-b border-gray-300 bg-white px-6">
      <Image
        className="cursor-pointer object-contain"
        onClick={() => router.push("/")}
        src="/assets/facebook-logo.svg"
        width={135}
        height={130}
        alt="Logo"
      />

      {!router.asPath.includes("/profile") && (
        <div className="flex-1">
          <div className="mx-auto flex max-w-lg items-center space-x-2 rounded-full bg-gray-100 px-3 py-1.5">
            <SearchIcon className="h-4 text-gray-500" />

            <input
              className="flex-1 bg-transparent text-sm outline-none md:text-base"
              value={searchModal?.text}
              type="text"
              placeholder="Search Facebook"
              onChange={(e) => searchModal?.setText(e.target.value)}
            />
          </div>
        </div>
      )}

      <div className="hidden items-center gap-3 md:flex">
        <IconBtn
          Icon={FaFacebookMessenger}
          text="Messenger"
          active={router.asPath === "/chats"}
          onClick={() => router.push("/chats")}
        />

        <IconBtn
          Icon={RiNotification2Fill}
          text="Notification"
          active={router.asPath === "/notifications"}
          onClick={() => router.push("/notifications")}
        />

        <IconBtn
          imgSrc={currentUser?.photoUrl || "/assets/no-profile.jpeg"}
          text="Account"
          active={profileModal.isOpen}
          onClick={() => profileModal.toggle()}
        />
      </div>
    </header>
  );
};

export default Header;
