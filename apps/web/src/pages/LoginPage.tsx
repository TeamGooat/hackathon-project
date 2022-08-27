import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";

/**
 * component renders the login UI and features
 * @returns JSX element
 */
function LoginPage() {
    const navigate = useNavigate();
    return (
        <div className="grid place-items-center h-screen">
            <div
                id="login-container"
                className="card w-96 bg-base-100 shadow-xl p-10 bg-gradient-to-b from-[#0000FF]  via-[#2F2FF7] text-white"
            >
                <h3 id="login-header" className="label text-2xl pb-4 font-bold">
                    Log In
                    <FontAwesomeIcon
                        className="hover:text-[#000062] cursor-pointer"
                        onClick={() => {
                            navigate("/");
                        }}
                        icon={faXmark}
                    />
                </h3>

                <label className="label ">
                    <span className="label-text text-white">Enter Username or Email</span>
                </label>
                <input
                    type="text"
                    placeholder="Username or Email"
                    className="input input-bordered w-full max-w-xs focus:border-white"
                />
                <label className="label pt-10 ">
                    <span className="label-text text-white ">Enter Password</span>
                </label>
                <input
                    type="password"
                    placeholder="Password"
                    className="input input-bordered w-full max-w-xs focus:border-white"
                />
                <div className="card-actions justify-center pt-10">
                    <button className="btn btn-primary px-10 hover:bg-[#C2E1EB] hover:text-[#000062] text-white">
                        Log In
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
