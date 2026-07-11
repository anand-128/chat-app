import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";
import Loading from "./Loading";

const Signup = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [showPass, setShowPass] = useState(false);
  const [showCPass, setShowCPass] = useState(false);

  const [signup, setSignup] = useState({
    uname: "",
    uemail: "",
    umobile: "",
    pass: "",
    cpass: "",
  });

  const handleChange = (e) => {
    setSignup({
      ...signup,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async () => {
    if (
      !signup.uname ||
      !signup.uemail ||
      !signup.umobile ||
      !signup.pass ||
      !signup.cpass
    ) {
      return toast.error("Please fill all fields");
    }

    if (signup.pass !== signup.cpass) {
      return toast.error("Passwords do not match");
    }

    if (signup.umobile.length !== 10) {
      return toast.error("Enter valid mobile number");
    }

    try {
      setLoading(true);

      const newData = {
        name: signup.uname,
        email: signup.uemail,
        phone: signup.umobile,
        password: signup.pass,
      };

      const resp = await fetch(
        "https://api.skillsvarz.com/api/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newData),
        }
      );

      const res = await resp.json();

      console.log(res);

      if (resp.ok) {
        toast.success("Account Created Successfully");

        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        toast.error(res.error || "Signup Failed");
      }
    } catch (err) {
      console.log(err);
      toast.error("Network Error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading message="Creating Account..." />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
      <div className="w-[90%] sm:w-[420px] bg-[#1e293b] rounded-2xl p-8 shadow-2xl">

        <h2 className="text-3xl font-bold text-center text-white mb-8">
          Create Account 🚀
        </h2>

        {/* Name */}

        <div className="mb-4">
          <label className="text-gray-400 text-sm block mb-2">
            Full Name
          </label>

          <input
            type="text"
            name="uname"
            value={signup.uname}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full px-4 py-3 bg-[#0f172a] border border-gray-600 rounded-lg text-white outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email */}

        <div className="mb-4">
          <label className="text-gray-400 text-sm block mb-2">
            Email
          </label>

          <input
            type="email"
            name="uemail"
            value={signup.uemail}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full px-4 py-3 bg-[#0f172a] border border-gray-600 rounded-lg text-white outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Phone */}

        <div className="mb-4">
          <label className="text-gray-400 text-sm block mb-2">
            Phone
          </label>

          <input
            type="number"
            name="umobile"
            value={signup.umobile}
            onChange={handleChange}
            placeholder="Enter phone number"
            className="w-full px-4 py-3 bg-[#0f172a] border border-gray-600 rounded-lg text-white outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password */}

        <div className="mb-4 relative">

          <label className="text-gray-400 text-sm block mb-2">
            Password
          </label>

          <input
            type={showPass ? "text" : "password"}
            name="pass"
            value={signup.pass}
            onChange={handleChange}
            placeholder="Enter password"
            className="w-full px-4 py-3 bg-[#0f172a] border border-gray-600 rounded-lg text-white outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="button"
            className="absolute right-4 top-[44px] text-gray-400"
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? <EyeOff size={20}/> : <Eye size={20}/>}
          </button>

        </div>

        {/* Confirm Password */}

        <div className="mb-6 relative">

          <label className="text-gray-400 text-sm block mb-2">
            Confirm Password
          </label>

          <input
            type={showCPass ? "text" : "password"}
            name="cpass"
            value={signup.cpass}
            onChange={handleChange}
            placeholder="Confirm password"
            className="w-full px-4 py-3 bg-[#0f172a] border border-gray-600 rounded-lg text-white outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="button"
            className="absolute right-4 top-[44px] text-gray-400"
            onClick={() => setShowCPass(!showCPass)}
          >
            {showCPass ? <EyeOff size={20}/> : <Eye size={20}/>}
          </button>

        </div>

        <button
          onClick={handleSignup}
          className="w-full bg-blue-600 hover:bg-blue-700 transition py-3 rounded-lg text-white font-semibold"
        >
          Register
        </button>

        <div className="flex items-center my-6">
          <hr className="flex-1 border-gray-600" />
          <span className="mx-3 text-gray-400 text-sm">
            OR
          </span>
          <hr className="flex-1 border-gray-600" />
        </div>

        <p className="text-center text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-500 hover:underline"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Signup;