import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { trpc } from "../utils/trpc";
import Spinner from "../components/Spinner";

/**
 *
 * component renders the login UI and features
 * @returns JSX element
 */
function OtpPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{
    hasError: boolean,
    message?: string,
  }>({
    hasError: false,
  });
  const verify = trpc.useMutation("auth.verify")

  const submitHandler = async (e: any) => {
    e.preventDefault();
    setLoading(true)

    const r = await verify.mutateAsync({
      otp: e.target.otp.value,
    })

    setLoading(false)
    if (r.success) {
      navigate("/login");
    } else {
      setError({
        hasError: true,
        message: "Invalid OTP",
      });
    }
  }

  if (loading) {
    return (
      <div className='h-screen flex flex-col'>
        <Header unauthenticated />
        <Spinner />
      </div>
    );
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
            Verify Account
          </h3>
          {error.hasError ? <p className="text-sm text-red-400">{error.message}</p> : ""}

          <label className="label pt-10 ">
            <span className="label-text text-white ">Enter OTP</span>
          </label>
          <input
            type="text"
            placeholder="One-time password"
            id="otp"
            maxLength={6}
            className="input input-bordered w-full max-w-xs focus:border-white"
            required
          />
          <div className="card-actions justify-center pt-10">
            <button
              className="btn btn-success px-10 hover:bg-[#C2E1EB] text-[#000062]"
              type="submit"
            >
              Verify
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OtpPage;
