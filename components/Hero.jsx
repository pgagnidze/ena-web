import { Fragment, useState } from "react";
import clsx from "clsx";
import { Highlight } from "prism-react-renderer";
import { Button } from "@/components/Button";
import { PlayIcon, DocumentTextIcon } from "@heroicons/react/20/solid";
import { Container } from "@/components/ContainerForFeatures";
import { Footer } from "@/components/Footer";

const codeLanguage = "ena";
const code = `# რეკურსიული ფუნქცია ფაქტორიალის გამოსათვლელად
ფუნქცია ფაქტორიალი(ნ = 6) {
    თუ ნ != 0 {
        დააბრუნე ნ * ფაქტორიალი(ნ - 1)
    } თუარა {
        დააბრუნე 1
    }
}

# მთავარი ფუნქცია
ფუნქცია მთავარი() {
    ცვლადი შედეგი = ფაქტორიალი()
    დაბეჭდე("ფაქტორიალი: ", შედეგი)
    დააბრუნე შედეგი
}
`;

const codeLong = `# გრძელი ფორმით დაწერილი რეკურსიული ფუნქცია
ფუნქცია სახელად ფაქტორიალი(ციფრი = 6) {
    თუ პირობა სრულდება ციფრი != 0 {
        დააბრუნე მნიშვნელობა ციფრი * ფაქტორიალი(ციფრი - 1)
    } სხვა შემთხვევაში {
        დააბრუნე მნიშვნელობა 1
    }
}

# პროგრამის შესასრულებელი ფუნქცია
ფუნქცია სახელად მთავარი() {
    ცვლადი შედეგი = ფაქტორიალი()
    დაბეჭდე("ფაქტორიალი: ", შედეგი)
    დააბრუნე მნიშვნელობა შედეგი
}
`;

function TrafficLightsIcon(props) {
  return (
    <svg aria-hidden="true" viewBox="0 0 42 10" fill="none" {...props}>
      <circle fill="#bf616a" cx="5" cy="5" r="4.5" />
      <circle fill="#ebcb8b" cx="21" cy="5" r="4.5" />
      <circle fill="#a3be8c" cx="37" cy="5" r="4.5" />
    </svg>
  );
}

const enaGrammar = {
  'comment': [
    {
      pattern: /#\{[\s\S]*?\#\}/,
      greedy: true
    },
    {
      pattern: /#.*/,
      greedy: true
    }
  ],
  'string': {
    pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: true
  },
  'keyword': /\b(?:თუ პირობა სრულდება|თუ|სხვა შემთხვევაში შეამოწმე თუ|თუარადა|სხვა შემთხვევაში|თუარა|სანამ პირობა სრულდება გაიმეორე|სანამ|ახალი|ფუნქცია სახელად|ფუნქცია|ლოკალური ცვლადი|ლოკალური|ცვლადი|დააბრუნე მნიშვნელობა|დააბრუნე|მაჩვენე მნიშვნელობა ეკრანზე|მაჩვენე|დაბეჭდე|გაუშვი ბრძანება|ბრძანება|if|elseif|else|while|new|function|local|return)\b/,
  'boolean': /\b(?:true|false|ჭეშმარიტი მნიშვნელობა|ჭეშმარიტი|მცდარი მნიშვნელობა|მცდარი)\b/,
  'number': /\b\d+(?:\.\d+)?\b/,
  'function': /\b[a-zA-Zა-ჰ_][a-zA-Z0-9ა-ჰ_]*(?=\s*\()/,
  'operator': /[+\-*/%=<>!&|@]/,
  'punctuation': /[{}[\](),.:;]/
};

export function Hero() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { name: "example.ena", code: code },
    { name: "example.long.ena", code: codeLong },
  ];

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <Container>
      <div className="overflow-hidden py-8 sm:px-2 lg:relative lg:px-0 lg:py-12">
        <div className="py-12 min-h-[600px] flex flex-col justify-center">
          <div className="mx-auto px-6 lg:px-10 xl:px-14 w-full">
            <div className="relative max-w-5xl mx-auto">
              <div className="relative">
                <div className="relative rounded-2xl bg-nord0 ring-1 ring-white/10 backdrop-blur shadow-2xl">
                  <div className="absolute -top-px left-20 right-11 h-px bg-gradient-to-r from-gray-400/0 via-gray-400/70 to-gray-400/0" />
                  <div className="absolute -bottom-px left-11 right-20 h-px bg-gradient-to-r from-gray-400/0 via-gray-400 to-gray-400/0" />
                  <div className="pl-4 pt-4 pr-4 pb-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <TrafficLightsIcon className="h-2.5 w-auto stroke-gray-300/30" />
                      </div>
                      <div className="flex gap-2">
                        <Button
                          href="/code"
                          variant="play"
                          className="rounded-md p-2 flex items-center justify-center"
                          title="გაუშვი კოდი"
                        >
                          <PlayIcon
                            className="h-5 w-5 text-nord14-100"
                            aria-hidden="true"
                          />
                        </Button>
                        <Button
                          href="https://doc.ena-lang.org"
                          target="_blank"
                          variant="play"
                          className="rounded-md p-2 flex items-center justify-center mr-5"
                          title="დაიწყე სწავლა"
                        >
                          <DocumentTextIcon
                            className="h-5 w-5 text-nord14-100"
                            aria-hidden="true"
                          />
                        </Button>
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-2 text-xs">
                      {tabs.map((tab, index) => (
                        <div
                          key={index}
                          className={clsx(
                            "flex h-6 rounded-md cursor-pointer",
                            activeTab === index
                              ? "bg-gradient-to-r from-gray-400/30 via-gray-400 to-gray-400/30 p-px font-medium text-gray-300"
                              : "text-gray-500"
                          )}
                          onClick={() => handleTabClick(index)}
                        >
                          <div
                            className={clsx(
                              "flex items-center rounded-md px-2.5",
                              activeTab === index && "bg-gray-800"
                            )}
                          >
                            {tab.name}
                          </div>
                        </div>
                      ))}
                    </div>
                    {tabs.map((tab, index) => (
                      <div
                        key={index}
                        className={clsx(
                          "mt-6 flex items-start px-1 text-sm",
                          activeTab === index ? "" : "hidden"
                        )}
                      >
                        <div
                          aria-hidden="true"
                          className="select-none border-r border-gray-300/10 pr-4 font-mono text-gray-400"
                        >
                          {Array.from({
                            length: tab.code.split("\n").length,
                          }).map((_, index) => (
                            <Fragment key={index}>
                              {(index + 1).toString().padStart(2, "0")}
                              <br />
                            </Fragment>
                          ))}
                        </div>
                        <Highlight
                          code={tab.code}
                          language={codeLanguage}
                          Prism={{ languages: { ena: enaGrammar } }}
                          theme={{
                            plain: {
                              color: "#D8DEE9",
                              backgroundColor: "#2E3440",
                            },
                            styles: [
                              {
                                types: ["comment"],
                                style: {
                                  color: "#4C566A",
                                  fontStyle: "italic",
                                },
                              },
                              {
                                types: ["punctuation"],
                                style: {
                                  color: "#D8DEE9",
                                },
                              },
                              {
                                types: ["constant", "number"],
                                style: {
                                  color: "#BF616A",
                                },
                              },
                              {
                                types: ["string"],
                                style: {
                                  color: "#A3BE8C",
                                },
                              },
                              {
                                types: ["keyword", "operator"],
                                style: {
                                  color: "#81A1C1",
                                },
                              },
                              {
                                types: ["variable"],
                                style: {
                                  color: "#EBCB8B",
                                },
                              },
                              {
                                types: ["function"],
                                style: {
                                  color: "#88C0D0",
                                },
                              },
                              {
                                types: ["class-name"],
                                style: {
                                  color: "#8FBCBB",
                                },
                              },
                            ],
                          }}
                        >
                          {({
                            className,
                            style,
                            tokens,
                            getLineProps,
                            getTokenProps,
                          }) => (
                            <pre
                              className={clsx(
                                className,
                                "flex overflow-x-auto pb-6 bg-gray-900"
                              )}
                              style={style}
                            >
                              <code className="px-4">
                                {tokens.map((line, lineIndex) => (
                                  <div
                                    key={lineIndex}
                                    {...getLineProps({ line })}
                                  >
                                    {line.map((token, tokenIndex) => (
                                      <span
                                        key={tokenIndex}
                                        {...getTokenProps({ token })}
                                      />
                                    ))}
                                  </div>
                                ))}
                              </code>
                            </pre>
                          )}
                        </Highlight>
                      </div>
                    ))}
                  </div>
                  {/* Statusline Footer */}
                  <div className="border-t border-gray-700/50 px-4 py-3 bg-nord0/50">
                    <Footer />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
