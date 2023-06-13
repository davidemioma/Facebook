import React from "react";
import Avatar from "@/components/Avatar";
import useRoutes from "@/hooks/useRoutes";
import useCurrentUser from "@/hooks/useCurrentUser";
import Desktopitem from "./Desktopitem";

const Desktop = () => {
  const routes = useRoutes();

  const currentUser = useCurrentUser();

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-30 lg:flex lg:w-24 lg:flex-col lg:justify-between lg:overflow-y-auto lg:border-r lg:bg-white lg:py-4">
      <div className="flex items-center justify-center">
        <div className="flex w-full flex-col items-center gap-1">
          {routes.map((item) => (
            <Desktopitem
              key={item.label}
              label={item.label}
              href={item.href}
              Icon={item.icon}
              active={item.active}
              onClick={item.onClick}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center">
        <Avatar user={currentUser!} />
      </div>
    </div>
  );
};

export default Desktop;
