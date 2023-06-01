import { Answer } from "@/components/Answer/Answer";
import { IconArrowRight, IconSearch } from "@tabler/icons-react";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/Container";
import { Logo } from "@/components/Logo";

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
          "You are a helpful assistant that accurately answers queries for Ena programming language. Show the code examples. Be accurate, helpful, concise, and clear.",
      });

      newConvoArr.push({
        role: "user",
        content: `
        Ena language is the first Georgian programming language and aims to make programming more accessible for Georgians by allowing them to write code in their native language. Ena uses the syntax of popular, widely-used languages, modified to use the Georgian alphabet and keywords.
        I allowed the use of English keywords and syntax to simplify the process of using Georgian or English interchangeably.
  
        This is how the factorial function looks in Ena Georgian programming language:
  
        ფუნქცია ფაქტორიალი(ნ = 6) {
          თუ ნ != 0 {
              დააბრუნე ნ * ფაქტორიალი(ნ - 1)
          } თუარა {
              დააბრუნე 1
          }
        }
        ფუნქცია მთავარი() {
            დააბრუნე ფაქტორიალი()
        }
  
        Here is the Georgian long form example of factorial function:
  
        ფუნქცია სახელად ფაქტორიალი(ციფრი = 6) {
          თუ პირობა სრულდება ციფრი != 0 {
              დააბრუნე მნიშვნელობა ციფრი * ფაქტორიალი(ციფრი - 1)
          } სხვა შემთხვევაში {
              დააბრუნე მნიშვნელობა 1
          }
        }
        
        ფუნქცია სახელად მთავარი() {
            დააბრუნე მნიშვნელობა ფაქტორიალი()
        }
        `,
      });
  
      newConvoArr.push({
        role: "assistant",
        content: "I understand",
      });
  
      newConvoArr.push({
        role: "user",
        content: `
        This is the first Euler challenge solved in Ena programming language:
  
        ფუნქცია მთავარი() {
          სულ = 0;
          ნ = 1000;
          ი = 0;
          სანამ ი < ნ {
              თუ ი % 3 == 0 || ი % 5 == 0 {
                  სულ = სულ + ი
              };
              ი = ი + 1;
          };
          დააბრუნე სულ
        }
  
        This is the second Euler challenge solved in Ena programming language:
  
        ფუნქცია მთავარი() {
          სულ = 0;
          ნ = 4000000;
          ა = 1;
          ბ = 2;
          სანამ ბ <= ნ {
              თუ ბ % 2 == 0 {
                  სულ = სულ + ბ
              };
              შემდეგი = ა + ბ;
              ა = ბ;
              ბ = შემდეგი;
          };
          დააბრუნე სულ
        }
  
        This is the third Euler challenge solved in Ena programming language:
  
        ფუნქცია ყველაზე_დიდი_მარტივი_გამყოფი(ნ) {
          მარტივი_რიცხვი = 2;
          ყველაზე_დიდი_გამყოფი = 1;
      
          სანამ ნ % 2 == 0 {
              ნ = ნ / 2;
              ყველაზე_დიდი_გამყოფი = 2;
          };
      
          მარტივი_რიცხვი = 3;
          სანამ მარტივი_რიცხვი * მარტივი_რიცხვი <= ნ {
              თუ ნ % მარტივი_რიცხვი == 0 {
                  ნ = ნ / მარტივი_რიცხვი;
                  ყველაზე_დიდი_გამყოფი = მარტივი_რიცხვი;
              } თუარა {
                  მარტივი_რიცხვი = მარტივი_რიცხვი + 2;
              }
          };
      
          თუ ნ > 2 {
              ყველაზე_დიდი_გამყოფი = ნ
          };
      
          დააბრუნე ყველაზე_დიდი_გამყოფი
        }
        
        ფუნქცია მთავარი() {
            დააბრუნე ყველაზე_დიდი_მარტივი_გამყოფი(600851475143)
        }
        
        I will ask you a few questions about Ena programming language for example project euler challenges, syntax checks, and more.
        `,
      });
  
      newConvoArr.push({
        role: "assistant",
        content: "I understand",
      });
    }

    newConvoArr.push({
      role: "user",
      content: query,
    });

    setConversationArr(newConvoArr);

    console.log(newConvoArr);

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
          content={`AI-powered search and chat for Ena programming language.`}
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
