import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export const Button = ({ eventOnClick, title = "", icon = null }) => {
  return (
    <button
      className="bg-[#B71C1C] text-white py-3 px-6 rounded-lg text-base cursor-pointer"
      onClick={eventOnClick}
    >
      {title}
      {icon && <FontAwesomeIcon icon={icon} />}
    </button>
  );
};
