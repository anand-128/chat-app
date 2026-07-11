import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Sidebar from "./Sidebar";

const UserOutlet = () => {
  const user_id = JSON.parse(localStorage.getItem("user_id"));

  const [user, setUser] = useState(null);
  const [chatId, setChatId] = useState("");
  const [friendName, setFriendName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user_id) return;

    const fetchUser = async () => {
      try {
        const resp = await fetch(
          `https://api.skillsvarz.com/api/user/${user_id}`
        );

        if (!resp.ok) {
          throw new Error("Unable to fetch user");
        }

        const res = await resp.json();
        setUser(res);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [user_id]);

  // User not logged in
  if (!user_id) {
    return <Navigate to="/login" replace />;
  }

  // Loading
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#0f172a] text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full bg-[#0f172a]">
      <Sidebar
        user={user}
        chatId={chatId}
        setChatId={setChatId}
        setFriendName={setFriendName}
      />

      <Outlet
        context={{
          user,
          chatId,
          setChatId,
          friendName,
        }}
      />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="dark"
      />
    </div>
  );
};

export default UserOutlet;