import Image from "next/image";
import Link from "next/link";
import React from "react";

export const Card = ({ route, title, description, icon }) => {
  return (
    <Link href={route}>
      <div
        className="bg-neutral-100
            rounded-lg shadow-2xl 
            flex flex-col justify-center items-center
            p-5 text-center
            hover:scale-105 gap-4
            transition-transform
            "
      >
        <h2 className="m-0 text-4xl text-neutral-800 font-bold">{title}</h2>
        <div className="flex justify-center items-center">
          <Image src={icon} alt="Icono" width={200} height={200} />
        </div>
        <p className="m-0 text-2xl text-neutral-500">{description}</p>
      </div>
    </Link>
  );
};
