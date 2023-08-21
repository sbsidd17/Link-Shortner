import React from "react";

function DashboardCard({ title, value, icon }) {
  return (
    <div className="flex flex-col justify-center items-center bg-[#27293d] p-10 rounded-xl">
      <div className="flex justify-between items-center gap-10 ">
        <div className="flex flex-col gap-5">
          <p className="font-bold">{title}</p>
          <p className="font-bold">{value}</p>
        </div>
        <div>{icon}</div>
      </div>
    </div>
  );
}

export default DashboardCard;
