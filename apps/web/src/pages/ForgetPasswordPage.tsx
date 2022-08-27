import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

/**
 *
 * component renders the login UI and features
 * @returns JSX element
 */
function ForgetPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);

  return (
    <div className="h-screen">
      <Header unauthenticated />
      <div className="grid place-items-center pt-28">
        <div
          id="login-container"
          className="card w-96 bg-base-100 shadow-xl p-10 bg-gradient-to-b from-[#2F2FF7] text-white"
        >
          <h3 id="login-header" className="label text-2xl pb-4 font-bold">
            Reset Password
            <FontAwesomeIcon
              className="hover:text-[#000062] cursor-pointer"
              onClick={() => {
                navigate("/");
              }}
              icon={faXmark}
            />
          </h3>

          <label className="label ">
            <span className="label-text text-white">
              Enter Email
            </span>
          </label>
          <input
            type="text"
            placeholder="Email"
            className="input input-bordered w-full max-w-xs focus:border-white"
            onChange={(e: any) => {
              setEmail(e.target.value);
            }}
          />
          <div className="card-actions justify-center pt-10">
            <button
              className="btn btn-success px-10 hover:bg-[#C2E1EB] text-[#000062] text-white"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgetPasswordPage;
