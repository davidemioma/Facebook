import React from "react";
import useFriends from "@/hooks/useFriends";
import useCurrentUser from "@/hooks/useCurrentUser";
import UserBox from "./UserBox";

const UserList = () => {
  const currentUser = useCurrentUser();

  const { friends } = useFriends(`${currentUser?.id}`);

  return (
    <div className="fixed inset-y-0 left-0 w-full overflow-y-auto border-r border-gray-200 bg-white px-5 pb-20 lg:left-24 lg:w-80 lg:pb-0">
      <h1 className="py-4 text-xl font-bold text-neutral-800">People</h1>

      <div className="flex flex-col">
        {friends.map((friend) => (
          <UserBox key={friend.id} friend={friend} />
        ))}
      </div>
    </div>
  );
};

export default UserList;
