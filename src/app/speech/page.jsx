"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [correctedCode, setCorrectedCode] = useState("");
  const [typedText, setTypedText] = useState("");

  const handleCodeCorrection = async () => {
    try {
      const response = await fetch("/api/texttospeech", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText }),
      });

      const data = await response.json();
      setCorrectedCode(data.message);
    } catch (error) {
      console.error("Error correcting code:", error);
    }
  };

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      setTypedText(correctedCode.substring(0, index));
      index++;
      if (index > correctedCode.length) {
        clearInterval(intervalId);
      }
    }, 50);

    return () => clearInterval(intervalId);
  }, [correctedCode]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div>
        <div className="max-w-md w-full">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Sky-GPT
            </h2>
          </div>
          {correctedCode && (
            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-900">Response:</h3>
              <div className="mt-2 overflow-auto bg-gray-100 p-4 rounded-md text-black">
                {typedText}
              </div>
            </div>
          )}
          <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="flex text-center justify-between gap-4">
              <div className="flex-1">
                <input
                  id="code"
                  name="code"
                  rows="5"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm text-black px-5 py-3 outline-none border border-solid border-black rounded-md p-4"
                  placeholder="Enter your Text here"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#ffffff00] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 border-solid border-black p-2"
                  onClick={handleCodeCorrection}
                >
                  <Image
                    src="/send-icon.png"
                    alt="Send Icon"
                    height={80}
                    width={80}
                    style={{
                      color: "transparent",
                      height: "30px",
                      aspectRatio: "1/1",
                      width: "30px",
                    }}
                  />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
