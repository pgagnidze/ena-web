import React, { useState, useEffect, useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";

const CustomTextArea = ({ query, setQuery, placeholder, language }) => {
  const [showCommands, setShowCommands] = useState(false);
  const [currentCommand, setCurrentCommand] = useState("");
  const [commandStartIndex, setCommandStartIndex] = useState(null);

  let commands = {
    en: [
      { name: "code [code]", desc: "Set the code for usage." },
      { name: "explain", desc: "Provide an explanation of the code." },
      {
        name: "complexity",
        desc: "Provide a time complexity analysis of this code.",
      },
      { name: "bug", desc: "Explain the bug in the code if there is one." },
      {
        name: "translate [target programming language]",
        desc: "Translate provided code into a target programming language.",
      },
      {
        name: "vocab",
        desc: "List a glossary of essential related terms with brief, concise definitions.",
      },
      {
        name: "quiz",
        desc: "Generate a concise question to test the student on their comprehension.",
      },
      { name: "ask [question]", desc: "Ask any question." },
      {
        name: "example",
        desc: "Populate the text area with an example.",
        text: `\
/code ფუნქცია ფაქტორიალი(ნ = 6) {
    თუ ნ != 0 {
        დააბრუნე ნ * ფაქტორიალი(ნ - 1)
    } თუარა {
        დააბრუნე 1
    }
}

ფუნქცია მთავარი() {
    დააბრუნე ფაქტორიალი()
}`,
      },
    ],
    ge: [
      { name: "კოდი [კოდი]", desc: "დააყენეთ კოდი შემდეგი გამოყენებისთვის." },
      { name: "განმარტება", desc: "განმარტეთ კოდი." },
      { name: "კომპლექსურობა", desc: "შეამოწმეთ კოდის დროის კომპლექსურობა." },
      { name: "შეცდომა", desc: "ახსენით კოდში შეცდომა, თუ ის არსებობს." },
      {
        name: "თარგმნა [სხვა პროგრამული ენა]",
        desc: "თარგმნეთ მოცემული კოდი სხვა პროგრამირების ენაში.",
      },
      { name: "ლექსიკონი", desc: "მაჩვენე სიტყვათა ლექსიკონი." },
      { name: "ტესტი", desc: "მოკლე ტესტი ცოდნის შემოწმებისთვის." },
      { name: "კითხვა [შეკითხვა]", desc: "დასვით ნებისმიერი შეკითხვა." },
      {
        name: "მაგალითი",
        desc: "შეავსეთ ტექსტის არე მაგალითით.",
        text: `\
/კოდი ფუნქცია ფაქტორიალი(ნ = 6) {
    თუ ნ != 0 {
        დააბრუნე ნ * ფაქტორიალი(ნ - 1)
    } თუარა {
        დააბრუნე 1
    }
}

ფუნქცია მთავარი() {
    დააბრუნე ფაქტორიალი()
}`,
      },
    ],
  };

  commands = commands[language];

  const commandListRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        commandListRef.current &&
        !commandListRef.current.contains(event.target)
      ) {
        setShowCommands(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    // Check if the last character is '/' to start the command mode
    if (value.charAt(value.length - 1) === "/") {
      setShowCommands(true);
      setCurrentCommand("");
      setCommandStartIndex(value.length - 1);
    } else if (showCommands) {
      // Update the current command when user types or deletes
      const command = value.slice(commandStartIndex + 1);
      if (command.includes(" ")) {
        // If there is a space, end the command mode
        setShowCommands(false);
        setCurrentCommand("");
      } else {
        setCurrentCommand(command);
      }
    }
  };

  const handleCommandClick = (command) => {
    // For 'example', populate the text area with the example text
    if (command.name === "example" || command.name === "მაგალითი") {
      setQuery(command.text);
    } else {
      setQuery((prevQuery) => {
        // Replace the slash and any typed characters after it with the selected command
        return (
          prevQuery.slice(0, commandStartIndex) +
          "/" + // Add / character here
          command.name +
          " " +
          prevQuery.slice(commandStartIndex + currentCommand.length + 1)
        );
      });
    }

    setShowCommands(false);
  };

  const filteredCommands = commands.filter((command) =>
    command.name.includes(currentCommand)
  );

  return (
    <div className="relative w-full">
      <TextareaAutosize
        minRows={1}
        style={{ resize: "none" }}
        className="h-auto w-full rounded-md border border-zinc-600 pr-12 pl-6 focus:border-zinc-800 focus:outline-none focus:ring-1 focus:ring-zinc-800 sm:h-auto sm:py-2 sm:pr-16 sm:pl-8 sm:text-lg"
        value={query}
        placeholder={placeholder}
        onChange={handleInputChange}
      />
      {showCommands && (
        <div
          ref={commandListRef}
          className="absolute w-full mt-1 rounded-md border border-gray-200 bg-white z-10 shadow-lg overflow-auto max-h-48"
        >
          {filteredCommands.map((command) => (
            <div
              key={command.name}
              onClick={() => handleCommandClick(command)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              <p className="font-semibold">{command.name}</p>
              <p className="text-sm text-gray-500">{command.desc}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomTextArea;
