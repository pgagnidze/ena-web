import Head from "next/head";
import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <>
      <Head>
        <title>ენა - ქართული პროგრამირების ენა</title>
        <meta
          name="description"
          content={`
          ენა - ქართული პროგრამირების ენა
          Ena - Georgian programming language
          `}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
    </>
  );
}
