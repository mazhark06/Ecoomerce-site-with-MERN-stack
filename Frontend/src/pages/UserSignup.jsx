import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import axios from "axios";
function UserSignup() {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPass, setConfirmPass] = useState("");
  const [error, seterror] = useState("");
  async function submitHandler(e) {
    e.preventDefault();
    if (ConfirmPass !== Password) return seterror("Password doesn't match");
    let response = await axios.post(
      "http://localhost:3000/user/signup",
      {
        username,
        password: Password,
        email,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let userdata = await response.data;
    console.log(userdata);
    if (userdata.statusCode === 200) {
      localStorage.setItem("accessToken", userdata.data.accessToken);
      navigate("/");
    } else {
      seterror(userdata.message);
      setUsername('')
      setEmail('')
    }
  }

  return (
    <div className="bg-gradient-to-b from-[#B188C5] to-[#5C416A] h-screen w-full max-sm:text-sm">
      <Logo />

      <div className="w-[30vw] max-sm:w-[90vw] max-sm:rounded-3xl rounded bg-white h-max mx-auto mt-6 ">
        {" "}
        {/* container */}
        <h2 className="text-center p-2 text-[#632A50] font-bold text-2xl">
          Sign up
        </h2>
        {error && (
          <div className="text-center text-red-600 text-2xl p-1 max-sm:text-lg">
            {" "}
            {error}
          </div>
        )}
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <div className=" mx-auto w-[25vw] max-sm:w-[85vw] justify-center my-4  max-sm:my-1">
            <label className="text-xl max-sm:text-lg" htmlFor="user">
              Username
            </label>
            <input
              required
              className="bg-[#f1f0f0] w-full p-2 px-5 rounded-2xl focus:border-none outline-none text-xl max-sm:text-lg"
              type="text"
              id="user"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className=" mx-auto w-[25vw] max-sm:w-[85vw]  justify-center my-5 ">
            <label className="text-xl max-sm:text-lg" htmlFor="Email">
              Email
            </label>
            <input
              required
              className="bg-[#f1f0f0] w-full p-2 px-5 rounded-2xl focus:border-none outline-none text-xl max-sm:text-lg"
              type="email"
              id="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className=" mx-auto w-[25vw] max-sm:w-[85vw] justify-center my-5">
            <label className="text-xl max-sm:text-lg" htmlFor="password">
              Password
            </label>
            <input
              required
              className="bg-[#f1f0f0] w-full p-2 px-5 rounded-2xl focus:border-none outline-none text-xl max-sm:text-lg"
              type="password"
              id="password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className=" mx-auto w-[25vw] max-sm:w-[85vw] justify-center my-5">
            <label className="text-xl max-sm:text-lg" htmlFor="confirmpassword">
              Confirm Password
            </label>
            <input
              required
              className="bg-[#f1f0f0] w-full p-2 px-5 rounded-2xl focus:border-none outline-none text-xl  max-sm:text-lg"
              type="password"
              id="confirmpassword"
              value={ConfirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
            />
          </div>
          <div className="mx-auto w-[25vw] max-sm:w-[85vw] justify-center">
            <input
              className="w-full bg-blue-500 rounded-2xl mt-5 hover:bg-blue-700 cursor-pointer text-white border-blue-500 font-semibold font-sans text-3xl p-2 max-sm:text-2xl max-sm:space"
              type="submit"
              value="Signup"
            />
          </div>
        </form>
        <p className="text-center text-xl py-1">OR</p>
        <p className="text-center text-xl py-1">
          Already Have An account{" "}
          <Link
            className="text-xl text-blue-500 cursor-pointer hover:text-blue-800"
            to="/user/login"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default UserSignup;
