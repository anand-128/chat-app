import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";

const UserProfile = () => {
  const { user } = useOutletContext();

  const [userData, setUserData] = useState({});
  const [isEdit, setIsEdit] = useState(true);

  useEffect(() => {
    setUserData(user);
  }, [user]);

  let handleChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  let handleEdit = async () => {
    if (isEdit) {
      setIsEdit(false);
    } else {
      // API Call for user Data updation
      let URL = "https://api.skillsvarz.com/api/user" + user._id;
      // console.log(URL);

      let resp = await fetch(URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      let result = await resp.json();

      if (resp.status === 200 || resp.status === 201) {
        toast.success("User Updated Successfully");
        setIsEdit(true);
      } else toast.error("Try Again");
    }
  };

  let handleCancel = () => {
    setUserData(user);
    setIsEdit(true);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#0f172a] text-white">
      <div className="w-[90%] sm:w-[420px] bg-[#1e293b] rounded-2xl shadow-lg p-6 space-y-5">
        {/* 👤 Avatar + Title */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <img
              src={`https://ui-avatars.com/api/?name=${user.name}&background=2563eb&color=fff`}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          <h2 className="text-xl font-semibold">{user.name}</h2>

          <p className="text-xs text-gray-400">Profile Details</p>
        </div>

        {/* 🧾 Input Fields */}
        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="text-sm text-gray-400">Your Name</label>
            <input
              onChange={handleChange}
              disabled={isEdit}
              type="text"
              name="name"
              value={userData.name}
              className="w-full mt-1 px-3 py-2 rounded-lg bg-[#0f172a] text-white border border-gray-600 outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-gray-400">Your Email</label>
            <input
              onChange={handleChange}
              disabled={isEdit}
              type="email"
              name="email"
              value={userData.email}
              className="w-full mt-1 px-3 py-2 rounded-lg bg-[#0f172a] text-white border border-gray-600 outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm text-gray-400">Your Phone</label>
            <input
              onChange={handleChange}
              disabled={isEdit}
              type="number"
              name="phone"
              value={userData.phone}
              className="w-full mt-1 px-3 py-2 rounded-lg bg-[#0f172a] text-white border border-gray-600 outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
            />
          </div>

          {/* Username */}
          <div>
            <label className="text-sm text-gray-400">Username</label>
            <input
              onChange={handleChange}
              disabled={isEdit}
              type="text"
              name="username"
              value={userData.username}
              placeholder="Enter your username..."
              className="w-full mt-1 px-3 py-2 rounded-lg bg-[#0f172a] text-white border border-gray-600 outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
            />
          </div>
        </div>

        {/* 🔘 Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={handleEdit}
            className="flex-1 bg-blue-600 hover:bg-blue-700 py-2 rounded-lg transition font-medium"
          >
            {isEdit ? "Edit Profile" : "Save Changes"}
          </button>

          {!isEdit && (
            <button
              onClick={handleCancel}
              className="flex-1 bg-gray-700 hover:bg-gray-600 py-2 rounded-lg transition"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
