import React from "react";

interface Props {
  label: string;
  active?: boolean;
  onClick: () => void;
}

const SelectBtn = ({ label, active, onClick }: Props) => {
  return (
    <div
      className={`${
        active
          ? "border-b-4 border-blue-500 text-blue-500"
          : "text-bborder-l-black mb-1 rounded-lg"
      } cursor-pointer px-8 py-4 hover:bg-gray-100`}
      onClick={onClick}
    >
      {label}
    </div>
  );
};

export default SelectBtn;
