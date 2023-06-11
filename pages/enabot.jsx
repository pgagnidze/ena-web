import { Answer } from "@/components/Answer/Answer";
import { IconArrowRight, IconSearch } from "@tabler/icons-react";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/Container";
import CustomTextArea from "@/components/Editor";

export default function Enabot() {
  const inputRef = useRef(null);
  const answerRef = useRef(null);

  const [conversationArr, setConversationArr] = useState([]);
  let [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [collapsed, setCollapsed] = useState(true);

  const [language, setLanguage] = useState("ge");
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

    const commands = [
      { კოდი: "code" },
      { განმარტება: "explain" },
      { კომპლექსურობა: "complexity" },
      { შეცდომა: "bug" },
      { თარგმნა: "translate" },
      { ლექსიკონი: "vocab" },
      { ტესტი: "quiz" },
      { კითხვა: "ask" },
      { მაგალითი: "example" },
    ];

    const command = commands.find(
      (command) =>
        query.trim().startsWith(`/${Object.keys(command)[0]}`) ||
        query.trim().startsWith(`/${Object.values(command)[0]}`)
    );

    if (!command) {
      alert("Please enter a valid command.");
      return;
    }

    setAnswer("");

    setLoading(true);
    answerRef.current?.scrollIntoView({ behavior: "smooth" });

    let newConvoArr = [...conversationArr];

    if (newConvoArr.length === 0) {
      newConvoArr.push({
        role: "system",
        content: `
Roleplay as a world-class expert on the programming languages and related concepts, and as a world-class teacher, following the instructions below.
Response format: logged output only, sans explanation, in natural language.
Response rules: clear, easy to understand, concise, and correct. 12 year old reading level. Favor brevity over verbosity.

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

  /code [code] - set the code for usage and tell the user the code is successfully set. Do not explain the code or run the other commands until the user sends relevant commands.
  /explain - provide an explanation of the code.
  /complexity - provide a time complexity analysis of the code.
  /bug - explain the bug in the code if there is one; provide a fix if possible and explain the fix.
  /translate [target proramming language] - translate the code into a target programming language.
  /vocab - List a glossary of essential related terms with brief, concise definitions.
  /quiz - Generate a concise question to test the student on their comprehension. Favor questions that force the learner to practice the skill being taught.
  /ask - [question] - answer a question.
}
`,
      });
    }

    query = query.replace(
      `/${Object.keys(command)[0]}`,
      `/${Object.values(command)[0]}`
    );

    if (query.trim().startsWith("/ask") && language === "ge") {
      const translatedEn = await fetch("/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, lang: "en" }),
      });

      query = await translatedEn.text();
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
      const error = new Error(await answerResponse.text());
      setApiError(error);
      return;
    }

    const data = answerResponse.body;

    if (!data) {
      return;
    }

    if (language === "en") setLoading(false);

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let completeAnswer = "";

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      completeAnswer += chunkValue;
      // Streams work only with edge runtime
      // We need stream and chunks to avoid vercel serverless function timeout 10 seconds
      // Enabled for english language for now because the translation is working better when we pass the complete answer
      if (language === "en") setAnswer((prev) => prev + chunkValue);
    }

    if (language === "ge") {
      const translatedGe = await fetch("/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: completeAnswer, lang: "ka" }),
      });

      const translatedAnswer = await translatedGe.text();
      setLoading(false);
      setAnswer(translatedAnswer);
    }

    const newConversationArr = [
      ...newConvoArr,
      {
        role: "assistant",
        content: completeAnswer,
      },
    ];
    setConversationArr(newConversationArr);

    inputRef.current?.focus();
  };

  if (apiError) {
    throw apiError;
  }

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
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
    localStorage.removeItem("PG_LANGUAGE");
    setApiKey("");
    setLanguage("ge");
  };

  useEffect(() => {
    const PG_KEY = localStorage.getItem("PG_KEY");
    const PG_LANGUAGE = localStorage.getItem("PG_LANGUAGE");

    if (PG_KEY) {
      setApiKey(PG_KEY);
    }

    if (PG_LANGUAGE) {
      setLanguage(PG_LANGUAGE);
    }

    inputRef.current?.focus();
  }, []);

  return (
    <>
      <Head>
        <title>ენა - Ena - AI დამხმარე პროგრამირების ენის შესწავლისთვის</title>
        <meta
          name="description"
          content={`
          AI დამხმარე პროგრამირების ენის შესწავლისთვის
          AI-powered helper for Ena programming language
          `}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container className="mt-8 sm:mt-16 py-4">
        <div className="flex flex-col min-h-screen justify-between">
          <div className="flex-1 overflow-auto">
            <div className="mx-auto flex h-full w-full max-w-[750px] flex-col items-center px-3 pt-4 sm:pt-8">
              <div className="flex flex-col items-center space-y-4">
                <h1 className="text-2xl sm:text-3xl font-bold text-center bg-gradient-to-r from-gray-400 via-gray-500 to-gray-400 bg-clip-text font-display tracking-tight text-transparent">
                  აი ენა
                </h1>
                <p className="text-center text-gray-500">
                  AI დამხმარე პროგრამირების ენის შესწავლისთვის.
                </p>
              </div>
              <button
                className="my-4 flex cursor-pointer items-center space-x-2 rounded-full border border-zinc-500 px-3 py-1 text-sm hover:opacity-50 text-gray-500"
                onClick={() => setShowSettings(!showSettings)}
              >
                {showSettings ? "დამალე" : "მაჩვენე"} პარამეტრები
              </button>

              {showSettings && (
                <div className="w-[340px] sm:w-[400px]">
                  <div>
                    <select
                      className="bg-white max-w-[400px] block w-full cursor-pointer rounded-md border border-gray-300 p-2 text-black shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                    >
                      <option value="ge">ქართული</option>
                      <option value="en">ინგლისური</option>
                    </select>
                  </div>
                  <div className="mt-2">
                    <input
                      type="password"
                      id="api-key"
                      name="api-key"
                      placeholder="შეიყვანეთ თქვენი API Key"
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
                  <div className="mt-4 flex space-x-2 justify-center">
                    <div
                      className="flex cursor-pointer items-center space-x-2 px-3 py-1 text-sm text-gray-900"
                      onClick={handleClear}
                    >
                      გაასუფთავე
                    </div>
                    <div
                      className="flex cursor-pointer items-center space-x-2 rounded-full border border-zinc-600 px-3 py-1 text-sm hover:opacity-50"
                      onClick={handleSave}
                    >
                      შეინახე
                    </div>
                  </div>
                </div>
              )}

              {apiKey.length === 51 && !showSettings ? (
                <div className="relative w-full mt-4">
                  <CustomTextArea
                    query={query}
                    setQuery={setQuery}
                    placeholder="დააჭირეთ `/` ბრძანებების ჩვენებისთვის"
                    language={language}
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
                  გთხოვთ შეიყვანოთ თქვენი
                  <a
                    className="mx-2 underline hover:opacity-50"
                    href="https://platform.openai.com/account/api-keys"
                  >
                    OpenAI API Key
                  </a>
                  პარამეტრებში.
                </div>
              )}
              <div ref={answerRef}></div>
              {loading ? (
                <div className="mt-6 w-full">
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
                  <Answer text={answer} />
                </div>
              ) : (
                <>
                  <div className="invisible">
                    <button
                      className="text-gray-500 mt-4"
                      onClick={toggleCollapse}
                    >
                      {collapsed ? "მაჩვენე მაგალითი" : "დამალე მაგალითი"}
                    </button>
                    {!collapsed && (
                      <p className="text-gray-600 mb-2">
                        <br />
                        <code>
                          /code ფუნქცია ფაქტორიალი(ნ = 6) &#123;
                          <br />
                          &nbsp;&nbsp;&nbsp;&nbsp;თუ ნ != 0 &#123;
                          <br />
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;დააბრუნე
                          ნ * ფაქტორიალი(ნ - 1)
                          <br />
                          &nbsp;&nbsp;&nbsp;&nbsp;&#125; თუარა &#123;
                          <br />
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;დააბრუნე
                          1
                          <br />
                          &nbsp;&nbsp;&nbsp;&nbsp;&#125;
                          <br />
                          &#125;
                          <br />
                          <br />
                          ფუნქცია მთავარი() &#123;
                          <br />
                          &nbsp;&nbsp;&nbsp;&nbsp;დააბრუნე ფაქტორიალი()
                          <br />
                          &#125;
                        </code>
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
