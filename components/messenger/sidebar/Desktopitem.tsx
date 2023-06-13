import React from "react";
import Link from "next/link";

interface Props {
  label: string;
  href: string;
  Icon?: any;
  active?: boolean;
  onClick?: () => void;
}

const Desktopitem = ({ label, href, Icon, active, onClick }: Props) => {
  const onClickHandler = () => {
    if (onClick) return onClick();
  };

  return (
    <div className="w-full" onClick={onClickHandler}>
      <Link
        href={href}
        className={`group flex items-center justify-center gap-3 p-3 text-sm font-semibold leading-6 hover:bg-gray-100 hover:text-black ${
          active ? "bg-gray-100 text-black" : "text-gray-500"
        }`}
      >
        <Icon size={24} classname="shrink-0" />
      </Link>
    </div>
  );
};

export default Desktopitem;
