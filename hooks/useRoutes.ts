import { useMemo } from "react";
import { auth } from "@/libs/firebase";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import { HiChat } from "react-icons/hi";
import { HiArrowLeftOnRectangle, HiUsers } from "react-icons/hi2";

const useRoutes = () => {
  const router = useRouter();

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
        onClick: () => signOut(auth),
        icon: HiArrowLeftOnRectangle,
      },
    ],
    [router.pathname]
  );

  return routes;
};

export default useRoutes;
