import React, { useEffect, useState } from "react";
import Account from "./Account";
import useUsers from "@/hooks/useUsers";
import { User } from "@/types";
import { getRandomUsers } from "@/utils/functions";

const Widgets = () => {
  const users = useUsers();

  const [randomUsers, setRandomUsers] = useState<User[]>([]);

  useEffect(() => {
    const randomUsers = getRandomUsers(users, 10);

    setRandomUsers(randomUsers);
  }, [users]);

  if (users.length === 0) return null;

  return (
    <div className="hidden w-64 lg:block">
      <h1 className="mb-5 text-lg font-semibold">People</h1>

      <div className="flex flex-col gap-3">
        {randomUsers.map((user) => (
          <Account key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Widgets;
