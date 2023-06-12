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
    </Link>
  );
};

export default Avatar;
