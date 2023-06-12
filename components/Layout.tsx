import React from "react";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import PostModal from "./modal/PostModal";
import ProfileModal from "./modal/ProfileModal";
import { useRouter } from "next/router";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const router = useRouter();

  return (
    <div className="h-screen w-screen overflow-y-auto bg-gray-200">
      <Header />

      <PostModal />

      <ProfileModal />

      <div className="mt-12">
        <Sidebar />

        <main className={`ml-14 ${router.asPath === "/" && "lg:ml-64"}`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
