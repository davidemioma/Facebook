import React from "react";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import PostModal from "./modal/PostModal";
import ProfileModal from "./modal/ProfileModal";
import { useRouter } from "next/router";
import SearchModal from "./modal/SearchModal";
import useProfileModal from "@/hooks/useProfileModal";
import { useSearchModal } from "@/context/SearchProvider";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const router = useRouter();

  const profileModal = useProfileModal();

  const searchModal = useSearchModal();

  const closeAllModals = () => {
    profileModal.isOpen && profileModal.onClose();

    searchModal?.isOpen && searchModal.setIsOpen(false);
  };

  return (
    <div className="h-screen w-screen overflow-y-auto bg-gray-200">
      <Header />

      <PostModal />

      <ProfileModal />

      <SearchModal />

      <div className="mt-12" onClick={closeAllModals}>
        <Sidebar />

        <main className={`ml-14 ${router.asPath === "/" && "lg:ml-64"}`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
