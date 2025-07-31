import React, { useState } from "react";
import Logo from "../components/Logo";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

axios.defaults.withCredentials = true;

function UserLogin() {
  let navigate = useNavigate()
  const [error, seterror] = useState("");


  useEffect(() => {
    async function AuthCheck() {
      try {
        let token = localStorage.getItem('accessToken')
        let response = await axios.get(
          `${import.meta.env.VITE_USER_URI}/authChecker`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        console.log(response.data);
        if(response.data.success) return navigate('/')
      } catch (error) {
        console.log(error);
      }
    }
    AuthCheck()
  }, [])
  
  async function submitHandler(e) {
    e.preventDefault();
    let { email, password } = credentials;
if (!email || !password) {
      seterror("Please fill all fields");
      return;
    }
    try {
      let response = await axios.post(
        `${import.meta.env.VITE_LOGIN_URI}`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true
        }
      );
      
      if (response.data.success) {
        localStorage.setItem("accessToken", response.data.data.accessToken);
        localStorage.setItem("refreshToken", response.data.data.refreshToken);
        navigate("/");
      } else {
        seterror(response.data.message);
      }
    } catch (error) {
      console.log(error.response?.data);
      seterror(error.response?.data.message);
    }
  }

  function handleChange(e) {
    let { name, value } = e.target;
    setcredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  const [credentials, setcredentials] = useState({
    email: "",
    password: "",
  });
  return (
    <div className="bg-gradient-to-b from-[#B188C5] to-[#5C416A] h-screen w-full ">
      <Logo />
      <div className="w-[22vw] max-sm:w-[90vw] rounded   mx-auto backdrop-blur-3xl bg-white max-h-fit mt-4">
        <h2 className="text-center p-2 text-[#632A50] font-bold text-2xl mx-auto">
          Login
        </h2>
        {error && <h3 className="text-red-500 text-center">{error}</h3>}
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <div className="mx-auto w-[85%] my-3 mt-1">
            <label className="px-1" htmlFor="email">
              Enter your Email 
            </label>
            <input
              type="text"
              name="email"
              id="email"
              className=" text w-full bg-[#f1f0f0] border-none px-2 py-1 rounded "
              value={credentials.email || ""}
              onChange={handleChange}
            />
          </div>
          <div className="mx-auto w-[85%] my-3">
            <label className="px-1" htmlFor="password">
              Enter your password
            </label>
            <input
              type="text"
              name="password"
              id="password"
              className=" text w-full bg-[#f1f0f0] border-none px-2 py-1 rounded"
              value={credentials.password || ""}
              onChange={handleChange}
            />
          </div>
          <div className=" mx-auto w-[85%] my-3">
            <input
              className="text-2xl font-semibold w-full text-white  bg-blue-500 rounded p-1"
              type="submit"
              value="Login"
            />
          </div>
        </form>
        <p className="text-center text-lg ">
          Not registered ?
          <Link
            className="text-xl text-blue-500 cursor-pointer hover:text-blue-800"
            to="/user/signup"
          >
            {" "}
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default UserLogin;
