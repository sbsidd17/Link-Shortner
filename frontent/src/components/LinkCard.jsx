/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useState } from "react";
import { AiOutlineCopy} from "react-icons/ai";
import CopyToClipboard from "react-copy-to-clipboard";
import moment from "moment-timezone";
import { backendUrl } from "../config/config";
import {FcBinoculars} from "react-icons/fc"

function LinkCard({ linkData }) {
  const [copied, setCopied] = useState(false);
  const link = linkData.link;
  const shortLink = `${backendUrl}/${link.shortId}`;
  const createdAt = link.createdAt;
  const indianTime = moment(createdAt).tz("Asia/Kolkata");
  const formattedCreatedAt = indianTime.format("MMMM D, YYYY HH:mm:ss");

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000); // Reset copied status after 2 seconds
  };

  return (
    <div className="w-full bg-[#27293d] flex flex-col md:flex-row p-3 justify-between items-center rounded-md text-white">
      <div className="flex flex-col p-3 gap-5 flex-1">
        <div className="text-xl">{link.shortId}</div>
        <div className="text-sm">Created At : {formattedCreatedAt}</div>
        <div>
          Original Link :{" "}
          <a href={link.redirectUrl} target="_blank" rel="noopener noreferrer">
            Click Here
          </a>
        </div>
        <div className="bg-[#464962] md:w-[75%] flex justify-between relative">
          <div className="flex justify-center items-center flex-1 p-3">
            <input
              disabled
              className="w-[100%] text-md h-full bg-[#464962] focus:outline-none"
              type="text"
              name="ShorLink"
              value={shortLink}
            />
          </div>
          <div className="h-[50px] border border-r-2 border-[#27293d]"></div>
          <div className="flex justify-center items-center">
            <div className="group flex h-full relative">
              <CopyToClipboard text={shortLink} onCopy={handleCopy}>
                <button className="button m-0 h-full bg-[#464962] text-white px-5 py-3 ">
                  <AiOutlineCopy />
                </button>
              </CopyToClipboard>
              <span
                className="group-hover:opacity-100 transition-opacity bg-gray-800 p-2 text-sm text-gray-100 rounded-md absolute left-1/2 
    -translate-x-1/2 translate-y-full opacity-0 m-8 mx-auto"
              >
                {copied === true ? <>Copied</> : <>Copy</>}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex"><FcBinoculars color="white" size={28} />  Views : {link.totalClicks}</div>
      </div>
    </div>
  );
}

export default LinkCard;
