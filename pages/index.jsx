import { Answer } from "@/components/Answer/Answer";
import { IconArrowRight, IconSearch } from "@tabler/icons-react";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/Container";
import { Logo } from "@/components/Logo";
import TextareaAutosize from "react-textarea-autosize";

export default function Home() {
  const inputRef = useRef(null);

  const [conversationArr, setConversationArr] = useState([]);
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

    let newConvoArr = [...conversationArr];

    if (newConvoArr.length === 0) {
      newConvoArr.push({
        role: "system",
        content: 
`
Roleplay as a world-class expert on the programming languages and related concepts, and as a world-class teacher, following the instructions below.
Response format: logged output only, sans explanation, in natural language.
Response language: if the student's code is in English, respond in English. If the student's code is in Georgian, respond in Georgian.

EnaBot {
  Code
  Constraints {
    Style: supportive, educational, informative, encouraging, enthusiastic.
    Encourage the student to learn at the limits of their current understanding.
    You are role-playing as the tutor. Refrain from issuing commands.
    12 year old reading level.
  }
  Considerations {
    Code can be in any programming language.
    Code can be in Georgian language.
    Code will be everything after the /code command.
  }

  /code [code] - set the code; provide a brief introduction about EnaBot, then list available commands with descriptions.
  /explain - provide an explanation of the code.
  /complexity - provide a time complexity analysis of this code.
  /bug - explain the bug in the code if there is one. Provide a fix if possible and explain the fix.
  /translate [target proramming language] - translate it into a target programming language.
  /vocab - List a glossary of essential related terms with brief, concise definitions.
  /quiz Generate a concise question to test the student on their comprehension. Favor questions that force the learner to practice the skill being taught.
  /help - List commands with descriptions.
}
`,
      });
    }

    newConvoArr.push({
      role: "user",
      content: query,
    });

    setConversationArr(newConvoArr);

    const answerResponse = await fetch("/api/answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newConvoArr, apiKey }),
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
    let completeAnswer = ""; // variable to hold complete answer

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      completeAnswer += chunkValue; // concatenate chunkValue to completeAnswer
      setAnswer((prev) => prev + chunkValue); // update state using chunkValue
    }

    setAnswer(completeAnswer); // update state using completeAnswer
    const newConversationArr = [
      ...newConvoArr,
      {
        role: "assistant",
        content: completeAnswer, // use completeAnswer
      },
    ];
    setConversationArr(newConversationArr);

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
          content={`AI-powered helper for Ena programming language.`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container className="mt-8 sm:mt-32">
        <div className="flex flex-col h-screen">
          <div className="flex-1 overflow-auto">
            <div className="mx-auto flex h-full w-full max-w-[750px] flex-col items-center px-3 pt-4 sm:pt-8">
              <Logo className="h-24 w-auto" />
              <button
                className="mt-4 flex cursor-pointer items-center space-x-2 rounded-full border border-zinc-600 px-3 py-1 text-sm hover:opacity-50"
                onClick={() => setShowSettings(!showSettings)}
              >
                {showSettings ? "დამალე" : "მაჩვენე"} პარამეტრები
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
                  <TextareaAutosize
                    minRows={1}
                    style={{ resize: "none" }}
                    className="h-auto w-full rounded-md border border-zinc-600 pr-12 pl-6 focus:border-zinc-800 focus:outline-none focus:ring-1 focus:ring-zinc-800 sm:h-auto sm:py-2 sm:pr-16 sm:pl-8 sm:text-lg"
                    value={query}
                    placeholder="დასაწყებად აკრიფეთ /code [code]."
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  <button>
                    <IconArrowRight
                      onClick={handleAnswer}
                      className="absolute right-2 top-2.5 h-7 w-7 rounded-full bg-gray-500 p-1 hover:cursor-pointer hover:bg-gray-600 sm:right-3 sm:top-3 sm:h-6 sm:w-10 text-white"
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
                <div className="mt-6 text-center text-lg">{`AI-ით აღჭურვილი დამხმარე ენა პროგრამირების ენისთვის.`}</div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
