import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { trpc } from "../utils/trpc";

/**
 *
 * component renders the login UI and features
 * @returns JSX element
 */
function LoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<{
    hasError: boolean,
    message?: string,
  }>({
    hasError: false,
  });
  const login = trpc.useMutation("auth.login")

  const submitHandler = async (e: any) => {
    e.preventDefault();
    const r = await login.mutateAsync({
      username: e.target.username.value,
      password: e.target.password.value,
    })

    if (r.success) {
      navigate("/forum");
    } else {
      setError({
        hasError: true,
        message: r.error,
      });
    }

  }

  return (
    <div className="h-screen">
      <Header unauthenticated />
      <div className="grid place-items-center pt-28">
        <form
        onSubmit={submitHandler}
          id="login-container"
          className="card w-96 bg-base-100 shadow-xl p-10 bg-gradient-to-b from-[#2F2FF7] text-white"
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
          {error.hasError ? <p className="text-sm text-red-400">{error.message === "Unverified account" ? (<span>Unverified account, verify <a className="underline underline-offset-2" href="/verify">here</a></span>) : error.message}</p> : ""}

          <label className="label ">
            <span className="label-text text-white">
              Enter Username or Email
            </span>
          </label>
          <input
            type="text"
            placeholder="Username"
            id="username"
            className="input input-bordered w-full max-w-xs focus:border-white"
            required
          />
          <label className="label pt-10 ">
            <span className="label-text text-white ">Enter Password</span>
          </label>
          <input
            type="password"
            placeholder="Password"
            id="password"
            className="input input-bordered w-full max-w-xs focus:border-white"
            required
          />
          <div className="card-actions justify-center pt-10">
            <button
              className="btn btn-success px-10 hover:bg-[#C2E1EB] text-[#000062]"
              type="submit"
            >
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
