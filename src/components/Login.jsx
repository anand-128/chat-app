import React, { useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {

  let redirect = useNavigate()

  const [login, setLogin] = useState({
    username: "",
    password: ""
  })


  let handleLogin = async () => {
    // toast.warning("Login Feature");

    let loginData = {
        email : login.username,
        password : login.password
    }

    let url = "https://api.skillsvarz.com/api/login"
    let resp = await fetch(url,{
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    })

    let result = await resp.json()
    // console.log(result)

    if(resp.status === 200 || resp.status === 201){
      localStorage.setItem("user_id",JSON.stringify(result.user._id))
      toast.success(result.message)
      setTimeout(() => {
        redirect("/user")
      },1000)
    }
    
    else toast.error(result.error)
  };

//   console.log(login)



  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
      <div className="w-[90%] sm:w-[400px] bg-[#1e293b] p-8 rounded-2xl shadow-lg">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-6 text-white">
          Welcome Back 👋
        </h2>

        {/* Username */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Username or Email
          </label>
          <input
            type="text"
            id="username"
            onChange={(event) => {
              setLogin({ ...login, username: event.target.value });
            }}
            placeholder="Enter your email..."
            className="w-full px-4 py-2 bg-[#0f172a] text-white border border-gray-600 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            onChange={(event) => {
              setLogin({ ...login, password: event.target.value });
            }}
            placeholder="Enter your password..."
            className="w-full px-4 py-2 bg-[#0f172a] text-white border border-gray-600 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Forgot Password */}
        <div onClick={()=>{redirect("forget-password")}} className="text-right mb-4">
          <span className="text-sm text-blue-500 cursor-pointer hover:underline">
            Forgot password?
          </span>
        </div>

        {/* Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Login
        </button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-1 border-gray-600" />
          <span className="px-2 text-gray-400 text-sm">OR</span>
          <hr className="flex-1 border-gray-600" />
        </div>

        {/* Register */}
        <p className="text-center text-sm text-gray-400">
          Don’t have an account?{" "}
          <span className="text-blue-500 cursor-pointer hover:underline">
            <Link to="/signup">Register</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
