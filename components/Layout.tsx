import React from "react";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="h-screen w-screen overflow-y-auto bg-gray-200">
      <Header />

      <div className="mt-12">
        <Sidebar />

        <main className="ml-14 lg:ml-64">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
