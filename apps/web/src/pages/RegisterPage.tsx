import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { trpc } from "../utils/trpc";

/**
 * component renders the login UI and features
 * @returns JSX element
 */
function RegisterPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<{
    hasError: boolean,
    message?: string,
  }>({
    hasError: false,
  });
  const register = trpc.useMutation("auth.register")

  const submitHandler = async (e: any) => {
    e.preventDefault();

    if (e.target.password.value !== e.target.rePassword.value) {
      setError({
        hasError: true,
        message: "Passwords do not match",
      });
    } else {
      const r = await register.mutateAsync({
        email: e.target.email.value,
        username: e.target.username.value,
        password: e.target.password.value,
        first_name: e.target.firstName.value,
        last_name: e.target.lastName.value,
      })

      if (r.success) {
        navigate("/verify");
      } else {
        setError({
          hasError: true,
          message: r.error,
        });
      }
    }
  }

  return (
    <div className='h-full'>
      <Header unauthenticated />
      <div className='grid place-items-center pb-5'>
        <form
          onSubmit={submitHandler}
          id='login-container'
          className='card w-96 bg-base-100 shadow-xl p-6 bg-gradient-to-b from-accent  via-[#2F2FF7] text-white'
        >
          <h3 id='login-header' className='label text-2xl pb-4 font-bold'>
            Register
            <FontAwesomeIcon
              className='hover:text-[#000062] cursor-pointer'
              onClick={() => {
                navigate("/");
              }}
              icon={faXmark}
            />
          </h3>

          {error.hasError ? <p className="text-sm text-red-800">{error.message}</p> : ""}
          <label className='label '>
            <span className='label-text text-white'>Enter First Name</span>
          </label>
          <input
            type='text'
            placeholder='First Name'
            id="firstName"
            required
            className='input input-bordered w-full max-w-xs focus:border-white'
          />

          <label className='label '>
            <span className='label-text text-white'>Enter Last Name</span>
          </label>
          <input
            type='text'
            placeholder='Last Name'
            id="lastName"
            required
            className='input input-bordered w-full max-w-xs focus:border-white'
          />

          <label className='label '>
            <span className='label-text text-white'>Enter Username</span>
          </label>
          <input
            type='text'
            placeholder='Username'
            id="username"
            required
            className='input input-bordered w-full max-w-xs focus:border-white'
          />
          <label className='label pt-6 '>
            <span className='label-text text-white '>Enter Email</span>
          </label>
          <input
            type='email'
            placeholder='Email'
            id="email"
            required
            className='input input-bordered w-full max-w-xs focus:border-white'
          />
          <label className='label pt-6 '>
            <span className='label-text text-white '>Enter Password</span>
          </label>
          <input
            type='password'
            placeholder='Password'
            id="password"
            required
            className='input input-bordered w-full max-w-xs focus:border-white'
          />
          <label className='label pt-6 '>
            <span className='label-text text-white '>Re-Enter Password</span>
          </label>
          <input
            type='password'
            placeholder='Re-Enter Password'
            id="rePassword"
            required
            className='input input-bordered w-full max-w-xs focus:border-white'
          />
          <div className='card-actions justify-center pt-10'>
            <button type="submit" className='btn bg-pinky px-10 hover:bg-accent hover:text-[#000062] text-white'>
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
