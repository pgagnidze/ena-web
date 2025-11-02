import Head from "next/head";
import { CodeEditor } from "@/components/CodeEditor/CodeEditor";

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
        <link rel="icon" type="image/x-icon" href="/favicon.ico?v=2" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png?v=2" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png?v=2" />
        <link rel="icon" type="image/svg+xml" href="/logo-pixel.svg?v=2" />
      </Head>
      <div className="min-h-screen bg-[#242933]">
        <CodeEditor />
      </div>
    </>
  );
}
