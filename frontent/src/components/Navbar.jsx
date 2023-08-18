import { Fragment } from "react";
import axios from "axios";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { FaBars, FaMarker } from "react-icons/fa";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { backendUrl } from "../config/config";
import { useState } from "react";
import { useEffect } from "react";
import logo from '../assets/images/logo.png';

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact Us", href: "/contact" },
    {
      name: isLoggedIn === true ? "LogOut" : "Login",
      href: isLoggedIn === true ? "/" : "/login",
    },
    {
      name: isLoggedIn === true ? "Dashboard" : "SignUp",
      href: isLoggedIn === true ? "/dashboard" : "/signup",
    },
  ];

  const [name, setName] = useState("UserName");
  const [avatar, setAvatar] = useState("https://icon-library.com/images/username-icon/username-icon-28.jpg");

  useEffect(() => {
    const userJSON = localStorage.getItem("user");
    if (userJSON) {
      const user = JSON.parse(userJSON);
      // console.log(user)
      setName(`${user.firstName} ${user.lastName}`);
      setAvatar(user.avatar);
    }
  }, []);

  async function signoutHandler() {
    const response = await axios.get(`${backendUrl}/user/logout`);
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("user");
    toast.success(response.data.msg);
    setIsLoggedIn(false);
    window.location.reload()
  }

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <FaMarker className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <FaBars className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="block h-[45px] w-auto lg:hidden"
                    src={logo}
                    alt="Your Company"
                  />
                  <img
                    className="hidden h-[45px] w-auto lg:block"
                    src={logo}
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                        aria-current={item.current ? "page" : undefined}
                        onClick={item.name === "LogOut" ? signoutHandler : ""}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div>
                  <h2 className="text-white hidden md:block">{name}</h2>
                </div>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={avatar}
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {isLoggedIn && (
                        <Menu.Item>
                          {({ active }) => (
                            <p
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              {name}
                            </p>
                          )}
                        </Menu.Item>
                      )}
                      {isLoggedIn && (
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/profile"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Your Profile
                            </Link>
                          )}
                        </Menu.Item>
                      )}
                      {isLoggedIn && (
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/dashboard"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Dashboard
                            </Link>
                          )}
                        </Menu.Item>
                      )}
                      {isLoggedIn && (
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/"
                              onClick={signoutHandler}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Sign out
                            </Link>
                          )}
                        </Menu.Item>
                      )}
                      {!isLoggedIn && (
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/login"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Login
                            </Link>
                          )}
                        </Menu.Item>
                      )}
                      {!isLoggedIn && (
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/signup"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              SignUp
                            </Link>
                          )}
                        </Menu.Item>
                      )}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
               <Link
                 to={item.href}
                 >
                <Disclosure.Button
                  key={item.name}
                  as="Link"
                  to={item.href}
                  onClick={item.name === "LogOut" ? signoutHandler : ""}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
                 </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
