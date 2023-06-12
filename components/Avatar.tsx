import React from "react";
import Link from "next/link";
import Image from "next/image";
import { User } from "@/types";

interface Props {
  user: User;
}

const Avatar = ({ user }: Props) => {
  return (
    <Link href={`/profile/${user?.id}`}>
      <div className="relative h-10 w-10 cursor-pointer overflow-hidden rounded-full">
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
