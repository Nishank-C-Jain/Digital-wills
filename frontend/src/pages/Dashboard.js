import React, { useState, useEffect } from "react";
import { BarChart3, Users, ShieldCheck, FileText } from "lucide-react";

export default function Dashboard({ goToCreateWill, goToAnalyze, goToAdmin, goToVerify, goToBeneficiary, onLogout }) {
  const user = JSON.parse(localStorage.getItem("user") || '{"name": "User"}');
  const [wills, setWills] = useState([]);

  useEffect(() => {
    const fetchWills = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/wills/all", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setWills(data);
        }
      } catch (err) {
        console.error("Failed to fetch wills", err);
      }
    };
    fetchWills();
  }, []);

  const cards = [
    { title: "Total Wills", value: wills.length.toString(), icon: <FileText /> },
    { title: "Assets", value: "₹12,00,000", icon: <BarChart3 /> },
    { title: "Beneficiaries", value: wills.reduce((acc, w) => acc + (w.beneficiaries?.length || 0), 0).toString(), icon: <Users /> },
    { title: "Risk Score", value: "72 / 100", icon: <ShieldCheck /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eef2ff] via-[#f8fbff] to-[#e6ecff] flex">

      {/* SIDEBAR */}
      <div className="w-64 bg-white/70 backdrop-blur-xl shadow-xl p-6 rounded-r-3xl">
        <h2 className="text-xl font-bold text-blue-600 mb-8">Digital Will</h2>

        <ul className="space-y-4 text-gray-600">
          <li className="font-medium text-blue-600">Dashboard</li>
          <li className="hover:text-blue-500 cursor-pointer" onClick={() => goToAnalyze(wills[0]?._id)}>Analyze Will</li>
          <li className="hover:text-blue-500 cursor-pointer" onClick={() => alert("My Wills page coming soon!")}>My Wills</li>
          <li className="hover:text-blue-500 cursor-pointer" onClick={goToBeneficiary}>Beneficiaries</li>
          <div className="pt-4 mt-4 border-t border-gray-200 space-y-4">
            <li className="hover:text-blue-500 cursor-pointer" onClick={goToAdmin}>Admin Panel</li>
            <li className="hover:text-blue-500 cursor-pointer" onClick={goToVerify}>Verify Death</li>
            <li className="hover:text-red-500 text-red-400 cursor-pointer" onClick={onLogout}>Logout</li>
          </div>
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
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Your Digital Wills</h3>
              <button 
                onClick={goToCreateWill}
                className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:scale-105 transition shadow"
              >
                + Create New
              </button>
            </div>
            
            <p className="text-sm text-blue-100 mb-3">Click on a will below to view its full analysis:</p>
            <div className="space-y-3 mt-2 max-h-48 overflow-y-auto pr-2">
              {wills.length === 0 ? (
                <div className="bg-white/10 p-4 rounded-xl text-center border border-white/20">
                  No wills found. Create one above!
                </div>
              ) : (
                wills.map((will, idx) => (
                  <div 
                    key={will._id || idx} 
                    className="bg-white/10 hover:bg-white/20 border border-white/20 p-3 rounded-xl cursor-pointer transition flex justify-between items-center group"
                    onClick={() => goToAnalyze(will._id)}
                  >
                    <div>
                      <h4 className="font-semibold text-white">{will.title}</h4>
                      <p className="text-xs text-blue-100">{will.blockchainHash?.substring(0, 12)}...</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${will.status === "executed" ? "bg-green-500/20 text-green-100" : "bg-yellow-500/20 text-yellow-100"}`}>
                      {will.status.toUpperCase()}
                    </span>
                  </div>
                ))
              )}
            </div>
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
