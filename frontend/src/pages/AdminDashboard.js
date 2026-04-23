import React, { useState, useEffect } from "react";

export default function AdminDashboard({ onBack, onLogout }) {
  const [wills, setWills] = useState([]);
  const [selectedWill, setSelectedWill] = useState(null);

  useEffect(() => {
    fetchAdminWills();
  }, []);

  const fetchAdminWills = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/admin/wills", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        setWills(await res.json());
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleFreeze = async () => {
    if (!selectedWill || !selectedWill.userId?._id) return alert("Select a will first");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/admin/freeze/${selectedWill.userId._id}`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        alert("Account Frozen for Investigation.");
        fetchAdminWills();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleViewReport = () => {
    if (!selectedWill) return alert("Select a will first");
    alert(`REPORT FOR ${selectedWill.title}\nRisk: ${selectedWill.aiAnalysis?.riskScore}\nFlags: ${(selectedWill.aiAnalysis?.flags||[]).join(', ')}`);
  };

  return (
    <div className="min-h-screen bg-[#f4f7fb] flex">

      {/* SIDEBAR */}
      <div className="w-64 bg-white shadow p-6">
        <h2 className="font-semibold text-lg mb-6">Admin Dashboard</h2>

        <ul className="space-y-5 text-gray-600">
          <li className="flex items-center gap-2 cursor-pointer hover:text-blue-500" onClick={onBack}>🏠 Dashboard</li>
          <li className="text-blue-600 font-medium bg-blue-50 p-2 rounded">
            📄 Pending Wills
          </li>
          <li className="flex items-center gap-2 cursor-pointer">👥 Users</li>
          <li className="flex items-center gap-2 cursor-pointer">📜 Audit Logs</li>
          <li className="flex items-center gap-2 cursor-pointer hover:text-red-500 mt-8" onClick={onLogout}>⏻ Logout</li>
        </ul>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-8">
        <button onClick={onBack} className="mb-4 text-blue-500 hover:underline">&larr; Back to Dashboard</button>
        <h2 className="text-xl font-semibold mb-4">
          Pending Wills for Approval
        </h2>

        <div className="grid grid-cols-3 gap-6">

          {/* TABLE */}
          <div className="col-span-2 bg-white rounded-xl shadow p-4">

            <input
              placeholder="Search..."
              className="w-full border px-3 py-2 rounded mb-4"
            />

            <table className="w-full text-sm">
              <thead className="text-gray-500">
                <tr>
                  <th className="text-left py-2">User</th>
                  <th className="text-left">Status</th>
                  <th className="text-left">Frozen</th>
                  <th className="text-left">Risk</th>
                  <th className="text-left">Hash</th>
                </tr>
              </thead>

              <tbody className="text-gray-700">
                {wills.map((will, i) => (
                  <tr 
                    key={i} 
                    className={`border-t cursor-pointer hover:bg-gray-50 ${selectedWill?._id === will._id ? 'bg-blue-50' : ''}`}
                    onClick={() => setSelectedWill(will)}
                  >
                    <td className="py-3">{will.userId?.name || 'Unknown'}</td>

                    <td>
                      <span className={`px-2 py-1 rounded ${will.status === 'draft' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                        {will.status}
                      </span>
                    </td>
                    <td>{will.userId?.isFrozen ? '❄️ Yes' : 'No'}</td>
                    <td><span className={will.aiAnalysis?.riskScore > 50 ? 'text-red-500 font-bold' : ''}>{will.aiAnalysis?.riskScore || 0}</span></td>
                    <td className="text-xs">{will.blockchainHash?.substring(0,8) || 'N/A'}...</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-4 flex gap-3">
              <button 
                onClick={handleViewReport}
                className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                disabled={!selectedWill}
              >
                View Report
              </button>
              <button 
                onClick={handleFreeze}
                className="border px-4 py-2 rounded text-red-600 hover:bg-red-50 disabled:opacity-50"
                disabled={!selectedWill}
              >
                Freeze Account
              </button>
            </div>

          </div>

          {/* RIGHT PANEL */}
          <div className="space-y-5">

            <div className="bg-white p-4 rounded-xl shadow">
              <h3 className="font-semibold mb-2">Integrity Verification</h3>
              <p className="text-green-600 font-medium">
                ✔ Blockchain Verified
              </p>
              <p className="text-xs text-gray-500 mt-2">
                SHA-256 Tamper Proof
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow">
              <h3 className="font-semibold mb-2">Audit Logs</h3>

              <p className="text-sm text-gray-600">
                ✔ Admin approved will
              </p>

              <p className="text-sm text-gray-600">
                ⚠ Pending review
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
