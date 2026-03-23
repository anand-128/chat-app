import React, {useState} from "react";
import RecentChat from './RecentChat'
import { LogOutIcon, MessageCircleCheck, MoveLeft, MoveLeftIcon, Settings, User2Icon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Sidebar = ({user}) => {

  let redirect = useNavigate()

  const[isEnabled, setIsEnabled] = useState(true)

  return (
    <>
      {isEnabled ? (
        <div className="w-[20%] h-screen bg-[#1e293b] text-white flex flex-col">
          {/* 🔍 Search Bar */}
          <div className="p-3 border-b border-gray-600">
            <input
              type="search"
              placeholder="Search chats..."
              className="w-full px-3 py-2 rounded-lg bg-[#0f172a] text-white outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* 💬 Recent Chats */}
          <div className="flex-1 overflow-y-auto p-2">
            <h2 className="text-gray-400 text-sm px-2 mb-2">Recent Chats</h2>

            <RecentChat name="Rahul" />
            <RecentChat name="Aman" />
            <RecentChat name="Priya" />
          </div>

          {/* 👤 User Profile */}
          <div className="relative h-[70px] bg-[#0f172a] flex items-center gap-3 px-3 border-t border-gray-600">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                src={`https://ui-avatars.com/api/?name=${user.name}&background=2563eb&color=fff`}
                alt=""
              />
            </div>
            <h2 className="font-medium">{user.name}</h2>

            <span
              className="absolute right-5 cursor-pointer text-gray-400 hover:text-blue-500"
              onClick={() => setIsEnabled(false)}
            >
              <Settings />
            </span>
          </div>
        </div>
      ) : (
        <div className="w-[20%] h-screen bg-[#1e293b] text-white flex flex-col">
          {/* 🔍 Search Bar */}
          <div className="p-3 border-b border-gray-600">
            <input
              type="search"
              placeholder="Search here..."
              className="w-full px-3 py-2 rounded-lg bg-[#0f172a] text-white outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* ⚙️ Settings */}
          <div className="flex-1 overflow-y-auto p-2">
            <h2 className="text-gray-400 text-sm px-2 mb-4">Settings</h2>

            <button
              onClick={() => setIsEnabled(true)}
              className="flex items-center gap-3 my-2 w-full p-2 rounded-lg hover:bg-[#0f172a] transition"
            >
              <MessageCircleCheck />
              <span>My Chats</span>
            </button>

            <button className="flex items-center gap-3 my-2 w-full p-2 rounded-lg hover:bg-[#0f172a] transition">
              <Settings />
              <span>Setting</span>
            </button>

            <button
              onClick={() => redirect("/user/profile")}
              className="flex items-center gap-3 my-2 w-full p-2 rounded-lg hover:bg-[#0f172a] transition"
            >
              <User2Icon />
              <span>Profile</span>
            </button>

            <button
              onClick={() => redirect("/")}
              className="flex items-center gap-3 my-2 w-full p-2 rounded-lg hover:bg-red-500/20 text-red-400 transition"
            >
              <LogOutIcon />
              <span>LogOut</span>
            </button>
          </div>

          {/* 👤 User Profile */}
          <div className="h-[70px] bg-[#0f172a] flex items-center gap-3 px-3 border-t border-gray-600">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                src={`https://ui-avatars.com/api/?name=${user.name}&background=2563eb&color=fff`}
                alt=""
              />
            </div>
            <h2 className="font-medium">{user.name}</h2>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
