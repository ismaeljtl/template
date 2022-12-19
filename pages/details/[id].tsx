import { GetServerSideProps } from "next";
import Link from "next/link";
import React from "react";
import IData from "../../interfaces/Data";

const Details: React.FC<{ data: IData }> = ({ data }) => {
  return (
    <div className="flex flex-col prose mx-auto">
      <Link href="/" className="no-underline mb-4">
        ← Back
      </Link>
      <h1 className="capitalize">{data.title}</h1>
      <p className="capitalize">{data.body}</p>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id: any = context.params!.id;

  const data: IData = await (
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`).then()
  ).json();

  return { props: { data } };
};

export default Details;
