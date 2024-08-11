import React from "react";

import { useForm } from "react-hook-form";
import { useState } from "react";
import checked from "../assets/checked.png";
// import aling from "../assets/aling.png";

const MainForm = ({ onSubmitHandler,filLocLength }) => {
    const [visible, setVisible] = useState(true);
    const [isEmergency, setIsEmergency] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isSubmitting, isSubmitSuccessful, isSubmitted },
    } = useForm();

    function tochange() {
        setTimeout(() => {
            setVisible(false);
        }, 4000);
        setVisible(true);
    }
    const handleEmergency = () => {
        setIsEmergency(!isEmergency);
    };

    return (
        <div className="">
            <form
                action=""
                className="flex flex-col px-2 "
                onSubmit={handleSubmit(onSubmitHandler)}
            >
                <label htmlFor="name">
                    <span className="text-lg font-semibold">
                        Select an option
                    </span>
                    <div className="flex gap-5">
                        <label>
                            <input
                                type="radio"
                                value="normal"
                                onClick={()=>setIsEmergency(false)}
                                {...register("status", { required: true })}
                            />
                            Normal
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="emergency"
                                onClick={handleEmergency}
                                checked={isEmergency}
                                {...register("status", { required: true })}
                            />
                        </label>
                        Emergency
                    </div>
                </label>
                {/* if emergency fi */}

                <label htmlFor="msg">
                    <span className="text-lg font-semibold">
                        Enter Your Insurance Providers:
                    </span>
                    <textarea
                        className="border-[1px] py-3 px-5 rounded-md border-gray-400 my-2 placeholder:font-bold placeholder:tracking-wide placeholder:text-gray-500"
                        name="msg"
                        id="msg"
                        cols="50"
                        rows="5"
                        disabled={isEmergency}
                        placeholder="Insurance Providers"
                        {...register("ins", {
                            required: {
                                value: !isEmergency,
                                message: "This field is required",
                            },
                            minLength: {
                                value: 2,
                                message:
                                    "Your message must be longer than two characters",
                            },
                        })}
                    ></textarea>
                </label>
                {errors.ins && (
                    <span className="text-red-600 flex gap-2 items-center">
                        {/* <img src={aling} alt="" className="size-4" /> */}
                        {errors.ins.message}
                    </span>
                )}
                {isEmergency && (
                    <span className="text-gray-600 flex gap-2 items-center">
                        {/* <img src={aling} alt="" className="size-4" /> */}
                        Symptoms are not required for emergency
                    </span>
                )}
                <label htmlFor="msg">
                    <span className="text-lg font-semibold">
                        Enter Your Symptoms:
                    </span>
                    <textarea
                        className="border-[1px] py-3 px-5 rounded-md border-gray-400 my-2 placeholder:font-bold placeholder:tracking-wide placeholder:text-gray-500"
                        name="msg"
                        id="msg"
                        cols="50"
                        rows="8"
                        disabled={isEmergency}
                        placeholder="Symptoms"
                        {...register("sym", {
                            required: {
                                value: !isEmergency,
                                message: "This field is required",
                            },
                            minLength: {
                                value: 2,
                                message:
                                    "Your message must be longer than two characters",
                            },
                        })}
                    ></textarea>
                </label>
                {errors.sym && (
                    <span className="text-red-600 flex gap-2 items-center">
                        {/* <img src={aling} alt="" className="size-4" /> */}
                        {errors.sym.message}
                    </span>
                )}
                {isEmergency && (
                    <span className="text-gray-600 flex gap-2 items-center">
                        {/* <img src={aling} alt="" className="size-4" /> */}
                        Symptoms are not required for emergency
                    </span>
                )}
                <input
                    type="submit"
                    value="Find Hospitals"
                    disabled={isSubmitting}
                    className="font-bold text-white bg-black py-3 px-10 rounded-lg text-lg my-5 cursor-pointer"
                    onClick={tochange}
                />
                {isSubmitSuccessful && visible && (
                    <span className=" flex gap-2 items-center text-green-600">
                        <img src={checked} alt="" className="size-[16px]" />
                        Fetched {filLocLength} Hospitals.
                    </span>
                )}
            </form>
        </div>
    );
};

export default MainForm;
