import React from "react";
import Image from "next/image";
import IconBtn from "./IconBtn";
import { useRouter } from "next/router";
import { RiNotification2Fill } from "react-icons/ri";
import { FaFacebookMessenger } from "react-icons/fa";
import { SearchIcon } from "@heroicons/react/outline";
import useCurrentUser from "@/hooks/useCurrentUser";

const Header = () => {
  const router = useRouter();

  const currentUser = useCurrentUser();

  return (
    <header className="fixed top-0 z-30 flex h-12 w-screen items-center gap-2 border-b border-gray-300 bg-white px-6">
      <Image
        className="cursor-pointer object-contain"
        onClick={() => router.push("/")}
        src="/assets/facebook-logo.svg"
        width={135}
        height={130}
        alt="Logo"
      />

      <div className="flex-1">
        <div className="mx-auto flex max-w-lg items-center space-x-2 rounded-full bg-gray-100 px-3 py-1.5">
          <SearchIcon className="h-4 text-gray-500" />

          <input
            className="flex-1 bg-transparent text-sm outline-none md:text-base"
            type="text"
            placeholder="Search Facebook"
          />
        </div>
      </div>

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
          active={false}
          onClick={() => {}}
        />

        <IconBtn
          imgSrc={
            currentUser?.photoUrl
              ? currentUser?.photoUrl
              : "/assets/no-profile.jpeg"
          }
          text="Account"
          active={false}
          onClick={() => {}}
        />
      </div>
    </header>
  );
};

export default Header;
