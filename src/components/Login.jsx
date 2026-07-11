import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import Loading from "./Loading";

const Login = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async () => {
    if (!login.username.trim() || !login.password.trim()) {
      return toast.error("Please fill all fields");
    }

    try {
      setLoading(true);

      const resp = await fetch("https://api.skillsvarz.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: login.username,
          password: login.password,
        }),
      });

      const res = await resp.json();

      console.log("LOGIN RESPONSE:", res);

      if (resp.ok) {
        localStorage.setItem("user_id", JSON.stringify(res.user._id));
        localStorage.setItem("user_token", JSON.stringify(res.token));

        toast.success(res.message);

        setTimeout(() => {
          navigate("/user");
        }, 800);
      } else {
        toast.error(res.error || "Login Failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Network Error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading message="Checking Credentials..." />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
      <div className="w-[90%] sm:w-[420px] bg-[#1e293b] rounded-2xl p-8 shadow-2xl">

        <h2 className="text-3xl font-bold text-center text-white mb-8">
          Welcome Back 👋
        </h2>

        {/* Email */}

        <div className="mb-5">
          <label className="block text-gray-400 text-sm mb-2">
            Email
          </label>

          <input
            type="text"
            value={login.username}
            onChange={(e) =>
              setLogin({ ...login, username: e.target.value })
            }
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="Enter Email"
            className="w-full px-4 py-3 rounded-lg bg-[#0f172a] text-white border border-gray-600 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password */}

        <div className="mb-3 relative">

          <label className="block text-gray-400 text-sm mb-2">
            Password
          </label>

          <input
            type={showPassword ? "text" : "password"}
            value={login.password}
            onChange={(e) =>
              setLogin({ ...login, password: e.target.value })
            }
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="Enter Password"
            className="w-full px-4 py-3 rounded-lg bg-[#0f172a] text-white border border-gray-600 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-[44px] text-gray-400"
          >
            {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
          </button>

        </div>

        <div className="text-right mb-5">

          <Link
            to="/forget-password"
            className="text-blue-500 hover:underline text-sm"
          >
            Forgot Password?
          </Link>

        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg text-white font-semibold transition"
        >
          Login
        </button>

        <div className="flex items-center my-6">
          <hr className="flex-1 border-gray-600" />
          <span className="mx-3 text-gray-400 text-sm">OR</span>
          <hr className="flex-1 border-gray-600" />
        </div>

        <p className="text-center text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-500 hover:underline"
          >
            Register
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;