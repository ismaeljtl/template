import Link from "next/link";
import React from "react";
import IData from "../interfaces/Data";

const Card: React.FC<{ item: IData }> = ({ item }) => {
  return (
    <div className="card card-compact w-full bg-base-100 dark:bg-red-300 shadow-xl">
      {/* <figure>
        <img
          className="w-full h-auto"
          src="https://placeimg.com/400/225/arch"
          alt="Shoes"
        />
      </figure> */}
      <div className="card-body prose">
        <h1 className="card-title capitalize">{item.title}</h1>
        <p className="capitalize">{item.body}</p>
        <div className="card-actions justify-end">
          <Link href={`/details/${item.id}`} className="btn btn-primary">
            Look item
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
