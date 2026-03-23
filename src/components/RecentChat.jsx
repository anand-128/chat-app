import React from "react";
import { useNavigate } from 'react-router-dom'

const RecentChat = ({name}) => {

  let redirect = useNavigate()

  return (
    <div
      onClick={() => {
        redirect("/user/chat");
      }}
      className="relative flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-[#0f172a] transition"
    >
      {/* Avatar */}
      <div className="relative w-10 h-10">
        <img
          src={`https://ui-avatars.com/api/?name=${name}&background=2563eb&color=fff`}
          alt=""
          className="w-full h-full rounded-full object-cover"
        />

        {/* 🟢 Online Indicator */}
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#1e293b]"></div>
      </div>

      {/* Name + Last Message */}
      <div className="flex-1">
        <h2 className="text-sm font-medium text-white">{name}</h2>
        <p className="text-xs text-gray-400 truncate">
          Last message preview...
        </p>
      </div>

      {/* Right Section */}
      <div className="flex flex-col items-end gap-1">
        <span className="text-xs text-gray-500">2m</span>

        {/* 🔵 Unread Count */}
        <span className="bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-full">
          2
        </span>
      </div>
    </div>
  );
};

export default RecentChat;
