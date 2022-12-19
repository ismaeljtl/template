import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import LoadingCardGrid from "~/components/LoadingCardGrid";
import CardGrid from "../components/CardGrid";
import IData from "../interfaces/Data";
import Error from "../components/Error";

export default function Home() {
  const [data, setData] = useState<IData[] | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchCharacters = async () => {
    setLoading(true);
    try {
      if (!process.env.NEXT_PUBLIC_API_URL) return;
      const data: IData[] = await (
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`).then()
      ).json();
      setLoading(false);
      setData(data);
    } catch (error) {
      setError("Sorry, there has been an error. Please, try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  return (
    <>
      {error && <Error errorMsg={error} />}
      {loading && <LoadingCardGrid numCards={9} />}
      {data && <CardGrid data={data} />}
    </>
  );
}
