import { useMemo } from "react";
import { useRouter } from "next/router";
import { signout } from "@/utils/functions";
import { HiChat } from "react-icons/hi";
import { HiArrowLeftOnRectangle, HiUsers } from "react-icons/hi2";
import useCurrentUser from "./useCurrentUser";

const useRoutes = () => {
  const router = useRouter();

  const currentUser = useCurrentUser();

  const routes = useMemo(
    () => [
      {
        label: "Chat",
        href: "/chats/conversations",
        icon: HiChat,
        active: router.pathname === "/chats/conversations",
      },
      {
        label: "Users",
        href: "/chats",
        icon: HiUsers,
        active: router.pathname === "/chats",
      },
      {
        label: "Logout",
        href: "#",
        onClick: () => signout(`${currentUser?.id}`),
        icon: HiArrowLeftOnRectangle,
      },
    ],
    [router.pathname]
  );

  return routes;
};

export default useRoutes;
