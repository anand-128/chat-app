import { Lock, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const redirect = useNavigate();
  const { user } = useOutletContext();

  const [resetPass, setResetPass] = useState({
    password: "",
    cpassword: "",
  });

  const handleInput = (e) => {
    setResetPass({
      ...resetPass,
      [e.target.name]: e.target.value,
    });
  };

  // ================= Change Password =================

  const changePass = async () => {
    if (!resetPass.password || !resetPass.cpassword) {
      return toast.error("Please fill all fields");
    }

    if (resetPass.password !== resetPass.cpassword) {
      return toast.error("Passwords do not match");
    }

    try {
      const token = JSON.parse(localStorage.getItem("user_token"));

      const resp = await fetch(
        `https://api.skillsvarz.com/api/user/${user._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            password: resetPass.password,
          }),
        }
      );

      const res = await resp.json();

      if (resp.ok) {
        toast.success(res.message || "Password Changed Successfully");

        localStorage.removeItem("user_id");
        localStorage.removeItem("user_token");

        setTimeout(() => {
          redirect("/login");
        }, 1000);
      } else {
        toast.error(res.error || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Server Error");
    }
  };

  // ================= Delete Account =================

  const deleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?"
    );

    if (!confirmDelete) return;

    try {
      const token = JSON.parse(localStorage.getItem("user_token"));

      const resp = await fetch(
        `https://api.skillsvarz.com/api/user/${user._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const res = await resp.json();

      if (resp.ok) {
        toast.success(res.message || "Account Deleted");

        localStorage.removeItem("user_id");
        localStorage.removeItem("user_token");

        setTimeout(() => {
          redirect("/login");
        }, 1000);
      } else {
        toast.error(res.error || "Unable to delete account");
      }
    } catch (error) {
      console.log(error);
      toast.error("Server Error");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Account Settings
        </h2>

        {/* Password */}
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

        {/* Confirm Password */}

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

        {/* Change Password Button */}

        <button
          onClick={changePass}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition mb-6"
        >
          Change Password
        </button>

        {/* Divider */}

        <div className="border-t pt-4">
          <p className="text-center text-gray-500 mb-3">Danger Zone</p>

          <button
            onClick={deleteAccount}
            className="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
          >
            <Trash2 size={18} />
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;