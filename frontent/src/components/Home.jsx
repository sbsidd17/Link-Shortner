import React from "react";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import CopyToClipboard from "react-copy-to-clipboard";

function Home() {
  const [url, setUrl] = useState("");
  const [shortLink, setShortLink] = useState("");
  const [textToCopy, setTextToCopy] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000); // Reset copied status after 2 seconds
  };

  async function clickHandler() {
    try {
      const response = await axios.post("http://localhost:5453/", { url });
      setShortLink(response.data.shortLink);
      toast.success(response.data.msg);
      setTextToCopy(response.data.shortLink);
    } catch (error) {
      console.error("Error shortening link:", error);
      toast.error(error.response.data.msg);
    }
  }
  return (
    <div className="w-[100%] flex justify-center items-center flex-col gap-10">
      <div className="text-white md:text-5xl font-semibold">
      SHORTENING YOUR URL?
      </div>
      <div className="text-white md:text-2xl font-semibold">
      Sure, SdLinks will do that at a mouse click
      </div>
      {shortLink === "" ? (
        <div className="bg-white w-[75%] flex justify-between rounded-xl">
          <div className="flex justify-center items-center flex-1 p-3">
            <input
              className="w-[100%] focus:outline-none"
              type="text"
              name="url"
              onChange={(e) => setUrl(e.target.value)}
              value={url}
              placeholder="Enter URL to Short"
            />
          </div>
          <div className="flex justify-center items-center">
            <button
              className="button bg-blue-700 text-white px-5 py-3 rounded-r-xl"
              onClick={clickHandler}
            >
              Short Link
            </button>
          </div>
        </div>
      ) : (
        <div></div>
      )}
      {shortLink !== "" ? (
        <div className="bg-white w-[75%] flex justify-between rounded-xl relative">
          <div className="flex justify-center items-center flex-1 p-3">
            <input
              disabled
              className="w-[100%] focus:outline-none"
              type="text"
              name="ShorLink"
              value={shortLink}
            />
          </div>
          <div className="flex justify-center items-center">
            <CopyToClipboard text={textToCopy} onCopy={handleCopy}>
              <button className="button bg-blue-700 text-white px-5 py-3 rounded-r-xl">
                Copy to Clipboard
              </button>
            </CopyToClipboard>
          </div>

          {copied && (
            <span className="bg-black text-white p-2 rounded-lg fixed right-0">Copied!</span>
          )}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Home;
