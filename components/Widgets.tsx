import React from "react";
import Account from "./Account";
import useUsers from "@/hooks/useUsers";

const Widgets = () => {
  const users = useUsers();

  if (users.length === 0) return null;

  return (
    <div className="hidden w-64 lg:block">
      <h1 className="mb-5 text-lg font-semibold">People</h1>

      <div className="flex flex-col gap-3">
        {users.map((user) => (
          <Account key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Widgets;
