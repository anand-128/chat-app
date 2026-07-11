import { KeyRound, Lock, Mail } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../components/Loading";

const ForgetPassword = () => {
  const redirect = useNavigate();

  const [resetPass, setResetPass] = useState({
    otp: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const [isOTPSend, setIsOTPSend] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    setResetPass({
      ...resetPass,
      [e.target.name]: e.target.value,
    });
  };

  // ================= SEND OTP =================

  const sendOTP = async () => {
    if (!resetPass.email) {
      return toast.error("Please enter your email");
    }

    try {
      setLoading(true);

      const resp = await fetch(
        "https://api.skillsvarz.com/api/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: resetPass.email,
          }),
        }
      );

      const res = await resp.json();

      if (resp.ok) {
        toast.success(res.message || "OTP Sent Successfully");
        setIsOTPSend(true);
      } else {
        toast.error(res.error || "Unable to send OTP");
      }
    } catch (error) {
      console.log(error);
      toast.error("Server Error");
    }

    setLoading(false);
  };

  // ================= CHANGE PASSWORD =================

  const changePass = async () => {
    if (!resetPass.otp) {
      return toast.error("Enter OTP");
    }

    if (!resetPass.password || !resetPass.cpassword) {
      return toast.error("Please fill all fields");
    }

    if (resetPass.password !== resetPass.cpassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);

      const resp = await fetch(
        "https://api.skillsvarz.com/api/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            otp: resetPass.otp,
            newPassword: resetPass.password,
          }),
        }
      );

      const res = await resp.json();

      if (resp.ok) {
        toast.success(res.message || "Password Changed Successfully");

        setTimeout(() => {
          redirect("/login");
        }, 1000);
      } else {
        toast.error(res.error || "Failed to Change Password");
      }
    } catch (error) {
      console.log(error);
      toast.error("Server Error");
    }

    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold text-center mb-6">
              {isOTPSend ? "Reset Password" : "Forgot Password"}
            </h2>

            {isOTPSend ? (
              <>
                <div className="mb-4 relative">
                  <KeyRound
                    className="absolute left-3 top-3 text-gray-400"
                    size={18}
                  />

                  <input
                    type="number"
                    name="otp"
                    value={resetPass.otp}
                    onChange={handleInput}
                    placeholder="Enter OTP"
                    className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="mb-4 relative">
                  <Lock
                    className="absolute left-3 top-3 text-gray-400"
                    size={18}
                  />

                  <input
                    type="password"
                    name="password"
                    value={resetPass.password}
                    onChange={handleInput}
                    placeholder="Enter New Password"
                    className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="mb-4 relative">
                  <Lock
                    className="absolute left-3 top-3 text-gray-400"
                    size={18}
                  />

                  <input
                    type="password"
                    name="cpassword"
                    value={resetPass.cpassword}
                    onChange={handleInput}
                    placeholder="Confirm Password"
                    className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  onClick={changePass}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Change Password
                </button>
              </>
            ) : (
              <>
                <div className="mb-4 relative">
                  <Mail
                    className="absolute left-3 top-3 text-gray-400"
                    size={18}
                  />

                  <input
                    type="email"
                    name="email"
                    value={resetPass.email}
                    onChange={handleInput}
                    placeholder="Enter Your Email"
                    className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  onClick={sendOTP}
                  className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                >
                  Send OTP
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ForgetPassword;