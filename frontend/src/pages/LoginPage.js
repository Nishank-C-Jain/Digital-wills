import React, { useState } from "react";

export default function AuthPage({ onLogin }) {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eef2f7] via-[#f8fbff] to-[#e6ecf5] flex items-center justify-center">
      <div className="w-full max-w-5xl bg-white/90 backdrop-blur-lg rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] flex overflow-hidden border border-gray-200">

        {/* LEFT PANEL */}
        <div className="w-1/2 p-12">
          {/* TITLE */}
          <div className="flex items-center gap-2 mb-6">
           <img src="/react-icon.png" alt="logo" className="w-6 h-6" />
            <h1 className="text-lg font-semibold text-gray-700">
              Digital Will Management System
            </h1>
          </div>

          {/* TABS */}
          <div className="flex border-b mb-6">
            <button
              onClick={() => setActiveTab("login")}
              className={`flex-1 pb-2 text-sm font-medium ${
                activeTab === "login"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-400"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setActiveTab("register")}
              className={`flex-1 pb-2 text-sm font-medium ${
                activeTab === "register"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-400"
              }`}
            >
              Register
            </button>
          </div>

          {/* LOGIN */}
          {activeTab === "login" && (
            <div className="space-y-4">
              <div className="border rounded-md px-3 py-2 flex items-center gap-2">
                <span>📧</span>
                <input
                  type="email"
                  placeholder="aarav.sharma@gmail.com"
                  className="w-full outline-none text-sm"
                />
              </div>

              <div className="border rounded-md px-3 py-2 flex items-center gap-2">
                <span>🔒</span>
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full outline-none text-sm"
                />
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <input type="checkbox" className="accent-blue-500" />
                Remember Me
              </div>

              <button 
                onClick={onLogin}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md text-sm font-medium"
              >
                Login
              </button>

              <p className="text-center text-sm text-gray-500">
                Don't have an account?{' '}
                <span
                  onClick={() => setActiveTab("register")}
                  className="text-blue-500 cursor-pointer"
                >
                  Register
                </span>
              </p>

              {/* REGISTER INLINE PREVIEW (as in UI) */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="border rounded-md px-3 py-2 text-sm"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="border rounded-md px-3 py-2 text-sm"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="border rounded-md px-3 py-2 text-sm"
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="border rounded-md px-3 py-2 text-sm"
                />
              </div>

              <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-md text-sm">
                Register
              </button>

              <p className="text-sm text-gray-500">
                Already have an account?{' '}
                <span
                  onClick={() => setActiveTab("login")}
                  className="text-blue-500 cursor-pointer"
                >
                  Login
                </span>
              </p>
            </div>
          )}

          {/* REGISTER TAB */}
          {activeTab === "register" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="border rounded-md px-3 py-2 text-sm"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="border rounded-md px-3 py-2 text-sm"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="border rounded-md px-3 py-2 text-sm"
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="border rounded-md px-3 py-2 text-sm"
                />
              </div>

              <button className="w-full bg-blue-500 text-white py-2 rounded-md">
                Register
              </button>

              <p className="text-sm text-center text-gray-500">
                Already have an account?{' '}
                <span
                  onClick={() => setActiveTab("login")}
                  className="text-blue-500 cursor-pointer"
                >
                  Login
                </span>
              </p>
            </div>
          )}
        </div>

        {/* RIGHT PANEL */}
        <div className="w-1/2 bg-gradient-to-br from-[#eaf2ff] to-[#f4f8ff] flex flex-col items-center justify-center p-12">
          
            <img src="/image.png" 
            alt="secure" 
             className="w-full h-52 object-contain mb-6"

          />

          
        </div>
      </div>
    </div>
  );
}
