import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const MainOutlet = () => {
  return (
    <>
      <Outlet />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default MainOutlet;