import React, { useState, useEffect } from "react";

export default function DeathVerification({ onBack, onLogout, goToCreateWill, goToBeneficiary }) {
  const [wills, setWills] = useState([]);
  const [selectedWill, setSelectedWill] = useState(null);

  useEffect(() => {
    fetchWills();
  }, []);

  const fetchWills = async () => {
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

  const handleVerify = async () => {
    if (!selectedWill) return alert("Select a will first");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/wills/${selectedWill._id}/verify-death`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      alert(data.msg || "Verified successfully");
      fetchWills();
    } catch (err) {
      console.error(err);
    }
  };

  const handleManualReview = async () => {
    if (!selectedWill) return alert("Select a will first");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/wills/${selectedWill._id}/status`, {
        method: "PUT",
        headers: { 
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status: "pending_review" })
      });
      const data = await res.json();
      alert(data.msg || "Status updated to pending review");
      fetchWills();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7fb] flex">

      {/* SIDEBAR */}
      <div className="w-64 bg-white shadow p-6">
        <h2 className="font-semibold text-lg mb-6">Execution Panel</h2>

        <ul className="space-y-5 text-gray-600">
          <li className="flex items-center gap-2 cursor-pointer hover:text-blue-500" onClick={onBack}>🏠 Dashboard</li>
          <li className="text-blue-600 font-medium bg-blue-50 p-2 rounded">
            ⚰ Death Verification
          </li>
          <li className="flex items-center gap-2 cursor-pointer hover:text-blue-500" onClick={goToBeneficiary}>👥 Claim Assets</li>
          <li className="flex items-center gap-2 cursor-pointer hover:text-red-500 mt-8" onClick={onLogout}>⏻ Logout</li>
        </ul>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-8">
        <button onClick={onBack} className="mb-4 text-blue-500 hover:underline">&larr; Back to Dashboard</button>
        <h2 className="text-xl font-semibold mb-4">
          Verify Decentralized Oracles
        </h2>

        <div className="grid grid-cols-2 gap-6">

          {/* TABLE */}
          <div className="bg-white rounded-xl shadow p-4">

            <table className="w-full text-sm">
              <thead className="text-gray-500 border-b">
                <tr>
                  <th className="text-left py-2">Will Creator</th>
                  <th className="text-left">Status</th>
                </tr>
              </thead>

              <tbody className="text-gray-700">
                {wills.map((will, i) => (
                  <tr 
                    key={i} 
                    className={`border-b cursor-pointer hover:bg-gray-50 ${selectedWill?._id === will._id ? 'bg-blue-50' : ''}`}
                    onClick={() => setSelectedWill(will)}
                  >
                    <td className="py-3">{will.userId?.name || 'Unknown'}</td>
                    <td>
                      <span className={`px-2 py-1 rounded ${will.status === 'executed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {will.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-6 border-t pt-4">
              <p className="text-sm text-gray-500 mb-3">Action for selected will:</p>
              <div className="flex gap-3">
                <button 
                  onClick={handleVerify}
                  className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                  disabled={!selectedWill}
                >
                  Verify via Blockchain
                </button>
                <button 
                  onClick={handleManualReview}
                  className="border px-5 py-2 rounded hover:bg-gray-50 disabled:opacity-50"
                  disabled={!selectedWill}
                >
                  Request Manual Review
                </button>
              </div>
            </div>

          </div>

          {/* DETAILS */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-semibold mb-4">Verification Sources</h3>
            <p className="text-sm text-gray-600 mb-4">The following endpoints will be queried to confirm the status of the selected user.</p>

            <ul className="space-y-4">
              <li className="flex items-center justify-between p-3 border rounded">
                <span>Government API (Mock)</span>
                <span className="text-yellow-600 bg-yellow-100 px-2 py-1 text-xs rounded">Pending</span>
              </li>
              <li className="flex items-center justify-between p-3 border rounded">
                <span>Hospital Records</span>
                <span className="text-yellow-600 bg-yellow-100 px-2 py-1 text-xs rounded">Pending</span>
              </li>
              <li className="flex items-center justify-between p-3 border rounded">
                <span>Smart Contract Oracle</span>
                <span className="text-green-600 bg-green-100 px-2 py-1 text-xs rounded">Ready</span>
              </li>
            </ul>

            <div className="mt-6 bg-gray-50 p-4 rounded text-xs text-gray-500">
              <p>Executing a will is irreversible. Once verified via the blockchain smart contract, all attached assets and smart contract vaults will be unlocked for the designated beneficiaries.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}