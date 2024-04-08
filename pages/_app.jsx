import "@/styles/globals.css";
import { Noto_Sans_Georgian } from "next/font/google";
import { Header } from "@/components/Header";
import { ErrorBoundary } from "react-error-boundary";
import { Analytics } from "@vercel/analytics/react";

const notoSansGeo = Noto_Sans_Georgian({ subsets: ["georgian"] });

function AppContent({ Component, pageProps }) {
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

function handleError(error) {
  let errorMessage = error.message;
  if (errorMessage.includes("openai returned an error")) {
    try {
      const parsed = JSON.parse(errorMessage.slice(errorMessage.indexOf("{")));
      errorMessage = parsed.error.message;
    } catch (e) {}
    if (errorMessage.includes("exceeded your current quota")) {
      errorMessage =
        "You exceeded your current quota, please check your plan and billing details.";
    }
    if (errorMessage.includes("maximum context length")) {
      errorMessage =
        "You have reached to your maximum token limit, please start a new conversation.";
    }
    alert(`From OpenAI: ${errorMessage}`);
  }
}

export default function App({ Component, pageProps }) {
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <AppContent Component={Component} pageProps={pageProps} />
      )}
      onError={handleError}
    >
      <AppContent Component={Component} pageProps={pageProps} />
    </ErrorBoundary>
  );
}
