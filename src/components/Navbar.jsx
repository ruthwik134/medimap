import React from "react";
import menubar from "../assets/menu.png";
import { Link } from "react-router-dom";
import askgLogo from "../assets/askgLogo.png";
import cancel from "../assets/close.png";
import { useState } from "react";
import { useContext } from "react";
import { userContext } from "../context/userContext";
import Login from "../pages/Login";
import userpic from "../assets/user.png";
import logo from "../assets/logo.jpg";
const Navbar = () => {
    // const menuRef=useRef(null)
    const [active, setActive] = useState(false);
    const { LoginUser } = useContext(userContext);
    // const [isLoggedIn, setIsLoggedIn] = useState(false);  yet to be implemented

    const handleClick = () => {
        // if (menuRef.current.style.display==="flex") {
        //     menuRef.current.style.display="none"
        // }else{
        //     menuRef.current.style.display="flex"
        // }
        setActive(!active);
    };
    return (
        <>
            <nav className="flex justify-evenly pt-5 items-center  overflow-x-hidden mb-1 border border-gray bg-gray-100">
                <div className="logo flex items-center gap-2">
                    <Link to={"/"}>
                        <img
                            src={
                                "https://medimap.ca/wp-content/uploads/2021/07/medimap-logo.svg"
                            }
                            alt="medi-map"
                            className="w-[193px] h-[60px]"
                        />
                    </Link>
                </div>
                <div className="nav-items hidden lg:block">
                    <ul className="flex gap-10">
                        <li className="flex font-semibold text-[17px] gap-2">
                            <Link to={"/"}>Home</Link>
                            {/* <img src={down} alt="arrow" className="w-[25px]" /> */}
                        </li>
                        <li className="flex font-semibold text-[17px] gap-2">
                            <Link to={"/"}>Listing</Link>

                            {/* <img src={down} alt="arrow" className="w-[25px]" /> */}
                        </li>
                        <li className="flex font-semibold text-[17px] gap-2">
                            {/* <Link to={"/agent"}>Agents</Link> */}
                            {/* <img
                            src={down}
                            alt="arrow"
                            className="w-[25px]"
                        /> */}
                        </li>
                        <li className="flex font-semibold text-[17px] gap-2">
                            <Link to={"/"}>Agents</Link>
                        </li>
                        <li className="flex font-semibold text-[17px] gap-2">
                            <Link to={"/account"}>Account</Link>
                        </li>
                    </ul>
                </div>
                <div className=" search ">
                    <div className="partone hidden md:flex md:items-center">
                        {/* <img src={search} className="mr-3 w-[20px] h-[20px]" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="placeholder:text-gray placeholder:font-medium placeholder:text-lg placeholder:tracking-wide w-[30%]"
                        /> */}
                        {/* {!!LoginUser ? (<div>{LoginUser.name}</div>) : ( <button className=" py-2 mr-2 px-5 border-2 border-slate-400 rounded-md font-bold text-gray-900">
                            <Link to={"/createaccount"}>Sign In</Link>
                        </button>
                        <button className="bg-black py-2 px-5 text-white rounded-md font-bold">
                            <Link to={"/login"}>Log in</Link>
                        </button>) } */}
                        {!!LoginUser ? (
                            <Link to={"/account"}>
                                <div className="text-bold text-lg capitalize border-[1px] border-slate-300 rounded-md px-4 py-2 flex  gap-2 items-center">
                                    <img src="img/menu.png" alt="" />
                                    <img
                                        src={userpic}
                                        alt=""
                                        className="mr-5 size-8"
                                    />
                                    {LoginUser.username}
                                </div>
                            </Link>
                        ) : (
                            <div>
                                <button className=" py-2 mr-2 px-5 border-2 border-slate-400 rounded-md font-bold text-gray-900">
                                    <Link to={"/register"}>Sign In</Link>
                                </button>
                                <button className="bg-black py-2 px-5 text-white rounded-md font-bold">
                                    <Link to={"/login"}>Log in</Link>
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="menubar parttwo ">
                        <img
                            onClick={handleClick}
                            src={active && innerWidth < 640 ? cancel : menubar}
                            alt=""
                            className="md:hidden"
                            width={30}
                        />
                    </div>
                </div>
            </nav>
            <div
                className={
                    active
                        ? "flex " +
                          "justify-evenly my-3 mx-16 transition-all sm:hidden "
                        : "hidden " +
                          "justify-evenly my-3 mx-16 transition-all sm:hidden "
                }
            >
                <ul className="flex flex-col">
                    <li className="border-b-[1px] border-gray-600 bg-[#FFF7F0] w-[42vw] flex items-center justify-between p-1">
                        <Link to={"/"}>Home</Link>
                    </li>
                    <li className="border-b-[1px] border-gray-600 bg-[#FFF7F0] w-[42vw] p-1">
                        <Link to={"/listing"}>Listing</Link>
                    </li>
                    <li className="border-b-[1px] border-gray-600 bg-[#FFF7F0] w-[42vw] p-1">
                        <Link to={"/agent"}>Agents</Link>
                    </li>
                    <li className="border-b-[1px] border-gray-600 bg-[#FFF7F0] w-[42vw] p-1">
                        <Link to={"/propertydetails"}>Property</Link>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default Navbar;
