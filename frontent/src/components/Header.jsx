import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from "axios";
import toast from 'react-hot-toast';
import { backendUrl } from '../config/config';

function Header({isLoggedIn, }) {
  const navigate = useNavigate()
  async function logoutHandler(){
    const response = await axios.get(`${backendUrl}/user/logout`); 
    localStorage.removeItem("jwtToken")
    toast.success(response.data.msg);
    navigate("/")
    window.location.reload()
  }
  return (
    <div className='w-[100%] flex justify-between items-center p-4 bg-blue-700'>
        <div className="flex justify-start items-center text-4xl text-white">
            SdLinks
        </div>
        <div className="flex text-white gap-10">
        <NavLink className={({isActive})=> isActive ? "active" : "px-[10px] py-[5px] rounded-[10px]"} to={"/"}>Home</NavLink>
            <NavLink className={({isActive})=> isActive ? "active" : "px-[10px] py-[5px] rounded-[10px]"} to={"/about"}>About</NavLink>
            <NavLink className={({isActive})=> isActive ? "active" : "px-[10px] py-[5px] rounded-[10px]"} to={"/contact"}>Contact</NavLink>
            {isLoggedIn === true ? "" : <NavLink className={({isActive})=> isActive ? "active" : "px-[10px] py-[5px] rounded-[10px]"} to={"/login"}>Login</NavLink>}
            {isLoggedIn === true ? "" : <NavLink className={({isActive})=> isActive ? "active" : "px-[10px] py-[5px] rounded-[10px]"} to={"/signup"}>Signup</NavLink>}
            {!isLoggedIn === true ? "" : <NavLink className={({isActive})=> isActive ? "active" : "px-[10px] py-[5px] rounded-[10px]"} to={"/dashboard"}>Dashboard</NavLink>}
            {isLoggedIn === true ? <button onClick={logoutHandler}>Logout</button> : ""}
        </div>

    </div>
  )
}

export default Header