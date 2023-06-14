import React from "react";
import SidebarBtn from "./SidebarBtn";
import { signout } from "@/utils/functions";
import { useRouter } from "next/router";
import { HomeIcon } from "@heroicons/react/solid";
import { LogoutIcon } from "@heroicons/react/outline";
import { RiNotification2Fill } from "react-icons/ri";
import { FaFacebookMessenger } from "react-icons/fa";
import useCurrentUser from "@/hooks/useCurrentUser";

const Sidebar = () => {
  const router = useRouter();

  const currentUser = useCurrentUser();

  return (
    <div
      className={`fixed top-12 z-20 h-full bg-white ${
        router.asPath === "/"
          ? "w-14 lg:w-64 lg:bg-transparent lg:pr-3"
          : "w-14"
      } border-r border-gray-300`}
    >
      <div className="flex flex-col gap-3 py-5">
        <SidebarBtn
          Icon={HomeIcon}
          href="/"
          text="Home"
          active={router.asPath === "/"}
        />

        <SidebarBtn
          imgSrc={currentUser?.photoUrl || "/assets/no-profile.jpeg"}
          href={`/profile/${currentUser?.id}`}
          text="profile"
          active={router.asPath === `/profile/${currentUser?.id}`}
        />

        <SidebarBtn
          imgSrc="/assets/friends.png"
          href="/requests"
          text="Requests"
          active={router.asPath === "/requests"}
        />

        <div className="flex flex-col gap-3 md:hidden">
          <SidebarBtn
            Icon={RiNotification2Fill}
            href="/notifications"
            text="notifications"
            active={router.asPath === "/notifications"}
          />

          <SidebarBtn
            Icon={FaFacebookMessenger}
            href="/chats"
            text="chats"
            active={router.asPath === "/chats"}
          />

          <SidebarBtn
            Icon={LogoutIcon}
            href=""
            text="Logout"
            active={false}
            onClick={() => signout(`${currentUser?.id}`)}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
