import React from "react";
import { useNavigate } from "react-router-dom";

const RecentChatBox = ({
  name,
  email,
  id,
  newChat,
  setChatId,
  value,
  setFriendName,
}) => {
  const navigate = useNavigate();

  const handleClick = async () => {
    // Set friend name in parent state immediately
    setFriendName?.(name || "User");

    try {
      let targetChatId = null;

      // Handle search result vs existing recent chat
      if (newChat && id) {
        targetChatId = await newChat(id);
      } else if (value?._id) {
        targetChatId = value._id;
      }

      if (targetChatId) {
        setChatId(targetChatId);
      }

      // Navigate to chat screen
      navigate("/user/chat");
    } catch (err) {
      console.error("Chat creation / selection error:", err);
    }
  };

  // Helper function for dynamic time (Fallback to 2m if unavailable)
  const formatTime = (dateString) => {
    if (!dateString) return "2m";
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const displayName = name || "Unknown User";
  const displayEmail = email || "No Email";
  const timestamp = formatTime(value?.updatedAt || value?.latestMessage?.createdAt);

  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-800 transition select-none"
    >
      {/* Avatar */}
      <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
        <img
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
            displayName
          )}&background=2563eb&color=fff`}
          alt={displayName}
          className="w-full h-full object-cover"
        />
      </div>

      {/* User Details */}
      <div className="flex-1 overflow-hidden">
        <h2 className="text-sm font-semibold text-white truncate">
          {displayName}
        </h2>

        <p className="text-xs text-gray-400 truncate">
          {displayEmail}
        </p>
      </div>

      {/* Time */}
      <span className="text-xs text-gray-500 flex-shrink-0">
        {timestamp}
      </span>
    </div>
  );
};

export default RecentChatBox;