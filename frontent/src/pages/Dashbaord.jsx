import React from "react";
import { backendUrl } from "../config/config";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import LinkCard from "../components/LinkCard";
import { FcLink, FcBinoculars, FcCurrencyExchange } from "react-icons/fc";
import Loading from "../components/Loading/Loading";
import { useEffect } from "react";

function Dashbaord() {
  const [data, setData] = useState([]);
  const [totalViews, setTotalViews] = useState(0);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");
    async function fetchData() {
      setLoading(true)
      try {
        const response = await axios.post(
          `${backendUrl}/user/dashboard`,
          { jwtToken },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        toast.success(response.data.msg);
        setData(response.data.data);
        const tv = response.data.data.reduce(
          (sum, link) => sum + link.totalClicks,0
        );
        setTotalViews(tv);
      } catch (error) {
        toast.error(error.response.data.msg);
        console.log(error.message);
      }
      setLoading(false)
    }

    fetchData();
  }, []);

  return (
    <>
    {
      loading === true ? <Loading /> : ""
    }
    <div className="flex flex-col flex-wrap">
      <div className="flex gap-10 text-white p-10">
        <div className="flex flex-col justify-center items-center bg-[#27293d] p-10 rounded-xl">
          <div className="flex justify-between items-center gap-10 ">
            <div className="flex flex-col gap-5">
              <p className="font-bold">Total Links</p>
              <p className="font-bold">{data?.length}</p>
            </div>
            <div>
              <FcLink size={64} />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center bg-[#27293d] p-10 rounded-xl">
          <div className="flex justify-between items-center gap-10 ">
            <div className="flex flex-col gap-5">
              <p className="font-bold">Total Views</p>
              <p className="font-bold">{totalViews}</p>
            </div>
            <div>
              <FcBinoculars size={64} />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center bg-[#27293d] p-10 rounded-xl">
          <div className="flex justify-between items-center gap-10 ">
            <div className="flex flex-col gap-5">
              <p className="font-bold">Total Earning</p>
              <p className="font-bold">{(totalViews / 1000).toFixed(4)} $</p>
            </div>
            <div>
              <FcCurrencyExchange size={64} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col-reverse p-10 text-white gap-5">
        {data?.map((link, index) => {
          return <LinkCard key={index} link={link} />;
        })}
      </div>
    </div>
    </>
  );
}

export default Dashbaord;
