"use client"
import Image from "next/image";
import { useState } from "react";

export default function ReadImage() {
  const [inputSize, setInputSize] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [showImage, setShowImage] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleCodeCorrection = async () => {
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("size", inputSize);

      console.log("formData :: ", formData.get("file"));

      const response = await fetch("/api/readimage", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setShowImage(data.message);
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error correcting code:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div>
        <div className="max-w-md w-full">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Read Image
            </h2>
          </div>
          {showImage && (
            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-900">
                Image Response:
              </h3>
              <div className="mt-2 overflow-auto bg-gray-100 p-4 rounded-md text-black">
                <img
                  src={showImage}
                  alt="Image"
                  height={512}
                  width={512}
                />
              </div>
            </div>
          )}
          <form
            className="mt-8 space-y-6"
            onSubmit={(e) => e.preventDefault()}
            encType="multipart/form-data"
          >
            <div className="flex text-center justify-between gap-4">
              <div className="flex-1">
                <input
                  id="file"
                  name="file"
                  type="file"
                  accept=".png"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm text-black px-5 py-3 outline-none border border-solid border-black rounded-md p-4"
                  onChange={handleFileChange}
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
            <div className="flex-1">
              <label htmlFor="size">Select your size:</label>
              <select
                id="size"
                name="size"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm text-black px-5 py-3 outline-none border border-solid border-black rounded-md"
                value={inputSize}
                onChange={(e) => setInputSize(e.target.value)}
              >
                <option value="1024">1024</option>
                <option value="512">512</option>
                <option value="256">256</option>
              </select>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
