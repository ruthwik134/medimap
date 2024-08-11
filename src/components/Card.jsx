import React from "react";

const Card = ({name,coverage,expiry}) => {
    
    return (
        <div>
            <div className="my-10 max-w-xs rounded-xl bg-gray-100 px-6 py-8 text-gray-800 min-h-[372px]">
                <p className="mb-2 text-2xl font-medium">{name} Insurance</p>
                <p className="mb-6">
                    {/* Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Suscipit earum vitae tempore. */}
                    {/* give me valid short description about life insurance*/}
                    {name} is a contract between an insurance policy
                    holder
                </p>
                <div className="mb-6 space-y-2">
                    <div className="flex space-x-2 font-medium">
                        <span className="text-blue-600">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="h-6 w-6"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </span>
                        <span>HealthCare</span>
                    </div>
                    <div className="flex space-x-2 font-medium">
                        <span className="text-blue-600">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="h-6 w-6"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </span>
                        <span>Assured Insurance</span>
                    </div>
                    <div className="flex space-x-2 font-medium">
                        <span className="text-blue-600">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="h-6 w-6"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </span>
                        <span>Up to {coverage} lakhs Coverage</span>
                    </div>
                </div>
                <button className="w-full rounded-xl bg-blue-600 px-4 py-3 text-xl font-medium text-white">
                    Expiry on {expiry}
                </button>
            </div>
        </div>
    );
};

export default Card;
