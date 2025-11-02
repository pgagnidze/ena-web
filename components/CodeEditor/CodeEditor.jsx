import React, { useEffect, useState, useRef } from "react";
import Editor, { loader } from "@monaco-editor/react";
import { defineTheme } from "./defineTheme";
import { enaLanguageConfig, enaLanguageTokens } from "./enaLanguage";
import { PlayIcon, TrashIcon, DocumentTextIcon } from "@heroicons/react/20/solid";
import { ClockLoader } from "react-spinners";
import { Container } from "@/components/Container";
import { Footer } from "@/components/Footer";

const javascriptDefault = `ფუნქცია ფაქტორიალი(ნ = 6) {
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

function TrafficLightsIcon(props) {
  return (
    <svg aria-hidden="true" viewBox="0 0 42 10" fill="none" {...props}>
      <circle fill="#bf616a" cx="5" cy="5" r="4.5" />
      <circle fill="#ebcb8b" cx="21" cy="5" r="4.5" />
      <circle fill="#a3be8c" cx="37" cy="5" r="4.5" />
    </svg>
  );
}

const CodeEditorWindow = ({ onChange, language, code, theme, processing, handleCompile, outputDetails }) => {
  const [value, setValue] = useState(code || "");

  useEffect(() => {
    setValue(code);
  }, [code]);


  const handleEditorChange = (value) => {
    setValue(value);
    onChange("code", value);
  };

  const handleEditorDidMount = (editor, monaco) => {
    monaco.languages.register({ id: "ena" });
    monaco.languages.setMonarchTokensProvider("ena", enaLanguageTokens);
    monaco.languages.setLanguageConfiguration("ena", enaLanguageConfig);
  };

  const defaultOutputDetails = {
    status: "success",
    body: {
      result: null,
      output: {},
    },
  };

  outputDetails = outputDetails || defaultOutputDetails;

  const getOutput = () => {
    let status = outputDetails.status;

    if (status === "error") {
      return (
        <pre className="px-4 py-3 font-mono text-sm text-nord11">
          {outputDetails.error}
        </pre>
      );
    } else if (status === "success") {
      let outputValues = Object.values(outputDetails.body.output);
      const hasOutput = outputValues.length > 0;
      const hasResult = outputDetails.body.result !== null;

      return (
        <pre className="px-4 py-3 font-mono text-sm text-nord14-100 whitespace-pre-wrap">
          {hasOutput && outputValues.join("")}
          {hasResult && (hasOutput ? "\n" : "") + JSON.stringify(outputDetails.body.result)}
        </pre>
      );
    }
  };

  return (
    <div className="relative rounded-2xl bg-nord0 ring-1 ring-white/10 backdrop-blur">
      <div className="absolute -top-px left-20 right-11 h-px bg-gradient-to-r from-gray-400/0 via-gray-400/70 to-gray-400/0" />
      <div className="absolute -bottom-px left-11 right-20 h-px bg-gradient-to-r from-gray-400/0 via-gray-400 to-gray-400/0" />

      <div className="pl-4 pt-4 pr-4 pb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center h-6">
            <TrafficLightsIcon className="h-2.5 w-auto stroke-gray-300/30" />
          </div>
          <div className="flex h-6 rounded-md bg-gradient-to-r from-gray-400/30 via-gray-400 to-gray-400/30 p-px font-medium text-gray-300">
            <div className="flex items-center rounded-md px-4 bg-gray-800">
              <span className="text-xs">ქართული პროგრამირების ენა</span>
            </div>
          </div>
          <div className="flex gap-2 mr-5 h-6">
            <button
              onClick={handleCompile}
              disabled={processing}
              className="rounded-md p-2 flex items-center justify-center bg-transparent hover:bg-white/5 transition-colors"
              title="გაუშვი კოდი"
            >
              {processing ? (
                <ClockLoader color="#88C0D0" size={20} />
              ) : (
                <PlayIcon className="h-5 w-5 text-nord14-100" aria-hidden="true" />
              )}
            </button>
            <a
              href="https://doc.ena-lang.org"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md p-2 flex items-center justify-center bg-transparent hover:bg-white/5 transition-colors"
              title="დაიწყე სწავლა"
            >
              <DocumentTextIcon className="h-5 w-5 text-nord14-100" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="mt-6">
          <Editor
            height="48vh"
            width="100%"
            language={language || "ena"}
            value={value}
            theme={theme}
            onChange={handleEditorChange}
            onMount={handleEditorDidMount}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: "on",
              scrollBeyondLastLine: false,
              automaticLayout: true,
              padding: { top: 12, bottom: 12 },
              renderLineHighlight: "none",
              overviewRulerLanes: 0,
              hideCursorInOverviewRuler: true,
              overviewRulerBorder: false,
              scrollbar: {
                vertical: "visible",
                horizontal: "visible",
                useShadows: false,
                verticalScrollbarSize: 10,
                horizontalScrollbarSize: 10,
              },
            }}
          />
        </div>

        <div className="border-t border-gray-700/50 mt-6">
          <div className="px-4 py-2 border-b border-gray-700/30">
            <span className="text-xs text-gray-400 font-mono uppercase">შედეგი</span>
          </div>
          <div className="min-h-[80px] max-h-[120px] overflow-y-auto text-white">
            {getOutput()}
          </div>
        </div>

        <div className="border-t border-gray-700/50 pt-3 mt-6">
          <Footer />
        </div>
      </div>
    </div>
  );
};


const useKeyPress = function (targetKey) {
  const [keyPressed, setKeyPressed] = useState(false);

  function downHandler({ key }) {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  }

  const upHandler = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("keydown", downHandler);
    document.addEventListener("keyup", upHandler);

    return () => {
      document.removeEventListener("keydown", downHandler);
      document.removeEventListener("keyup", upHandler);
    };
  });

  return keyPressed;
};

export const CodeEditor = () => {
  const [code, setCode] = useState(javascriptDefault);
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [theme, setTheme] = useState("cobalt");

  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");

  useEffect(() => {
    if (enterPress && ctrlPress) {
      handleCompile();
    }
  }, [ctrlPress, enterPress]);
  const onChange = (action, data) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };

  const handleDelete = () => {
    setCode("");
  };

  const handleCompile = async () => {
    setProcessing(true);
    try {
      const compileResponse = await fetch("https://ena-api.fly.dev/compile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: code }),
      });

      if (compileResponse.status !== 200) {
        const errorText = await compileResponse.text();
        setOutputDetails({
          status: "error",
          error: `სერვერის შეცდომა: ${errorText}`,
        });
        setProcessing(false);
        return;
      }

      const response = await compileResponse.json();

      if (response.status === "error") {
        setOutputDetails(response);
        setProcessing(false);
        return;
      }

      if (response.status === "success") {
        setOutputDetails(response);
        setProcessing(false);
        return;
      }
    } catch (error) {
      setOutputDetails({
        status: "error",
        error: `კავშირის შეცდომა: ${error.message}`,
      });
      setProcessing(false);
    }
  };

  useEffect(() => {
    defineTheme("nord").then((_) =>
      setTheme({ value: "nord", label: "Nord" })
    );
  }, []);

  return (
    <>
      <Container>
        <div className="overflow-hidden py-4 sm:px-2 lg:px-0">
          <div className="mx-auto px-4 lg:px-6 w-full">
            <div className="relative max-w-[1600px] mx-auto">
              <CodeEditorWindow
                code={code}
                onChange={onChange}
                language={"ena"}
                theme={theme.value}
                processing={processing}
                handleCompile={handleCompile}
                outputDetails={outputDetails}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};
