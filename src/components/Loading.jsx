import React from "react";

const Loading = ({ message }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">

            <div className="bg-white px-8 py-6 rounded-2xl shadow-xl flex flex-col items-center gap-4">

                {/* Spinner */}
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

                {/* Message */}
                <p className="text-gray-700 text-sm font-medium text-center">
                    {message ? message : "Please Wait. Processing..." }
                </p>

            </div>
        </div>
    );
};

export default Loading;