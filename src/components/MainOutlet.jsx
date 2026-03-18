import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const MainOutlet = () => {
  return (
    <div>
      <Outlet />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default MainOutlet;
