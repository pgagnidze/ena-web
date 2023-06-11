import Head from "next/head";
import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <>
      <Head>
        <title>ენა - Ena - პირველი ქართული პროგრამირების ენა</title>
        <meta
          name="description"
          content={`
          ენა - პირველი ქართული პროგრამირების ენა
          Ena - The first Georgian programming language
          `}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Hero />
    </>
  );
}
