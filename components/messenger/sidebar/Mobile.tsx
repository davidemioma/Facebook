import React from "react";
import Mobileitem from "./Mobileitem";
import useRoutes from "@/hooks/useRoutes";

const Mobile = () => {
  const routes = useRoutes();

  return (
    <div className="fixed bottom-0 z-40 flex w-full items-center justify-between border-t bg-white lg:hidden">
      {routes.map((item) => (
        <Mobileitem
          key={item.label}
          label={item.label}
          href={item.href}
          Icon={item.icon}
          active={item.active}
          onClick={item.onClick}
        />
      ))}
    </div>
  );
};

export default Mobile;
