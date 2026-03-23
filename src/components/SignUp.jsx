import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignUp = () => {
  let redirect = useNavigate();

  const [signup, setSignup] = useState({
    uname: "",
    uemail: "",
    umobile: "",
    pass: "",
    cpass: "",
  });

  let handleChange = (event) => {
    setSignup({ ...signup, [event.target.name]: event.target.value });
  };

  let handleSignup = async () => {
    // toast.info("Ready to Implement");

    let newData = {
      email: signup.uemail,
      name: signup.uname,
      password: signup.pass,
      phone: signup.umobile,
    };
    // console.log(newData);

    let url = "https://api.skillsvarz.com/api/users";
    let resp = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });

    // console.log(resp);

    let result = await resp.json();

    // console.log(result)

    if (resp.status === 200 || resp.status === 201) {
            localStorage.setItem("user_id",JSON.stringify(result._id))
            toast.success('Account Created Successfully')
            setTimeout(() => {
                redirect('/user')
            }, 1000)
        }
        else toast.error(result.error)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
      <div className="w-[90%] sm:w-[420px] bg-[#1e293b] p-8 rounded-2xl shadow-lg">
        {/* Title */}
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Create Account 🚀
        </h2>

        {/* Name */}
        <div className="mb-4">
          <label className="text-sm text-gray-400">Your Name</label>
          <input
            onChange={handleChange}
            name="uname"
            type="text"
            placeholder="Enter your name"
            className="w-full mt-1 px-4 py-2 bg-[#0f172a] text-white border border-gray-600 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="text-sm text-gray-400">Your Email</label>
          <input
            onChange={handleChange}
            name="uemail"
            type="email"
            placeholder="Enter your email"
            className="w-full mt-1 px-4 py-2 bg-[#0f172a] text-white border border-gray-600 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="text-sm text-gray-400">Phone Number</label>
          <input
            onChange={handleChange}
            name="umobile"
            type="number"
            placeholder="Enter your phone number"
            className="w-full mt-1 px-4 py-2 bg-[#0f172a] text-white border border-gray-600 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="text-sm text-gray-400">Password</label>
          <input
            onChange={handleChange}
            name="pass"
            type="password"
            placeholder="Enter password"
            className="w-full mt-1 px-4 py-2 bg-[#0f172a] text-white border border-gray-600 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label className="text-sm text-gray-400">Confirm Password</label>
          <input
            onChange={handleChange}
            name="cpass"
            type="password"
            placeholder="Confirm password"
            className="w-full mt-1 px-4 py-2 bg-[#0f172a] text-white border border-gray-600 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Button */}
        <button
          onClick={handleSignup}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
        >
          Register Now
        </button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-1 border-gray-600" />
          <span className="px-2 text-gray-400 text-sm">OR</span>
          <hr className="flex-1 border-gray-600" />
        </div>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-400">
          Already have an account?{" "}
          <span className="text-blue-500 hover:underline cursor-pointer">
            <Link to="/login">Login Now</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
