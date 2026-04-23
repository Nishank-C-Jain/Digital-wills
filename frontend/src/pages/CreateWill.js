import React from "react";

export default function CreateWill({ onBack }) {
  const user = { name: "User" };

  return (
    <div className="min-h-screen bg-[#f4f7fb]">

      {/* 🔷 NAVBAR */}
      <div className="bg-white shadow-sm px-6 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src="/react-icon.png" alt="logo" className="w-6 h-6" />
          <h1 className="font-semibold text-gray-700 text-lg">
            Digital Will Management System
          </h1>
        </div>

        <div className="flex items-center gap-5">
          {/* Notification */}
          <div className="relative text-lg">
            🔔
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
              1
            </span>
          </div>

          {/* User */}
          <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-md">
            <div className="w-7 h-7 bg-gray-300 rounded-full"></div>
            <span className="text-sm font-medium">{user.name}</span>
          </div>
        </div>
      </div>

      <div className="flex">

        {/* 🔷 SIDEBAR */}
        <div className="w-64 bg-white shadow-sm p-6">
          <ul className="space-y-6 text-gray-600">
            <li className="flex items-center gap-2 cursor-pointer">
              🏠 Dashboard
            </li>

            <li className="flex items-center gap-2 text-blue-600 font-medium bg-blue-50 p-2 rounded">
              ✏️ Create/Edit Will
            </li>

            <li className="flex items-center gap-2 cursor-pointer">
              👥 Beneficiaries
            </li>

            <li className="flex items-center gap-2 cursor-pointer">
              ⏻ Logout
            </li>
          </ul>
        </div>

        {/* 🔷 MAIN */}
        <div className="flex-1 p-8">

          {/* Breadcrumb */}
          <p className="text-sm text-gray-500 mb-5">
            Dashboard &gt;{" "}
            <span className="text-gray-700 font-medium">
              Create/Edit Will
            </span>
          </p>

          <div className="grid grid-cols-3 gap-8">

            {/* LEFT SECTION */}
            <div className="col-span-2 bg-white rounded-2xl shadow p-6">

              <h2 className="text-lg font-semibold mb-4">
                Create/Edit Your Will
              </h2>

              {/* Will Content */}
              <p className="text-sm font-medium mb-2">Will Content</p>

              <textarea
                className="w-full border rounded-lg p-4 text-sm bg-gray-50 h-32 focus:ring-2 focus:ring-blue-200 outline-none"
                defaultValue="I, Aarav Sharma, a resident of Mumbai, India, declare this to be my last will and testament..."
              />

              <p className="text-xs text-gray-500 mt-2">
                Words: 42 | Characters: 245
              </p>

              {/* Beneficiary */}
              <h3 className="text-sm font-semibold mt-6 mb-3">
                Beneficiary Details
              </h3>

              <div className="grid grid-cols-2 gap-4">

                {/* Name */}
                <div className="flex items-center border rounded-md px-3 py-2 bg-white">
                  <span className="text-gray-400 mr-2">👤</span>
                  <input
                    type="text"
                    defaultValue="Priya Sharma"
                    className="w-full outline-none text-sm"
                  />
                </div>

                {/* Relation */}
                <select className="border rounded-md px-3 py-2 text-sm bg-white">
                  <option>Wife</option>
                  <option>Mother</option>
                  <option>Father</option>
                  <option>Son</option>
                  <option>Daughter</option>
                  <option>Brother</option>
                  <option>Sister</option>
                </select>

                {/* Email */}
                <div className="flex items-center border rounded-md px-3 py-2 bg-white">
                  <span className="text-gray-400 mr-2">✉️</span>
                  <input
                    type="email"
                    defaultValue="priya.sharma@gmail.com"
                    className="w-full outline-none text-sm"
                  />
                </div>

                {/* Role */}
                <select className="border rounded-md px-3 py-2 text-sm bg-white">
                  <option>Daughter</option>
                  <option>Son</option>
                  <option>Nominee</option>
                </select>

              </div>

              {/* Add */}
              <div className="flex justify-end mt-4">
                <button className="border px-4 py-2 rounded text-sm hover:bg-gray-50">
                  Add Beneficiary
                </button>
              </div>

              {/* Submit */}
              <div className="mt-6 text-right">
                <button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-lg shadow hover:scale-105 transition">
                  Submit Will
                </button>
              </div>
            </div>

            {/* RIGHT SECTION */}
            <div className="space-y-6">

              {/* AI Card */}
              <div className="bg-white rounded-2xl shadow p-4 text-center">
                <img
                  src="/bot.avif"
                  alt="ai"
                  className="w-full h-32 object-contain mb-3"
                />
                <p className="text-sm text-gray-600 mb-2">
                  Analyzing your will...
                </p>

                <div className="w-full bg-gray-200 h-2 rounded">
                  <div className="bg-blue-500 h-2 rounded w-1/2"></div>
                </div>
              </div>

              {/* Security Card */}
              <div className="bg-white rounded-2xl shadow p-5 space-y-4">

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 text-green-600 flex items-center justify-center rounded-full">
                    ✔
                  </div>
                  <span className="text-sm">Secure</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full">
                    🔒
                  </div>
                  <span className="text-sm">Data Encrypted</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-indigo-100 text-indigo-600 flex items-center justify-center rounded-full">
                    🌐
                  </div>
                  <span className="text-sm">Blockchain Verified</span>
                </div>

              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}