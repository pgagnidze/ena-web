import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { defineTheme } from "./defineTheme";

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

const classnames = (...args) => {
  return args.join(" ");
};

const CodeEditorWindow = ({ onChange, language, code, theme }) => {
  const [value, setValue] = useState(code || "");

  const handleEditorChange = (value) => {
    setValue(value);
    onChange("code", value);
  };

  return (
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
      <Editor
        height="85vh"
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
  const getOutput = () => {
    let status = outputDetails?.status;

    if (status === "error") {
      return (
        <pre className="px-2 py-1 font-normal text-xs text-red-500">
          {outputDetails?.error}
        </pre>
      );
    } else if (status === "ok") {
      return (
        <pre className="px-2 py-1 font-normal text-xs text-green-500">
          {outputDetails.body.result !== null
            ? JSON.stringify(outputDetails.body.result)
            : null}
        </pre>
      );
    }
  };
  return (
    <>
      <h1 className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 mb-2">
        შედეგი
      </h1>
      <div className="w-full h-56 bg-gray-700 rounded-md text-white font-normal text-sm overflow-y-auto">
        {outputDetails ? <>{getOutput()}</> : null}
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

    if (response.status === "ok") {
      setOutputDetails(response);
      showSuccessToast(`წარმატებით გაეშვა!`);
      setProcessing(false);
      return;
    }
  };

  useEffect(() => {
    defineTheme("oceanic-next").then((_) =>
      setTheme({ value: "oceanic-next", label: "Oceanic Next" })
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

        <p className="pt-12 text-center bg-gradient-to-r from-gray-400 via-gray-500 to-gray-400 bg-clip-text font-display text-3xl tracking-tight text-transparent px-10">
          გაუშვი პროგრამა
        </p>

        <div className="h-4 w-full py-5"></div>

        <div className="flex flex-row space-x-4 items-start px-4 py-4">
          <div className="flex flex-col w-full h-full justify-start items-end">
            <CodeEditorWindow
              code={code}
              onChange={onChange}
              language={"lua"}
              theme={theme.value}
            />
          </div>

          <div className="right-container flex flex-shrink-0 w-[30%] flex-col">
            <OutputWindow outputDetails={outputDetails} />
            <div className="flex flex-col items-end">
              <button
                onClick={handleCompile}
                disabled={!code}
                className={classnames(
                  "rounded-full bg-slate-600 py-2 px-4 text-sm font-medium text-white hover:bg-slate-500 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 active:text-slate-300 mt-4",
                  !code ? "opacity-50" : ""
                )}
              >
                {processing ? "მუშავდება..." : "გაუშვი"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
