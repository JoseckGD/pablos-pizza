import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export const Button = ({
  eventOnClick,
  title = "",
  icon = null,
  secondary = false,
}) => {
  const buttonClassName = `
    py-3 px-6 rounded-lg text-base cursor-pointer border border-[#B71C1C]
    ${secondary ? "bg-white text-[#B71C1C]" : "bg-[#B71C1C] text-white"}
    hover:opacity-75
  `;

  return (
    <button className={buttonClassName} onClick={eventOnClick}>
      {title}
      {icon && <FontAwesomeIcon icon={icon} />}
    </button>
  );
};
