import React from "react";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import CopyToClipboard from "react-copy-to-clipboard";
import { backendUrl } from "../config/config";
import Background from "./Background/Background";
import LoadingBtn from "./LoadingBtn";
import { AiOutlineCopy } from "react-icons/ai";
import { BiRefresh } from "react-icons/bi";
import GradientBtn from "./GradientBtn/GradientBtn";
import { Link } from "react-router-dom";

function Home({isLoggedIn}) {
  const [url, setUrl] = useState("");
  const [shortLink, setShortLink] = useState("");
  const [textToCopy, setTextToCopy] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000); // Reset copied status after 2 seconds
  };

  async function clickHandler() {
    const jwtToken = localStorage.getItem("jwtToken");
    setLoading(true);
    try {
      const response = await axios.post(
        `${backendUrl}/`,
        { url, jwtToken },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setShortLink(response.data.shortLink);
      toast.success(response.data.msg);
      setTextToCopy(response.data.shortLink);
    } catch (error) {
      console.error("Error shortening link:", error.message);
      toast.error(error.response.data.msg);
    }
    setLoading(false);
  }
  return (
    <div className="w-[100%] flex justify-center items-center flex-col gap-10 mt-20">
      <Background />
      <div className="text-white md:text-5xl text-2xl font-semibold">
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
            {!loading ? (
              <button
                className="button bg-blue-700 text-white m-0 px-5 py-3 rounded-r-xl hover:bg-blue-800 focus:ring-blue-500 focus:ring-offset-blue-200 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                onClick={clickHandler}
              >
                Short Link
              </button>
            ) : (
              <LoadingBtn />
            )}
          </div>
        </div>
      ) : (
        ""
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
            <div className="group flex h-full relative">
              <CopyToClipboard text={textToCopy} onCopy={handleCopy}>
                <button className="button m-0 h-full bg-blue-700 text-white px-5 py-3 hover:bg-blue-800 ">
                  <AiOutlineCopy />
                </button>
              </CopyToClipboard>
              <span
                className="group-hover:opacity-100 transition-opacity bg-gray-800 p-2 text-sm text-gray-100 rounded-md absolute left-1/2 
    -translate-x-1/2 translate-y-full opacity-0 m-8 mx-auto"
              >
                {
                  copied === true ? <>Copied</> : <>Copy</>
                }
              </span>
            </div>
            <div className="group flex h-full relative">
            <button onClick={()=>{setShortLink("")}} className="button m-0 h-full bg-blue-700 text-white px-5 py-3 rounded-r-xl hover:bg-blue-800 ">
              <BiRefresh />
            </button>
            <span className="group-hover:opacity-100 transition-opacity bg-gray-800 p-2 text-sm text-gray-100 rounded-md absolute left-1/2 
    -translate-x-1/2 translate-y-full opacity-0 m-8 mx-auto">ReShort</span>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      
      {isLoggedIn === false ? <div className="flex flex-col justify-center items-center gap-10">
        <div className="md:text-lg text-white px-3 text-center">Enhance Your Experience: Log in or sign up to effortlessly track views on your links and uncover valuable insights.</div>
        <div className="flex md:gap-10 gap-5">
        <Link to={"/login"}><GradientBtn name={"Login"}/></Link>
        <Link to={"/signup"}><GradientBtn name={"Signup"}/></Link>
      </div> 
      </div>
      :
      <div className="flex md:gap-10 gap-5">
        <Link to={"/dashboard"}><GradientBtn name={"Dashboard"}/></Link>
        <Link to={"/profile"}><GradientBtn name={"Profile"}/></Link>
      </div>}
      <div>
        
      </div>
    </div>
  );
}

export default Home;
