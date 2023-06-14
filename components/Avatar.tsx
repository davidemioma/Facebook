import React from "react";
import Link from "next/link";
import Image from "next/image";
import { User } from "@/types";

interface Props {
  user: User;
  small?: boolean;
}

const Avatar = ({ user, small }: Props) => {
  return (
    <Link href={`/profile/${user?.id}`}>
      <div className="relative">
        <div
          className={`relative ${
            small ? "h-8 w-8" : "h-10 w-10"
          } cursor-pointer overflow-hidden rounded-full`}
        >
          <Image
            className="object-cover"
            src={user?.photoUrl || "/assets/no-profile.jpeg"}
            fill
            alt=""
          />
        </div>

        {user?.isActive && (
          <div className="absolute right-0 top-0 h-2 w-2 rounded-full bg-green-500 ring-2 ring-white md:h-3 md:w-3" />
        )}
      </div>
    </Link>
  );
};

export default Avatar;
