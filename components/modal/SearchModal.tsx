import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { SearchIcon } from "@heroicons/react/outline";
import { useSearchModal } from "@/context/SearchProvider";
import useSearchedUsers from "@/hooks/useSearchedUsers";

const SearchModal = () => {
  const router = useRouter();

  const searchModal = useSearchModal();

  const searchedUsers = useSearchedUsers(searchModal?.text!);

  const onClickHandler = (userId: string) => {
    router.push(`/profile/${userId}`);

    searchModal?.setText("");

    searchModal?.setIsOpen(false);
  };

  if (!searchModal?.isOpen) return null;

  return (
    <div className="fixed left-1/2 top-14 z-30 h-fit max-h-[60vh] w-[90vw] max-w-md -translate-x-1/2 rounded-lg bg-white p-3 shadow-md">
      {searchedUsers.length > 0 ? (
        <div className="flex h-full w-full flex-col gap-3 overflow-y-auto">
          {searchedUsers.map((user) => (
            <div
              key={user.id}
              className="flex cursor-pointer items-center space-x-2 rounded-lg px-3 py-2 hover:bg-gray-100"
              onClick={() => onClickHandler(user.id)}
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100">
                <SearchIcon className="h-3 text-blue-500" />
              </div>

              <p className="text-sm">{user.displayName}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex h-full items-center justify-center">
          <div className="flex flex-col items-center">
            <Image
              className="object-contain"
              src="/assets/empty.svg"
              width={90}
              height={90}
              alt=""
            />

            <p className="text-lg font-bold">No users found!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchModal;
