import React, { useState } from "react";
import Image from "next/image";

interface Props {
  Icon?: any;
  imgSrc?: string;
  text?: string;
  active?: boolean;
  onClick?: () => void;
  isSide?: boolean;
}

const IconBtn = ({ Icon, imgSrc, text, active, onClick, isSide }: Props) => {
  const [showText, setShowText] = useState(false);

  const onClickhandler = () => {
    if (onClick) return onClick();
  };

  return (
    <div className="relative">
      <button
        className={`${
          active ? "bg-blue-100" : "bg-gray-100"
        } relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full hover:bg-gray-200`}
        onMouseEnter={() => setShowText(true)}
        onMouseLeave={() => setShowText(false)}
        onClick={onClickhandler}
      >
        {Icon && <Icon size={18} className={`${active && "text-blue-500"}`} />}

        {imgSrc && (
          <Image
            className="h-full w-full object-cover"
            fill
            src={imgSrc}
            alt=""
          />
        )}
      </button>

      {showText && (
        <div
          className={`absolute z-30 ${
            !isSide ? "-bottom-10 left-1/2 -translate-x-1/2" : ""
          } rounded-lg bg-black/75 px-4 py-2 text-xs text-white`}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default IconBtn;
