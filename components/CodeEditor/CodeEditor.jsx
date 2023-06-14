import React, { useEffect, useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { defineTheme } from "./defineTheme";
import { PlayIcon, TrashIcon } from "@heroicons/react/20/solid";
import { ClockLoader } from "react-spinners";
import { Container } from "@/components/Container";

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

const EditorActions = ({ processing, handleCompile, handleDelete }) => {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-gray-300" />
      </div>
      <div className="relative flex justify-center">
        <span className="isolate inline-flex -space-x-px rounded-md shadow-sm">
          <button
            onClick={handleCompile}
            type="button"
            className="relative inline-flex items-center rounded-l-md bg-white px-3 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
          >
            <span className="sr-only">Run</span>
            {processing ? (
              <ClockLoader color="#6B7280" size={20} />
            ) : (
              <PlayIcon className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
          <button
            onClick={handleDelete}
            type="button"
            className="relative inline-flex items-center rounded-r-md bg-white px-3 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
          >
            <span className="sr-only">Delete</span>
            <TrashIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </span>
      </div>
    </div>
  );
};

const CodeEditorWindow = ({ onChange, language, code, theme }) => {
  const [value, setValue] = useState(code || "");

  useEffect(() => {
    setValue(code);
  }, [code]);

  const handleEditorChange = (value) => {
    setValue(value);
    onChange("code", value);
  };

  return (
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
      <Editor
        height="65vh"
        width={`100=%`}
        language={language || "javascript"}
        value={value}
        theme={theme}
        defaultValue="// some comment"
        onChange={handleEditorChange}
      />
    </div>
  );
};

const OutputWindow = ({ outputDetails }) => {
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
        <pre className="px-2 py-1 font-normal text-sm text-nord11">
          {outputDetails.error}
        </pre>
      );
    } else if (status === "success") {
      let outputValues = Object.values(outputDetails.body.output);
      return (
        <>
          <pre className="px-2 py-1 font-normal text-sm text-nord14-100">
            {outputDetails.body.result !== null
              ? "შედეგი:\n" + JSON.stringify(outputDetails.body.result)
              : "შედეგი:"}
          </pre>
          <pre className="px-2 py-1 font-normal text-sm text-nord14-100">
            {outputValues.length > 0
              ? "დაბეჭდილი:\n" + outputValues.join("")
              : "დაბეჭდილი:"}
          </pre>
        </>
      );
    }
  };

  return (
    <>
      <div className="w-full h-65vh bg-nord0 rounded-md text-white font-normal text-sm overflow-y-auto">
        {getOutput()}
      </div>
    </>
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
    const compileResponse = await fetch("https://ena-api.fly.dev/compile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: code }),
    });

    if (compileResponse.status !== 200) {
      throw new Error("Error: " + (await res.text()));
    }

    const response = await compileResponse.json();

    if (response.status === "error") {
      setOutputDetails(response);
      showErrorToast(response.error);
      setProcessing(false);
      return;
    }

    if (response.status === "success") {
      setOutputDetails(response);
      showSuccessToast(`წარმატებით გაეშვა!`);
      setProcessing(false);
      return;
    }
  };

  useEffect(() => {
    defineTheme("nord").then((_) =>
      setTheme({ value: "nord", label: "Nord" })
    );
  }, []);

  const showSuccessToast = (msg) => {
    toast.success(msg || `წარმატებით გაეშვა!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const showErrorToast = (msg, timer) => {
    toast.error(msg || `რაღაც შეცდომაა! ახლიდან სცადე.`, {
      position: "top-right",
      autoClose: timer ? timer : 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <>
    <Container>
      <div className="overflow-hidden min-h-screen">
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        <div className="h-4 w-full py-5"></div>

        <EditorActions
          processing={processing}
          handleCompile={handleCompile}
          handleDelete={handleDelete}
        />

        <div className="flex flex-col md:flex-row space-x items-start px-4 py-4">
          <div className="flex flex-col w-full md:w-2/3 h-64 md:h-auto justify-start items-end">
            <CodeEditorWindow
              code={code}
              onChange={onChange}
              language={"lua"}
              theme={theme.value}
            />
          </div>

          <div className="right-container flex flex-shrink-0 w-full md:w-1/3 flex-col mt-4 md:mt-0 md:pl-4">
            <OutputWindow outputDetails={outputDetails} />
          </div>
        </div>
      </div>
      </Container>
    </>
  );
};
