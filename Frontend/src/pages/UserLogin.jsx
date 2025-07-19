import React,{useState} from "react";
import Logo from "../components/Logo";
import { Link } from "react-router-dom";
function UserLogin() {
function handleChange(e) {
  let {name, value} = e.target
  setcredentials({
    [name] : value
  })
}
  const [credentials, setcredentials] = useState({
    username:"",
    password:""
  })
  return (
    <div className="bg-gradient-to-b from-[#B188C5] to-[#5C416A] h-screen w-full ">
      <Logo />
      <div className="w-[22vw] max-sm:w-[90vw] rounded   mx-auto backdrop-blur-3xl bg-white max-h-fit mt-4">
        <h2 className="text-center p-2 text-[#632A50] font-bold text-2xl mx-auto">
          Login
        </h2>
        <form >
        <div className="mx-auto w-[85%] my-3 mt-1">
          <label className="px-1" htmlFor="username">Enter your username or Email</label>
          <input type="text" name="username" id="username" className=" text w-full bg-[#f1f0f0] border-none px-2 py-1 rounded " value={credentials.username} onChange={handleChange}/>
        </div>
        <div className="mx-auto w-[85%] my-3">
          <label className="px-1" htmlFor="password">Enter your password</label>
          <input type="text" name="password" id="password" className=" text w-full bg-[#f1f0f0] border-none px-2 py-1 rounded" value={credentials.password} onChange={handleChange}/>
        </div>
        <div className=" mx-auto w-[85%] my-3"> 
          <input className="text-2xl font-semibold w-full text-white  bg-blue-500 rounded p-1" type="submit" value="Login" />
        </div>
        </form>
        <p className="text-center text-lg ">Not registered ?<Link className="text-xl text-blue-500 cursor-pointer hover:text-blue-800" to="/user/signup"> Register</Link></p>
      </div>
    </div>
  );
}

export default UserLogin;
