import Head from "next/head";
import { CodeEditor } from "@/components/CodeEditor/CodeEditor";

export default function Code() {
  return (
    <>
      <Head>
        <title>ენა - Ena - გაუშვი კოდი</title>
        <meta
          name="description"
          content={`
          ენა - გაუშვი კოდი
          Ena - Compile code
          `}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CodeEditor />
    </>
  );
}
