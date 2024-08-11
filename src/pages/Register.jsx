import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import eye from "../assets/eye.svg";
import crossed from "../assets/crossed.svg";
import blackchecked from "../assets/blackchecked.png";
import blackcrossed from "../assets/blackcrossed.png";
import { Link, Navigate } from "react-router-dom";
import { useContext } from "react";
import { userContext } from "../context/userContext";
const CreateAccount = () => {
    const imgRef = useRef();
    const [visible, setVisible] = useState(true);
    const [resMessage, setresMessage] = useState({});
    const {setLoginUser}=useContext(userContext);

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isSubmitting, isSubmitSuccessful, isSubmitted },
    } = useForm();
    const onSubmit = async (data) => {
        reset();
        console.log(data);
        let response = await fetch("http://localhost:3000/register", {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",

            body: JSON.stringify(data),
        });
        let content = await response.json();

        console.log(content);
        setresMessage(content);
        if (content.success) {
            // aling("Account created Successfully")
            setLoginUser(content.user)
            console.log(content.user);
        }
    
        // console.log(content.success);
        // console.log(resMessage.msg); //gives undefined bcoz you are setting the state using the setter function above react is not that fast
    };
    function tochange() {
        setTimeout(() => {
            setVisible(false);
        }, 2000);
        setVisible(true);
    }
    const handleImg = (e) => {
        if (e.target.src.includes("eye")) {
            imgRef.current.src = crossed;
            e.target.previousSibling.type = "text";
        } else {
            imgRef.current.src = eye;
            e.target.previousSibling.type = "password";
        }
    };

    return (
        <>
                {resMessage.success ? (
                    <Navigate to={"/"}></Navigate>
                ) : (
                    <div className="p-5">
                        <div className="main max-w-[400px] mx-auto border-2 border-slate-300 rounded-md mt-20 p-5">
                            <div className="title flex justify-between items-center">
                                <div>
                                    <h1 className="font-bold text-4xl ">
                                        Create Account
                                    </h1>
                                </div>
                                <div className="bg-black size-8"></div>
                            </div>
                            <form action="" onSubmit={handleSubmit(onSubmit)}>
                                <div className="relative">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6 absolute top-[34px] left-2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                        />
                                    </svg>

                                    <input
                                        type="text"
                                        placeholder="User Name"
                                        {...register("username", {
                                            required: {
                                                value: true,
                                                message:
                                                    "This field is required",
                                            },
                                            minLength: {
                                                value: 3,
                                                message:
                                                    "The username must consist of at least 3 characters.",
                                            },
                                        })}
                                        className="border-[1px] py-3 px-10 rounded-md border-gray-400 my-2 placeholder:font-bold placeholder:tracking-wide placeholder:text-gray-500 w-full mt-5"
                                    />
                                    {errors.username && (
                                        <span className=" flex gap-2 items-center ml-1 text-sm ">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-6 h-6"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                                                />
                                            </svg>

                                            {errors.username.message}
                                        </span>
                                    )}
                                </div>
                                <div className="relative">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6 absolute top-[26px] left-2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                                        />
                                    </svg>

                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        {...register("mail", {
                                            required: {
                                                value: true,
                                                message:
                                                    "This field is required",
                                            },
                                            minLength: {
                                                value: 3,
                                                message:
                                                    "Email must consist of at least 3 characters.",
                                            },
                                            pattern: {
                                                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
                                                message:
                                                    "Please enter a valid email address.",
                                            },
                                        })}
                                        className="border-[1px] py-3 px-10 rounded-md border-gray-400 my-2 placeholder:font-bold placeholder:tracking-wide placeholder:text-gray-500 w-full mt-3 "
                                    />
                                    {errors.mail && (
                                        <span className=" flex gap-2 items-center ml-1 text-sm ">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-6 h-6"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                                                />
                                            </svg>

                                            {errors.mail.message}
                                        </span>
                                    )}
                                </div>
                                <div className="relative ">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6 absolute top-6 left-2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
                                        />
                                    </svg>

                                    <input
                                        type="password"
                                        placeholder="Password"
                                        {...register("password", {
                                            required: {
                                                value: true,
                                                message:
                                                    "This field is required",
                                            },
                                            minLength: {
                                                value: 8,
                                                message:
                                                    "Password must consist of at least 8 characters.",
                                            },
                                        })}
                                        className="border-[1px] py-3 px-10 rounded-md border-gray-400 my-2 placeholder:font-bold placeholder:tracking-wide placeholder:text-gray-500 w-full mt-2 "
                                    />
                                    <img
                                        src={eye}
                                        ref={imgRef}
                                        alt=""
                                        className="size-6 absolute right-2 bottom-[18px] cursor-pointer"
                                        onClick={handleImg}
                                    />
                                    <Link to={"/reset"}>
                                        <span className="text-slate-600 cursor-pointer  absolute -right-3 -bottom-4 ">
                                            Forgot Password?
                                        </span>
                                    </Link>
                                </div>

                                {errors.password && (
                                    <span className=" flex gap-2 items-center ml-1 text-sm mt-4">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-6 h-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                                            />
                                        </svg>
                                        {errors.password.message}
                                    </span>
                                )}
                                <input
                                    type="submit"
                                    value="Create Account"
                                    disabled={isSubmitting}
                                    className="font-bold text-white bg-black py-3 px-10 rounded-lg text-lg my-7 cursor-pointer w-full"
                                    onClick={tochange}
                                />
                                {isSubmitSuccessful && visible && (
                                    <div className=" flex gap-2 items-center ml-1 justify-center">
                                        <img
                                            src={
                                                resMessage.success
                                                    ? blackchecked
                                                    : blackcrossed
                                            }
                                            alt=""
                                            className="size-[16px]"
                                        />
                                        {resMessage.msg}
                                    </div>
                                )}
                            </form>
                            <div className="line border-b border-gray-400"></div>
                            <div className="my-2 text-center text-lg">
                                Have an account ?{" "}
                                <Link
                                    to={"/login"}
                                    className="text-black font-bold"
                                >
                                    Log in
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
        </>
    );
};

export default CreateAccount;
