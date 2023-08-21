import React from "react";
import { backendUrl } from "../config/config";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
// import LinkCard from "../components/LinkCard";
import { FcLink, FcBinoculars, FcBusinessman, FcCurrencyExchange } from "react-icons/fc";
import Loading from "../components/Loading/Loading";
import { useEffect } from "react";
import DashboardCard from "../components/DashboardCard";

function AdminDashboard() {
  const [loading, setLoading] = useState(false);
  const [totalUsers, setTotalUsers] = useState(0);
  const [allUsers, setallUsers] = useState([]);
  const [totalLinks, setTotalLinks] = useState(0);
  const [totalViews, setTotalViews] = useState(0);

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");
    async function fetchData() {
      setLoading(true);
      try {
        const getUsers = await axios.post(
          `${backendUrl}/admin/all-users`,
          { jwtToken },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setallUsers(getUsers.data.allUsers)
        setTotalUsers(getUsers.data.totalUsers);

        const getAllLinks = await axios.post(
          `${backendUrl}/admin/all-links`,
          { jwtToken },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setTotalLinks(getAllLinks.data.totalLinks);
        const tv = getAllLinks.data.allLinks.reduce(
          (sum, link) => sum + link.totalClicks,
          0
        );
        setTotalViews(tv);
      } catch (error) {
        toast.error(error.response.data.msg);
        console.log(error.message);
      }
      setLoading(false);
      toast.success("Welcome To Admin Dashbord");
    }

    fetchData();
  }, []);

  console.log(allUsers)
  return (
    <>
      {loading === true && <Loading />}
      <div className="flex gap-10 flex-wrap text-white p-10">
        <DashboardCard
          title={"Total User"}
          value={totalUsers}
          icon={<FcBusinessman size={64} />}
        />
        <DashboardCard
          title={"Total Links"}
          value={totalLinks}
          icon={<FcLink size={64} />}
        />
        <DashboardCard
          title={"Total Views"}
          value={totalViews}
          icon={<FcBinoculars size={64} />}
        />
        <DashboardCard
          title={"Total Earning"}
          value={`${totalViews/1000} $`}
          icon={<FcCurrencyExchange size={64} />}
        />
      </div>
    </>
  );
}

export default AdminDashboard;
