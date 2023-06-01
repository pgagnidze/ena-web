import { Answer } from "@/components/Answer/Answer";
import { IconArrowRight, IconSearch } from "@tabler/icons-react";
import Head from "next/head";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { Container } from "@/components/Container";

export default function Home() {
  const inputRef = useRef(null);

  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const [showSettings, setShowSettings] = useState(false);
  const [apiKey, setApiKey] = useState("");

  const handleAnswer = async () => {
    if (!apiKey) {
      alert("Please enter an API key.");
      return;
    }

    if (!query) {
      alert("Please enter a query.");
      return;
    }

    setAnswer("");

    setLoading(true);

    const prompt = `This is prompt: "${query}"`;

    const answerResponse = await fetch("/api/answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt, apiKey }),
    });

    if (!answerResponse.ok) {
      setLoading(false);
      throw new Error(answerResponse.statusText);
    }

    const data = answerResponse.body;

    if (!data) {
      return;
    }

    setLoading(false);

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setAnswer((prev) => prev + chunkValue);
    }

    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAnswer();
    }
  };

  const handleSave = () => {
    if (apiKey.length !== 51) {
      alert("Please enter a valid API key.");
      return;
    }

    localStorage.setItem("PG_KEY", apiKey);

    setShowSettings(false);
    inputRef.current?.focus();
  };

  const handleClear = () => {
    localStorage.removeItem("PG_KEY");
    setApiKey("");
  };

  useEffect(() => {
    const PG_KEY = localStorage.getItem("PG_KEY");

    if (PG_KEY) {
      setApiKey(PG_KEY);
    }

    inputRef.current?.focus();
  }, []);

  return (
    <>
      <Head>
        <title>ენა - Ena</title>
        <meta
          name="description"
          content={`AI-powered search and chat for Ena programming language.`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container className="mt-16 sm:mt-32">
        <div className="flex flex-col h-screen">
          <div className="flex-1 overflow-auto">
            <div className="mx-auto flex h-full w-full max-w-[750px] flex-col items-center px-3 pt-4 sm:pt-8">
              <button
                className="mt-4 flex cursor-pointer items-center space-x-2 rounded-full border border-zinc-600 px-3 py-1 text-sm hover:opacity-50"
                onClick={() => setShowSettings(!showSettings)}
              >
                {showSettings ? "Hide" : "Show"} Settings
              </button>

              {showSettings && (
                <div className="w-[340px] sm:w-[400px]">
                  <div className="mt-2">
                    <input
                      type="password"
                      id="api-key"
                      name="api-key"
                      placeholder="Enter your API key"
                      className="max-w-[400px] block w-full rounded-md border border-gray-300 p-2 text-black shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                      value={apiKey}
                      onChange={(e) => {
                        setApiKey(e.target.value);

                        if (e.target.value.length !== 51) {
                          setShowSettings(true);
                        }
                      }}
                    />
                  </div>
                  <p
                    className="mt-2 text-sm text-gray-500"
                    id="email-description"
                  >
                    We are not storing this on the server.
                  </p>
                  <div className="mt-4 flex space-x-2 justify-center">
                    <div
                      className="flex cursor-pointer items-center space-x-2 px-3 py-1 text-sm text-gray-900"
                      onClick={handleClear}
                    >
                      Clear
                    </div>
                    <div
                      className="flex cursor-pointer items-center space-x-2 rounded-full border border-zinc-600 px-3 py-1 text-sm hover:opacity-50"
                      onClick={handleSave}
                    >
                      Save
                    </div>
                  </div>
                </div>
              )}

              {apiKey.length === 51 && !showSettings ? (
                <div className="relative w-full mt-4">
                  <IconSearch className="absolute top-3 w-10 left-1 h-6 rounded-full opacity-50 sm:left-3 sm:top-4 sm:h-8" />

                  <input
                    ref={inputRef}
                    className="h-12 w-full rounded-full border border-zinc-600 pr-12 pl-11 focus:border-zinc-800 focus:outline-none focus:ring-1 focus:ring-zinc-800 sm:h-16 sm:py-2 sm:pr-16 sm:pl-16 sm:text-lg"
                    type="text"
                    placeholder="How can I write a factorial function in Ena?"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />

                  <button>
                    <IconArrowRight
                      onClick={handleAnswer}
                      className="absolute right-2 top-2.5 h-7 w-7 rounded-full bg-gray-500 p-1 hover:cursor-pointer hover:bg-gray-600 sm:right-3 sm:top-3 sm:h-10 sm:w-10 text-white"
                    />
                  </button>
                </div>
              ) : (
                <div className="text-center font-bold text-3xl mt-7">
                  Please enter your
                  <a
                    className="mx-2 underline hover:opacity-50"
                    href="https://platform.openai.com/account/api-keys"
                  >
                    OpenAI API key
                  </a>
                  in settings.
                </div>
              )}

              {loading ? (
                <div className="mt-6 w-full">
                  <div className="font-bold text-2xl">Answer</div>
                  <div className="animate-pulse mt-2">
                    <div className="h-4 bg-gray-300 rounded"></div>
                    <div className="h-4 bg-gray-300 rounded mt-2"></div>
                    <div className="h-4 bg-gray-300 rounded mt-2"></div>
                    <div className="h-4 bg-gray-300 rounded mt-2"></div>
                    <div className="h-4 bg-gray-300 rounded mt-2"></div>
                  </div>
                </div>
              ) : answer ? (
                <div className="mt-6">
                  <div className="font-bold text-2xl mb-2">Answer</div>
                  <Answer text={answer} />
                </div>
              ) : (
                <div className="mt-6 text-center text-lg">{`AI-powered search for Ena programming language.`}</div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
