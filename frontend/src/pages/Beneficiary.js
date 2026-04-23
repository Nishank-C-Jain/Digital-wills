import React, { useState, useEffect } from "react";

function Beneficiary({ onBack, onLogout }) {
  const [wills, setWills] = useState([]);
  
  useEffect(() => {
    fetchWills();
  }, []);

  const fetchWills = async () => {
    try {
      const token = localStorage.getItem("token");
      // For demo, just fetch the user's created wills. In real app, fetch wills where user is beneficiary.
      const res = await fetch("http://localhost:5000/api/wills/all", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        setWills(await res.json());
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleClaim = async (willId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/wills/${willId}/claim`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.msg);
      } else {
        alert(`Error: ${data.msg || data.error}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-8">
      <div className="flex gap-4 mb-8">
        <button onClick={onBack} className="text-blue-500 hover:underline">&larr; Back to Dashboard</button>
        <button onClick={onLogout} className="text-red-500 hover:underline">⏻ Logout</button>
      </div>
      <h2 className="text-2xl font-bold mb-4">Beneficiary Access</h2>
      
      {wills.length === 0 && <p>No assets available to claim.</p>}

      <div className="space-y-4">
        {wills.map((will, idx) => (
          <div key={idx} className="border p-4 rounded-xl shadow-sm bg-white">
            <h3 className="font-semibold text-lg">{will.title}</h3>
            <p className="mb-2">Status: <span className={`font-semibold ${will.status === 'executed' ? 'text-green-600' : 'text-yellow-600'}`}>{will.status}</span></p>
            <p className="text-sm text-gray-500 mb-4">Hash: {will.blockchainHash}</p>
            {will.status === 'claimed' ? (
              <button 
                disabled
                className="bg-green-500 text-white px-4 py-2 rounded cursor-not-allowed opacity-80"
              >
                ✅ Assets Claimed
              </button>
            ) : will.status !== 'executed' ? (
              <button 
                onClick={() => alert("You cannot claim these assets yet. The Digital Will has not been legally executed via the Oracles (Death Verification).")}
                className="bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed"
              >
                Claim Assets (Locked)
              </button>
            ) : (
              <button 
                onClick={async () => {
                  await handleClaim(will._id);
                  fetchWills(); // Refresh UI to show claimed status
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 shadow"
              >
                Claim Assets
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Beneficiary;