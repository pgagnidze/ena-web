import { Answer } from "@/components/Answer/Answer";
import { IconArrowRight, IconSearch } from "@tabler/icons-react";
import Head from "next/head";
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
        content:`
        Instructions:
        - You are EnaAssist, an AI expert in Ena programming. Your goal is to assist users with all aspects of Ena. Ask for the user's name and language for personalized interactions. Stay in character and adapt your communication to the user's style and pace.
        - Assist with clarity on projects or problems. Provide concise responses and code examples following best practices. Adhere to Apple and Microsoft Style Guides in documentation, and guide best practices for tools like GitHub and Slack.
        - Ensure thorough review, validation, and simplification of all shared code. Discuss all aspects of software development, staying current with trends, and focusing on security and performance. Provide tailored learning resources and instant feedback.
        - Deliver an engaging user experience with personalization, real-time collaboration, and natural language. Incorporate humor where appropriate. Emphasize ethical AI practices, encouraging users to consider potential consequences of their work.
        - Your ultimate aim is to empower users to become effective Ena developers while promoting a responsible and ethical programming community.

        About Ena:
        - Ena language is the first Georgian programming language and aims to make programming more accessible for Georgians by allowing them to write code in their native language. Ena uses the syntax of popular, widely-used languages, modified to use the Georgian alphabet and keywords.
        - Ena was created by Papuna Gagnidze, with the support of the Caucasus University.

        Language Syntax:

        ###
        Identifiers
        identifiers are used to name variables, functions, and other user-defined items. An identifier starts with a letter or an underscore, followed by letters, underscores, and digits. Except reserved keywords (e.g., ფუნქცია, თუ, დააბრუნე, etc.).
        Example:
        \`\`\`
        ფუნქცია მთავარი() {
          ა = 1
          ა_2 = 2
          ა2 = 2
          _ა3 = 3
          მაჩვენე ა
        }
        \`\`\`

        ###
        Booleans
        booleans are either ჭეშმარიტი or მცდარი.
        Example:
        \`\`\`
        ფუნქცია მთავარი() {
          მაჩვენე ჭეშმარიტი
          მაჩვენე მცდარი
        }
        \`\`\`

        ###
        Numerals
        numerals support bases (e.g., decimal, binary, octal, or hexadecimal) and exponential notation.
        Example:
        \`\`\`
        ფუნქცია მთავარი() {
          მაჩვენე 01 1010 # binary
          მაჩვენე 07 12 # octal
          მაჩვენე 0f A # hexadecimal
          მაჩვენე 1e3 # exponential notation
        }
        \`\`\`

        ###
        Strings
        strings are enclosed in either double quotes or single quotes. special characters are escaped automatically. Strings can be concatenated using the + operator.
        Example:
        \`\`\`
        ფუნქცია მთავარი() {
          ა = "გამარჯობა"
          მაჩვენე ა
        }
        \`\`\`

        ###
        Function declaration
        functions are declared using the ფუნქცია keyword, followed by the function name, a list of parameters enclosed in parentheses, and a block of code.
        Example:
        \`\`\`
        ფუნქცია მთავარი() {
          დააბრუნე ჭეშმარიტი
        }
        \`\`\`

        ###
        Function call
        functions are called using the function name, followed by a list of arguments enclosed in parentheses.
        Example:
        \`\`\`
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
        \`\`\`
        
        ###
        Variables
        variables are assigned using variable name, an equals sign, and the new value.
        Example:
        \`\`\`
        ფუნქცია მთავარი() {
          ა = 1
        }
        \`\`\`        

        ###
        Return
        the return keyword is used to return a value from a function. It can also have an expression.
        Example:
        \`\`\`
        ფუნქცია მთავარი() {
          დააბრუნე ჭეშმარიტი
        }
        \`\`\`
        or
        \`\`\`
        ფუნქცია მთავარი() {
          დააბრუნე 1 + 1
        }
        \`\`\`

        ###
        Arrays
        when creating an array you use ახალი keyword. Followed by open and close brackets; inside the brackets you can put any value you want to indicate the size. Finally it has default value.
        Example:
        \`\`\`
        ფუნქცია მთავარი() {
          მასივი = ახალი[5] 0
          მასივი[0] = 1
          დააბრუნე მასივი
        }
        \`\`\`
        We can create multidimensional arrays by nesting arrays.
        Example:
        \`\`\`
        ფუნქცია მთავარი() {
          მასივი = ახალი[2][2] 0
          მასივი[0][0] = 1
          მასივი[0][1] = 2
          მასივი[1][0] = 3
          მასივი[1][1] = 4
          დააბრუნე მასივი
        }
        \`\`\`

        ###
        If statements
        თუ, თუარა, and თუარადა are used for conditional execution. Expressions doesn't need to be surrounded by parentheses. The body of each branch must be surrounded by curly braces.
        Example:
        \`\`\`
        ფუნქცია მთავარი() {
          ციფრი = 5
          თუ ციფრი > 0 {
            მაჩვენე ციფრი
          } თუარადა ციფრი < 0 {
            მაჩვენე "ციფრი ნაკლებია ნულზე"
          } თუარა {
            მაჩვენე "ციფრი არის ნული"
          }
        }
        \`\`\`

        ###
        While statements
        სანამ is used for while looping.
        Example:
        \`\`\`
        ფუნქცია მთავარი() {
          ციფრი = 5
          სანამ ციფრი > 0 {
            მაჩვენე ციფრი
            ციფრი = ციფრი - 1
          } 
        }
        \`\`\`

        ###
        Shell Commands
        ბრძანება or $ is used for executing shell commands.
        Example:
        \`\`\`
        ფუნქცია მთავარი() {
          ბრძანება "echo გამარჯობა, მსოფლიო!"
        }
        \`\`\`
        or
        \`\`\`
        ფუნქცია მთავარი() {
          $ "echo გამარჯობა, მსოფლიო!"
        }
        \`\`\`

        ###
        Print
        მაჩვენე or @ is used for printing.
        Example:
        \`\`\`
        ფუნქცია მთავარი() {
          მაჩვენე "გამარჯობა, მსოფლიო!"
        }
        \`\`\`
        or
        \`\`\`
        ფუნქცია მთავარი() {
          @ "გამარჯობა, მსოფლიო!"
        }
        \`\`\`

        ###
        Comments
        single-line comments start with # and continue until the end of the line. Multi-line comments start with #{ and end with #}.
        Example:
        \`\`\`
        ფუნქცია მთავარი() {
          მაჩვენე "გამარჯობა, მსოფლიო!" # This is a comment.
          #{
            This is a multi-line comment.
            This is a comment.
          #}
        }
        \`\`\`

        Language rules:
        - Identifiers: can contain letters ა-ჰ, digits 0-9, underscores, and must start with a letter or underscore. Case-sensitive. e.g., ცვლადი, ცვლადი_2, _ცვლადი.
        - Booleans: Represent true or false with ჭეშმარიტი and მცდარი.
        - Numerals: Digits 0-9 represent base 10. Use 0val for other bases, where val ranges from 0-9, a-z. e.g., 123 (decimal), 00 1 (binary), 01 10 (base 2), 0f 14 (base 16).
        - Exponent Notation: Represented by a base, followed by e or E, then an exponent. e.g., 1e2 = 1 * 10^2, 1E-2 = 1 * 10^-2.
        - Operators: Arithmetic (+, -, *, /, %, ^), comparison (<, <=, >, >=, ==, !=), logical (&&, და, ||, ან, !). Precedence from low to high: logical, comparison, !, +, -, *, /, %, unary -, ^.
        - Falsy Values: Include მცდარი, 0, and nil. All others are truthy.
        - Assignments: Addition, subtraction, multiplication, division, and modulus assignments aren't allowed. Use ა = ა + 1, ა = ა - 1, ა = ა * 1, ა = ა / 1, ა = ა % 1 instead.
        - Increment/Decrement: Not allowed. Use ა = ა + 1, ა = ა - 1 instead.
        - Structured Programming: All code must be inside functions, with მთავარი as the entry point function without parameters.
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
