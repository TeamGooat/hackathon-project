import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";
import Header from "../components/Header";


const test_user = {
  id: 1,
  first_name: "Bob",
  last_name: "Ross",
  username: "bobross",
  email: "bobross@gmail.com",
  password: "password",
  verified: false,
  anonymous: false
}

/**
 *
 * component renders the login UI and features
 * @returns JSX element
 */
function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(true);

  function login() {
    if (username !== test_user.username || password !== test_user.password) {
      setIsValid(false);
    } else {
      navigate("/forum")
    }
  }

  return (
    <div className="h-screen">
      <Header unauthenticated />
      <div className="grid place-items-center pt-28">
        <div
          id="login-container"
          className={`card w-96 bg-base-100 shadow-xl p-10 bg-gradient-to-b from-[#2F2FF7] text-white ${isValid ? "from-[#2F2FF7]" : "from-pinky"}`}
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
          {!isValid ? <p className="text-redy font-semibold">Oops! Your login details are incorrect.</p> : ""}

          <label className="label ">
            <span className="label-text text-white">
              Enter Username
            </span>
          </label>
          <input
            type="text"
            placeholder="Username or Email"
            className="input input-bordered w-full max-w-xs focus:border-white"
            onChange={(e: any) => {
              setUsername(e.target.value);
            }}
          />
          <label className="label pt-10 ">
            <span className="label-text text-white ">Enter Password</span>
          </label>
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full max-w-xs focus:border-white"
            onChange={(e: any) => {
              setPassword(e.target.value);
            }}
          />
          <a className="hover:cursor-pointer text-right m-2 label-text" onClick={() => navigate("/reset-password")}>Forgotten Password?</a>
          <div className="card-actions justify-center pt-10">
            <button
              className={`btn px-10 ${isValid ? "hover:bg-[#C2E1EB] btn-success text-[#000062]" : "bg-pinky text-whitey"}`}
              onClick={() => {
                login();
              }}
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
