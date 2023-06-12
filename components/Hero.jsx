import { Fragment, useState } from "react";
import clsx from "clsx";
import { Highlight, defaultProps } from "prism-react-renderer";
import { Button } from "@/components/Button";

const codeLanguage = "javascript";
const code = `ფუნქცია ფაქტორიალი(ნ = 6) {
    თუ ნ != 0 {
        დააბრუნე ნ * ფაქტორიალი(ნ - 1)
    } თუარა {
        დააბრუნე 1
    }
}

ფუნქცია მთავარი() {
    დააბრუნე ფაქტორიალი()
}
`;

const codeLong = `ფუნქცია სახელად ფაქტორიალი(ციფრი = 6) {
    თუ პირობა სრულდება ციფრი != 0 {
        დააბრუნე მნიშვნელობა ციფრი * ფაქტორიალი(ციფრი - 1)
    } სხვა შემთხვევაში {
        დააბრუნე მნიშვნელობა 1
    }
}

ფუნქცია სახელად მთავარი() {
    დააბრუნე მნიშვნელობა ფაქტორიალი()
}
`;

function TrafficLightsIcon(props) {
  return (
    <svg aria-hidden="true" viewBox="0 0 42 10" fill="none" {...props}>
      <circle cx="5" cy="5" r="4.5" />
      <circle cx="21" cy="5" r="4.5" />
      <circle cx="37" cy="5" r="4.5" />
    </svg>
  );
}

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
    <div className="overflow-hidden min-h-screen">
      <div className="py-16 sm:px-2 lg:relative lg:px-0 lg:py-20">
        <div className="mx-auto grid grid-cols-1 items-center gap-x-10 gap-y-20 px-6 lg:grid-cols-2 lg:px-10 xl:gap-x-20 xl:px-14">
          <div className="relative z-10 md:text-center lg:text-left">
            <div className="relative">
              <p className="inline bg-gradient-to-r from-gray-400 via-gray-500 to-gray-400 bg-clip-text font-display text-5xl tracking-tight text-transparent">
                პირველი ქართული პროგრამირების ენა
              </p>
              <p className="mt-3 text-2xl tracking-tight text-gray-500">
                ენა მიზნად ისახავს, ქართველებისთვის ხელმისაწვდომი გახადოს
                პროგრამირება, რაც გულისხმობს მშობლიურ ენაზე კოდის წერას.
              </p>
              <div className="mt-8 flex gap-4 md:justify-center lg:justify-start">
                <Button href="/enabot">დაიწყე სწავლა</Button>
                <Button href="/code" variant="modern">გამოსცადე აქვე</Button>
                <Button
                  href="https://github.com/pgagnidze/ena"
                  target="_blank"
                  variant="secondary"
                >
                  მაჩვენე GitHub-ზე
                </Button>
              </div>
            </div>
          </div>
          <div className="relative lg:static xl:pl-10">
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-gray-900/70 via-gray-900/70 to-gray-900/70 opacity-10 blur-lg" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-gray-900/70 via-gray-900/70 to-gray-900/70 opacity-10" />
              <div className="relative rounded-2xl bg-gray-700 ring-1 ring-white/10 backdrop-blur">
                <div className="absolute -top-px left-20 right-11 h-px bg-gradient-to-r from-gray-400/0 via-gray-400/70 to-gray-400/0" />
                <div className="absolute -bottom-px left-11 right-20 h-px bg-gradient-to-r from-gray-400/0 via-gray-400 to-gray-400/0" />
                <div className="pl-4 pt-4">
                  <TrafficLightsIcon className="h-2.5 w-auto stroke-gray-300/30" />
                  <div className="mt-4 flex space-x-2 text-xs">
                    {tabs.map((tab, index) => (
                      <div
                        key={index}
                        className={clsx(
                          "flex h-6 rounded-full cursor-pointer",
                          activeTab === index
                            ? "bg-gradient-to-r from-gray-400/30 via-gray-400 to-gray-400/30 p-px font-medium text-gray-300"
                            : "text-gray-500"
                        )}
                        onClick={() => handleTabClick(index)}
                      >
                        <div
                          className={clsx(
                            "flex items-center rounded-full px-2.5",
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
                        {...defaultProps}
                        code={tab.code}
                        language={codeLanguage}
                        theme={{
                          plain: {
                            color: "#D8DEE9",
                            backgroundColor: "#374151",
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
