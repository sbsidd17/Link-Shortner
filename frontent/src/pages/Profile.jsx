import React from "react";

function Profile() {
  const userJSON = localStorage.getItem("user");
  const user = JSON.parse(userJSON);
  return (
    <div className="flex justify-center items-center m-20">
        <div className="flex flex-col rounded-lg bg-slate-500 border-slate-900 border-2 w-[300px]">
            <div className="flex justify-around items-center p-3">
                <img src={user.avatar} alt="profile_pic" 
                className="rounded-full"
                />
                <p className="text-2xl text-white">{`${user.firstName} ${user.lastName}`}</p>
            </div>
            <div className="p-5 text-lg text-white text-center">
                {user.email}
            </div>

        </div>
    </div>
  )
}

export default Profile;
