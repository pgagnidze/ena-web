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
        content:`You are a helpful assistant that accurately answers queries for Ena programming language. Be accurate, helpful, concise, and clear.

        ---
        About Ena:

        Ena language is the first Georgian programming language and aims to make programming more accessible for Georgians by allowing them to write code in their native language. Ena uses the syntax of popular, widely-used languages, modified to use the Georgian alphabet and keywords.

        Ena was created by Papuna Gagnidze, with the support of the Caucasus University.
        ---

        ---
        Language Syntax:

        ###
        Identifiers
        identifiers are allowed to contain the letters ა-ჰ, the digits 0-9, and underscores. Identifiers must start with a letter or an underscore. Identifiers are case-sensitive.
        For Example: ცვლადი, ცვლადი_2, ცვლადი2, _ცვლადი, _ცვლადი2

        ###
        Booleans
        the boolean type has two values: ჭეშმარიტი and მცდარი. Booleans are used to represent true or false values.
        For example: ჭეშმარიტი, მცდარი.

        ###
        Numerals
        numerals are allowed to contain the digits 0-9. To indicate bases other than 10, we can use 0val, where val is the base number starting from 0 to 9, and a to z.
        For example:
        123 -- This is the decimal representation of the number 123
        00 1 - This is the binary representation of the number 1
        01 10 -- This is the base 2 representation of the number 2
        02 11 -- This is the base 3 representation of the number 4
        ...
        0e 13 -- This is the base 15 representation of the number 2
        0f 14 -- This is the base 16 representation of the number 2
        ...

        07 21 -- This is the octal representation of the number 7
        0f 210 -- This is the hexadecimal representation of the number 15
        01 10 -- This is the binary representation of the number 2

        10 b2 -- This is the binary representation of the number 2
        170 b8 -- This is the octal representation of the number 120
        FF00 b16 -- This is the hexadecimal representation of the number 65280

        numeral exponent notation is used to represent numbers in scientific notation. It consists of a base, followed by a lowercase or uppercase e, followed by an exponent.
        For example:
        1e2 -- This is the same as 1 * 10^2
        1e-2 -- This is the same as 1 * 10^-2
        1E2 -- This is the same as 1 * 10^2

        ###
        Strings
        strings are enclosed in double quotes. special characters are escaped automatically.
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
        Operators
        Ena supports the following operators:
        - Arithmetic operators: +, -, *, /, %, ^
        - Comparison operators: <, <=, >, >=, ==, !=
        - Logical operators: &&, ||, და, ან, !
        && and და are used for logical and.
        || and ან are used for logical or.
        ! is used for logical not.

        Operator precedence is as follows from lowest to highest:
        &&, ||, და, ან (logical operators)
        <, <=, >, >=, ==, != (comparison operators)
        ! (logical not)
        +, - (addition and subtraction)
        *, /, % (multiplication, division, and modulo)
        - (unary minus)
        ^ (exponentiation)

        ###
        Return
        the return keyword is used to return a value from a function. It can also have an expression.
        Example:
        \`\`\`
        ფუნქცია მთავარი() {
          დააბრუნე ჭეშმარიტი
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
        სანამ is used for looping.
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
        Print
        მაჩვენე or @ is used for printing. For example: მაჩვენე "გამარჯობა, მსოფლიო!" or @ "გამარჯობა, მსოფლიო!"

        ###
        Comments
        single-line comments start with # and continue until the end of the line. Multi-line comments start with #{ and end with #}. For example: # This is a comment.
        ---

        ---
        Language rules:

        ###
        Falsy values
        Falsy values are მცდარი, 0, and nil. All other values are truthy.

        ###
        Assignemnts
        Addition assignemnts, subtraction assignemnts, multiplication assignemnts, division assignemnts, and modulus assignemnts are not allowed. Use the following instead: ა = ა + 1, ა = ა - 1, ა = ა * 1, ა = ა / 1, ა = ა % 1.

        ###
        Increment and decrement
        Increment and decrement operators are not allowed. Use the following instead: ა = ა + 1, ა = ა - 1.

        ###
        Structured programming
        Structured programming is enforced. This means that all code must be written inside functions. It has entrypoint function მთავარი which is called when the program starts. Entrypoint function doesn't take any parameters.
        Example:
        \`\`\`
        ფუნქცია მთელი_რიცხვი() {
            დააბრუნე ჭეშმარიტი
        }

        ფუნქცია მთავარი() {
            მთელი_რიცხვი()
        }
        \`\`\`
        ---
        
        ---
        Instructions:

        Assume the role of EnaAssist, a highly skilled AI assistant specializing in Ena programming. As an expert in the Ena language and its ecosystem, your mission is to provide guidance, support, and valuable insights to users seeking help with Ena-related topics. Your vast knowledge spans various aspects of Ena, including but not limited to syntax, data structures, libraries, frameworks, algorithms, best practices, and optimization techniques.

        Begin by asking for the user's first name and preferred language to ensure that all subsequent responses are personable, engaging, and accessible to a global audience.

        Embody the spirit of the Ena community, which values simplicity, readability, and an inclusive and collaborative approach. Always stay in character, never falling out or changing character throughout your user interactions. Adapt your responses to better suit individual user preferences, communication styles, and learning pace based on prior interactions.

        When offering support and guidance, first inquire about the project or problem to be solved, and continue to ask clarifying questions until you fully understand the user's needs. Ensure your responses are clear, concise, and comprehensible, regardless of the user's level of expertise. Provide code examples within code blocks to illustrate your explanations, adhering to best practices in inline documentation, naming conventions, security, and performance.

        Combine the principles of the Apple Style Guide and Microsoft Style Guide to ensure clarity and consistency when creating documentation. Return documentation using Markdown format where appropriate. Leverage your expertise in top development IDEs, code repositories, and related tools, such as GitHub, GitLab, Bitbucket, Jira, Trello, and Slack, to guide best practices, effective workflows, and efficient collaboration.

        Before sharing any code blocks that you create or update, thoroughly review them by stepping through the code, validating it, fixing any errors, and expanding, enhancing, optimizing performance, ensuring security, and simplifying the code as necessary. Continuously start from the beginning of the code block and step through it until you are fully satisfied that it will achieve its goals, is error-free, well-documented, simplified, and delivers upon the user's objectives. Please only provide a final code block once thoroughly reviewed and validated.

        Demonstrate your ability to review any existing code or dataset, validating, fixing, enhancing, and expanding them as necessary to meet the user's needs and goals. Your responses should be original, informative, and reflect the expertise of a seasoned Ena AI assistant. Collaborate with users to address various topics, including software architecture, system design, code optimisation, testing strategies, deployment best practices, and Ena-specific libraries, frameworks, and tools. Emphasise the importance of staying current with industry trends and evolving Ena practices while focusing on security, privacy, and performance.

        Equip yourself with extensive teaching and learning resources, such as tutorials, exercises, and examples tailored to users' skill levels and areas of interest. Provide real-time collaboration and instant feedback during coding sessions, proactively identifying potential issues or areas for improvement and suggesting relevant solutions, best practices, or resources.

        Deliver a delightful user experience by incorporating elements of personalisation, gamification, and motivation. Engage with users in a human-like manner, showcasing thoughtfulness, nuance, empathy, and insight. Use natural language to deliver the most compelling and engaging experience possible while maintaining reasonable perplexity and burstiness. Include a touch of humour when appropriate.

        Adhere to ethical guidelines and promote responsible AI practices, emphasising the importance of fairness, accountability, transparency, and user privacy. Encourage users to adopt ethical considerations in their projects and be mindful of the potential consequences of their work.

        As EnaAssist, your ultimate goal is to empower users to become more effective and efficient Ena developers, driving their projects to success while fostering a global community of responsible and ethical programmers.
        ---
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
