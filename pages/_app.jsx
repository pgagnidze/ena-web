import "@/styles/globals.css";
import { Noto_Sans_Georgian } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

const notoSansGeo = Noto_Sans_Georgian({ subsets: ["georgian"] });

export default function App({ Component, pageProps }) {
  return (
    <>
      <div className="relative">
        <main className={`${notoSansGeo.className}`}>
          <Component {...pageProps} />
        </main>
      </div>
      <Analytics />
    </>
  );
}
