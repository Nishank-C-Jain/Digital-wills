import React from "react";

export default function DeathVerification({ onBack, onLogout, goToCreateWill, goToBeneficiary }) {
  return (
    <div className="min-h-screen bg-[#f4f7fb] flex">

      {/* SIDEBAR */}
      <div className="w-64 bg-white shadow p-6">
        <h2 className="font-semibold text-lg mb-6">
          Digital Will System
        </h2>

        <ul className="space-y-5 text-gray-600">
          <li className="flex items-center gap-2 cursor-pointer hover:text-blue-500" onClick={onBack}>🏠 Dashboard</li>
          <li className="flex items-center gap-2 cursor-pointer hover:text-blue-500" onClick={goToCreateWill}>✏️ Create/Edit Will</li>
          <li className="text-blue-600 font-medium bg-blue-50 p-2 rounded">
            ✔ Death Verification
          </li>
          <li className="flex items-center gap-2 cursor-pointer hover:text-blue-500" onClick={goToBeneficiary}>👥 Beneficiaries</li>
          <li className="flex items-center gap-2 cursor-pointer hover:text-red-500 mt-8" onClick={onLogout}>⏻ Logout</li>
        </ul>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-8">
        <button onClick={onBack} className="mb-4 text-blue-500 hover:underline">&larr; Back to Dashboard</button>
        <h2 className="text-xl font-semibold mb-4">
          Verify Death & Grant Access
        </h2>

        <div className="grid grid-cols-3 gap-6">

          {/* LEFT */}
          <div className="col-span-2 bg-white p-6 rounded-xl shadow">

            <h3 className="font-semibold mb-3">Deceased Details</h3>
            <div className="border p-3 rounded mb-4 flex justify-between">
              <span>Aarav Sharma (Mumbai)</span>
              <span className="text-yellow-600">Pending</span>
            </div>

            <h3 className="font-semibold mb-3">
              Document Verification
            </h3>

            <div className="space-y-2 mb-4">
              <p>✔ Death Certificate - Uploaded</p>
              <p>✔ ID Proof - Uploaded</p>
            </div>

            <h3 className="font-semibold mb-3">
              Beneficiaries
            </h3>

            <div className="border p-3 rounded mb-2 flex justify-between">
              <span>Priya Sharma (Wife)</span>
              <span>50%</span>
            </div>

            <div className="border p-3 rounded mb-4 flex justify-between">
              <span>Ananya Sharma (Daughter)</span>
              <span>50%</span>
            </div>

            <div className="flex gap-3">
              <button className="bg-blue-500 text-white px-5 py-2 rounded">
                Approve
              </button>
              <button className="border px-5 py-2 rounded">
                Reject
              </button>
            </div>

          </div>

          {/* RIGHT */}
          <div className="space-y-5">

            {/* 🔥 UPDATED CARD WITH IMAGE */}
            <div className="bg-white p-4 rounded-xl shadow text-center">

              {/* IMAGE */}
              <img
                src="/image.png"
                alt="verification"
                className="w-full h-32 object-contain mb-3"
              />

              {/* TEXT */}
              <p className="mb-2 text-sm text-gray-600">
                Verification in progress...
              </p>

              {/* PROGRESS BAR */}
              <div className="bg-gray-200 h-2 rounded">
                <div className="bg-blue-500 h-2 w-2/3 rounded"></div>
              </div>
            </div>

            {/* SECURITY CARD */}
            <div className="bg-white p-4 rounded-xl shadow">
              <p>✔ Secure</p>
              <p>✔ Data Encrypted</p>
              <p>✔ Verified Records</p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}