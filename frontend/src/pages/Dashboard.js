import React from "react";
import { BarChart3, Users, ShieldCheck, FileText } from "lucide-react";

export default function Dashboard() {
  const user = { name: "User" };

  const cards = [
    { title: "Total Wills", value: "3", icon: <FileText /> },
    { title: "Assets", value: "₹12,00,000", icon: <BarChart3 /> },
    { title: "Beneficiaries", value: "5", icon: <Users /> },
    { title: "Risk Score", value: "72 / 100", icon: <ShieldCheck /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eef2ff] via-[#f8fbff] to-[#e6ecff] flex">

      {/* SIDEBAR */}
      <div className="w-64 bg-white/70 backdrop-blur-xl shadow-xl p-6 rounded-r-3xl">
        <h2 className="text-xl font-bold text-blue-600 mb-8">Digital Will</h2>

        <ul className="space-y-4 text-gray-600">
          <li className="font-medium text-blue-600">Dashboard</li>
          <li className="hover:text-blue-500 cursor-pointer">My Wills</li>
          <li className="hover:text-blue-500 cursor-pointer">Beneficiaries</li>
          <li className="hover:text-blue-500 cursor-pointer">Security</li>
          <li className="hover:text-blue-500 cursor-pointer">Activity</li>
        </ul>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-700">Dashboard</h1>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">
              Welcome, <strong>{user.name}</strong>
            </span>

            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center rounded-full shadow-md">
              {user.name.charAt(0)}
            </div>
          </div>
        </div>

        {/* KPI CARDS */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {cards.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-5 shadow-lg hover:shadow-2xl transition group"
            >
              <div className="flex justify-between items-center mb-3">
                <p className="text-sm text-gray-500">{item.title}</p>
                <div className="text-blue-500 group-hover:scale-110 transition">
                  {item.icon}
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-700">{item.value}</h2>
            </div>
          ))}
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 gap-6">

          {/* WILL CARD */}
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Digital Wills</h3>
            <button className="bg-white text-blue-600 px-4 py-2 rounded-lg mb-4 font-medium hover:scale-105 transition">
              + Create New Will
            </button>
            <ul className="space-y-2 text-sm">
              <li>Will #1 - Draft</li>
              <li>Will #2 - Encrypted</li>
              <li>Will #3 - Stored</li>
            </ul>
          </div>

          {/* BENEFICIARIES */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="font-semibold text-gray-700 mb-4">Beneficiaries</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>Amit - 40%</li>
              <li>Riya - 30%</li>
              <li>Rahul - 30%</li>
            </ul>
          </div>

          {/* AI */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="font-semibold text-gray-700 mb-4">AI Insights</h3>
            <p className="text-green-600 font-medium">Sentiment: Safe</p>
            <p className="text-yellow-600 font-medium">Fraud: No anomalies</p>
          </div>

          {/* SECURITY */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="font-semibold text-gray-700 mb-4">Security</h3>
            <p className="text-green-600">✔ Encrypted</p>
            <p className="text-gray-600">IPFS: QmX123...</p>
            <p className="text-gray-600">Tx: 0xABC...</p>
          </div>

          {/* ALERT */}
          <div className="bg-green-50 border border-green-200 rounded-2xl p-6 col-span-2">
            <h3 className="font-semibold text-green-700 mb-2">System Status</h3>
            <p className="text-green-600">All systems secure. No alerts detected.</p>
          </div>

        </div>
      </div>
    </div>
  );
}
