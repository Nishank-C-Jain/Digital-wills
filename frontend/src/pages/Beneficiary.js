import React from "react";

function Beneficiary({ onBack, onLogout }) {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <button onClick={onBack} className="text-blue-500 hover:underline">&larr; Back to Dashboard</button>
        <button onClick={onLogout} className="text-red-500 hover:underline">⏻ Logout</button>
      </div>
      <h2 className="text-2xl font-bold mb-4">Beneficiary Access</h2>
      <p className="mb-4">Status: <span className="text-green-600 font-semibold">Approved</span></p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded">Claim Assets</button>
    </div>
  );
}

export default Beneficiary;