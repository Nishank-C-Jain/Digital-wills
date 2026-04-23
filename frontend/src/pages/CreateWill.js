import React, { useState } from "react";

export default function CreateWill({ onBack, onSubmit, onLogout, goToBeneficiary }) {
  const user = { name: "User" };

  const [willText, setWillText] = useState(
    "I, Aarav Sharma, a resident of Mumbai, India, declare this to be my last will and testament..."
  );
  
  const [beneficiaries, setBeneficiaries] = useState([
    { id: 1, name: "Priya Sharma", relation: "Wife", email: "priya.sharma@gmail.com", role: "Nominee" }
  ]);

  const addBeneficiary = () => {
    setBeneficiaries([
      ...beneficiaries, 
      { id: Date.now(), name: "", relation: "Wife", email: "", role: "Nominee" }
    ]);
  };

  const updateBeneficiary = (index, field, value) => {
    const newBens = [...beneficiaries];
    newBens[index][field] = value;
    setBeneficiaries(newBens);
  };
  
  const removeBeneficiary = (index) => {
    if (beneficiaries.length > 1) {
      setBeneficiaries(beneficiaries.filter((_, i) => i !== index));
    }
  };

  const handleWillSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/wills/create", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": token ? `Bearer ${token}` : "" 
        },
        body: JSON.stringify({
          title: "My Digital Will", // Default title if UI doesn't have one
          content: willText,
          beneficiaries: beneficiaries
        })
      });

      if (response.ok) {
        const data = await response.json();
        // Proceed to analyze page
        onSubmit(data.will._id);
      } else {
        console.error("Failed to save will to DB");
      }
    } catch (err) {
      console.error("Error submitting will:", err);
    }
  };

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
            <li 
              className="flex items-center gap-2 cursor-pointer hover:text-blue-500"
              onClick={onBack}
            >
              🏠 Dashboard
            </li>

            <li className="flex items-center gap-2 text-blue-600 font-medium bg-blue-50 p-2 rounded">
              ✏️ Create/Edit Will
            </li>

            <li 
              className="flex items-center gap-2 cursor-pointer hover:text-blue-500"
              onClick={goToBeneficiary}
            >
              👥 Beneficiaries
            </li>

            <li 
              className="flex items-center gap-2 cursor-pointer hover:text-red-500"
              onClick={onLogout}
            >
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
                value={willText}
                onChange={(e) => setWillText(e.target.value)}
                className="w-full border rounded-lg p-4 text-sm bg-gray-50 h-32 focus:ring-2 focus:ring-blue-200 outline-none"
              />

              <p className="text-xs text-gray-500 mt-2">
                Words: 42 | Characters: 245
              </p>

              {/* Beneficiary */}
              <h3 className="text-sm font-semibold mt-6 mb-3">
                Beneficiary Details
              </h3>

              {beneficiaries.map((ben, index) => (
                <div key={ben.id} className="mb-6 relative bg-gray-50/50 p-4 rounded-lg border border-gray-100">
                  {beneficiaries.length > 1 && (
                    <button 
                      onClick={() => removeBeneficiary(index)}
                      className="absolute -top-2 -right-2 text-red-500 hover:text-red-700 text-xs bg-red-100 rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-sm"
                      title="Remove Beneficiary"
                    >
                      ×
                    </button>
                  )}
                  <div className="grid grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="flex items-center border rounded-md px-3 py-2 bg-white">
                      <span className="text-gray-400 mr-2">👤</span>
                      <input
                        type="text"
                        value={ben.name}
                        onChange={(e) => updateBeneficiary(index, 'name', e.target.value)}
                        placeholder="Full Name"
                        className="w-full outline-none text-sm"
                      />
                    </div>

                    {/* Relation */}
                    <select 
                      value={ben.relation}
                      onChange={(e) => updateBeneficiary(index, 'relation', e.target.value)}
                      className="border rounded-md px-3 py-2 text-sm bg-white"
                    >
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
                        value={ben.email}
                        onChange={(e) => updateBeneficiary(index, 'email', e.target.value)}
                        placeholder="Email Address"
                        className="w-full outline-none text-sm"
                      />
                    </div>

                    {/* Role */}
                    <select 
                      value={ben.role}
                      onChange={(e) => updateBeneficiary(index, 'role', e.target.value)}
                      className="border rounded-md px-3 py-2 text-sm bg-white"
                    >
                      <option>Nominee</option>
                      <option>Daughter</option>
                      <option>Son</option>
                    </select>
                  </div>
                </div>
              ))}

              {/* Add */}
              <div className="flex justify-end mt-4">
                <button 
                  onClick={addBeneficiary}
                  className="border border-blue-200 text-blue-600 px-4 py-2 rounded text-sm hover:bg-blue-50 font-medium"
                >
                  + Add Beneficiary
                </button>
              </div>

              {/* Submit */}
              <div className="mt-6 text-right">
                <button 
                  onClick={handleWillSubmit}
                  className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-lg shadow hover:scale-105 transition"
                >
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