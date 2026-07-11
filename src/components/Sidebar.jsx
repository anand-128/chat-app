import React, { useEffect, useState, useCallback } from "react";
import RecentChatBox from "./RecentChatBox";
import {
  LogOutIcon,
  MessageCircleCheck,
  Settings,
  User2Icon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ user, chatId, setChatId, setFriendName }) => {
  const redirect = useNavigate();

  const [isEnabled, setIsEnabled] = useState(true);
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [chats, setChats] = useState([]);

  // Safely retrieve token from localStorage
  const getToken = () => {
    try {
      const token = localStorage.getItem("user_token");
      if (!token) return "";
      return token.startsWith('"') ? JSON.parse(token) : token;
    } catch {
      return localStorage.getItem("user_token") || "";
    }
  };

  // Fetch all user chats
  const fetchChats = useCallback(async () => {
    const user_token = getToken();
    if (!user_token) return;

    try {
      const url = "https://api.skillsvarz.com/api/chats";
      const resp = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user_token}`,
        },
      });

      const res = await resp.json();

      if (resp.ok) {
        // Safe check for Array response or object wrapper like { data: [...] }
        const chatsList = Array.isArray(res)
          ? res
          : res?.chats || res?.data || [];
        setChats(chatsList);
      } else {
        console.error("API Error fetching chats:", res);
        setChats([]);
      }
    } catch (err) {
      console.error("Failed to fetch chats:", err);
      setChats([]);
    }
  }, []);

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  // Create or open a new chat
  const newChat = async (userId) => {
    const user_token = getToken();
    const url = "https://api.skillsvarz.com/api/chats";

    try {
      const resp = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user_token}`,
        },
        body: JSON.stringify({ userId }),
      });

      const res = await resp.json();

      if (resp.ok) {
        // Refresh chats after creating a new one
        await fetchChats();
        setSearch(""); // Clear search bar
        return res._id || res.chat?._id;
      } else {
        console.error("Failed to create chat:", res);
      }
    } catch (err) {
      console.error("Error creating new chat:", err);
    }
  };

  // Search users functionality
  const handleSearch = async (event) => {
    const query = event.target.value;
    setSearch(query);

    if (!query.trim()) {
      setSearchData([]);
      return;
    }

    const user_token = getToken();
    const url = `https://api.skillsvarz.com/api/user/search?query=${query}`;

    try {
      const resp = await fetch(url, {
        headers: {
          Authorization: `Bearer ${user_token}`,
        },
      });

      const res = await resp.json();

      if (resp.ok) {
        const usersList = Array.isArray(res) ? res : res?.users || res?.data || [];
        setSearchData(usersList);
      } else {
        setSearchData([]);
      }
    } catch (err) {
      console.error("Error searching users:", err);
      setSearchData([]);
    }
  };

  const userName = user?.name || "User";

  return (
    <>
      {isEnabled ? (
        <div className="w-[20%] h-screen bg-[#111827] text-white flex flex-col">
          {/* 🔍 Search Bar */}
          <div className="p-3 border-b border-gray-700">
            <input
              type="search"
              placeholder="Search chats..."
              value={search}
              onChange={handleSearch}
              className="w-full px-3 py-2 rounded-lg bg-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* 💬 Recent Chats */}
          <div className="flex-1 overflow-y-auto p-2">
            {search.trim() ? (
              <>
                <h2 className="text-gray-400 text-sm px-2 mb-2">
                  Search results...
                </h2>
                {searchData.length === 0 ? (
                  <span className="text-gray-400 text-sm px-2">
                    No users found..
                  </span>
                ) : (
                  searchData.map((value, index) => (
                    <RecentChatBox
                      key={value._id || index}
                      name={value.name}
                      setFriendName={setFriendName}
                      email={value.email}
                      id={value._id}
                      newChat={newChat}
                      setChatId={setChatId}
                    />
                  ))
                )}
              </>
            ) : (
              <>
                <h2 className="text-gray-400 text-sm px-2 mb-2">
                  Recent Chats...
                </h2>
                {chats.length === 0 ? (
                  <span className="text-gray-400 text-sm px-2">
                    No Recent Chats..
                  </span>
                ) : (
                  chats.map((value, index) => {
                    const otherUser = value.users?.find(
                      (u) => u._id !== user?._id
                    );
                    return (
                      <RecentChatBox
                        key={value._id || index}
                        name={otherUser?.name || "Unknown"}
                        setFriendName={setFriendName}
                        email={otherUser?.email}
                        setChatId={setChatId}
                        value={value}
                      />
                    );
                  })
                )}
              </>
            )}
          </div>

          {/* 👤 User Profile Footer */}
          <div className="relative h-[70px] bg-gray-900 flex items-center gap-3 px-3 border-t border-gray-700">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                  userName
                )}&background=2563eb&color=fff`}
                alt="profile"
              />
            </div>
            <h2 className="font-medium truncate">{userName}</h2>

            <button
              className="absolute right-5"
              onClick={() => setIsEnabled(false)}
            >
              <Settings className="cursor-pointer" />
            </button>
          </div>
        </div>
      ) : (
        <div className="w-[20%] h-screen bg-[#111827] text-white flex flex-col">
          {/* 🔍 Settings Top Bar */}
          <div className="p-3 border-b border-gray-700">
            <input
              type="search"
              placeholder="Search here..."
              className="w-full px-3 py-2 rounded-lg bg-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Settings Options */}
          <div className="flex-1 overflow-y-auto p-2">
            <h2 className="text-gray-400 text-sm px-2 mb-4">Settings</h2>

            <button
              onClick={() => setIsEnabled(true)}
              className="flex gap-2 my-2 border border-gray-700 w-full p-2 rounded-sm hover:bg-gray-800"
            >
              <MessageCircleCheck /> <span>My Chats</span>
            </button>

            <button
              onClick={() => redirect("/user/change-password")}
              className="flex gap-2 my-2 border border-gray-700 w-full p-2 rounded-sm hover:bg-gray-800"
            >
              <Settings /> <span>Settings</span>
            </button>

            <button
              onClick={() => redirect("/user/profile")}
              className="flex gap-2 my-2 border border-gray-700 w-full p-2 rounded-sm hover:bg-gray-800"
            >
              <User2Icon /> <span>Profile</span>
            </button>

            <button
              onClick={() => {
                localStorage.removeItem("user_token");
                redirect("/");
              }}
              className="flex gap-2 my-2 border border-gray-700 w-full p-2 rounded-sm hover:bg-gray-800 text-red-400"
            >
              <LogOutIcon /> <span>LogOut</span>
            </button>
          </div>

          {/* 👤 User Profile Footer */}
          <div className="h-[70px] bg-gray-900 flex items-center gap-3 px-3 border-t border-gray-700">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                  userName
                )}&background=2563eb&color=fff`}
                alt="profile"
              />
            </div>
            <h2 className="font-medium truncate">{userName}</h2>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;