import React, { useEffect, useState, useRef } from "react";
import { MoreVertical, Send } from "lucide-react";
import { useNavigate, useOutletContext } from "react-router-dom";

// Helper function to safely read JWT token
const getToken = () => {
  try {
    const token = localStorage.getItem("user_token");
    if (!token) return "";
    return token.startsWith('"') ? JSON.parse(token) : token;
  } catch {
    return localStorage.getItem("user_token") || "";
  }
};

// Sub-component for Friend's Message
const FriendMessage = ({ value }) => (
  <div className="flex items-end gap-2 my-2">
    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
      <img
        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
          value.sender?.name || "User"
        )}&background=2563eb&color=fff`}
        alt={value.sender?.name || "User"}
        className="w-full h-full object-cover"
      />
    </div>

    <div className="bg-[#1e293b] px-3 py-2 rounded-lg max-w-xs break-words">
      <p className="text-sm">{value.content}</p>
      <span className="text-[10px] text-gray-400 block mt-1 text-right">
        {value.createdAt
          ? new Date(value.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          : ""}
      </span>
    </div>
  </div>
);

// Sub-component for My Message
const MyMessage = ({ value, userName }) => (
  <div className="flex justify-end items-end gap-2 my-2">
    <div className="bg-blue-600 px-3 py-2 rounded-lg max-w-xs text-right break-words">
      <p className="text-sm text-white">{value.content}</p>
      <span className="text-[10px] text-blue-200 block mt-1">
        {value.createdAt
          ? new Date(value.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          : ""}
      </span>
    </div>

    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
      <img
        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
          value.sender?.name || userName || "Me"
        )}&background=2563eb&color=fff`}
        alt={value.sender?.name || "Me"}
        className="w-full h-full object-cover"
      />
    </div>
  </div>
);

const ChatScreen = () => {
  const redirect = useNavigate();

  // Outlet context handling with fallback object
  const context = useOutletContext() || {};
  const { user, chatId, friendName } = context;

  const [newMessage, setNewMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Auto-scroll anchor for new messages
  const chatEndRef = useRef(null);

  // Fetch messages when chatId changes
  useEffect(() => {
    if (!chatId) {
      redirect("/user");
      return;
    }

    const token = getToken();

    const fetchChats = async () => {
      setIsLoading(true);
      try {
        const resp = await fetch(
          `https://api.skillsvarz.com/api/messages/${chatId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const res = await resp.json();

        if (resp.ok && Array.isArray(res)) {
          setChats(res);
        } else {
          setChats([]);
        }
      } catch (err) {
        console.error("Fetch Messages Error:", err);
        setChats([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChats();
  }, [chatId, redirect]);

  // Auto scroll down whenever messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const token = getToken();
    const currentText = newMessage;
    setNewMessage(""); // Clear input immediately for better UX

    try {
      const resp = await fetch("https://api.skillsvarz.com/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          chatId,
          content: currentText,
        }),
      });

      const res = await resp.json();

      if (resp.ok && res) {
        setChats((prevChats) => [...prevChats, res]);
      } else {
        // Fallback: If API response doesn't return full object
        const fallbackMsg = {
          _id: String(Date.now()),
          sender: { _id: user?._id, name: user?.name || "Me" },
          content: currentText,
          createdAt: new Date().toISOString(),
        };
        setChats((prevChats) => [...prevChats, fallbackMsg]);
      }
    } catch (err) {
      console.error("Send Message Error:", err);
      setNewMessage(currentText); // Restore input on error
    }
  };

  return (
    <div className="flex-1 h-screen flex flex-col bg-[#0f172a] text-white border-l border-gray-700">
      {/* Header */}
      <div className="h-[70px] bg-[#1e293b] border-b border-gray-700 flex items-center justify-between px-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                friendName || "Friend"
              )}&background=2563eb&color=fff`}
              alt={friendName || "Friend"}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h2 className="font-semibold text-base">
              {friendName || "Select Chat"}
            </h2>
            <p className="text-xs text-emerald-400">Online</p>
          </div>
        </div>

        <MoreVertical className="cursor-pointer text-gray-400 hover:text-white" />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {isLoading ? (
          <div className="h-full flex items-center justify-center text-gray-400">
            Loading messages...
          </div>
        ) : Array.isArray(chats) && chats.length > 0 ? (
          chats.map((value, idx) => {
            const isMyMessage =
              String(value.sender?._id) === String(user?._id);

            return (
              <div key={value._id || `msg-${idx}`}>
                {isMyMessage ? (
                  <MyMessage value={value} userName={user?.name} />
                ) : (
                  <FriendMessage value={value} />
                )}
              </div>
            );
          })
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            No messages yet. Say hi! 👋
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="h-[70px] bg-[#1e293b] border-t border-gray-700 flex items-center gap-3 px-4 flex-shrink-0">
        <input
          type="text"
          value={newMessage}
          placeholder="Type a message..."
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          className="flex-1 px-4 py-2 rounded-full bg-[#0f172a] outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
        />

        <button
          onClick={sendMessage}
          className="bg-blue-600 hover:bg-blue-700 p-2.5 rounded-full transition text-white flex items-center justify-center"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default ChatScreen;