import "@/styles/globals.css";
import { Inter } from "@next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return (
    <div className="relative">
      <Header />
      <main className={inter.className}>
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}
