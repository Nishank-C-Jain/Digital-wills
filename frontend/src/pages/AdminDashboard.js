import React from "react";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#f4f7fb] flex">

      {/* SIDEBAR */}
      <div className="w-64 bg-white shadow p-6">
        <h2 className="font-semibold text-lg mb-6">Admin Dashboard</h2>

        <ul className="space-y-5 text-gray-600">
          <li>🏠 Dashboard</li>
          <li className="text-blue-600 font-medium bg-blue-50 p-2 rounded">
            📄 Pending Wills
          </li>
          <li>👥 Users</li>
          <li>📜 Audit Logs</li>
        </ul>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-8">

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
                  <th>Status</th>
                  <th>Hash</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody className="text-gray-700">
                {["Aarav Sharma", "Priya Kapoor", "Aman Gupta"].map((name, i) => (
                  <tr key={i} className="border-t">
                    <td className="py-3">{name}</td>

                    <td>
                      <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                        Pending
                      </span>
                    </td>

                    <td className="text-xs">5db03e...941</td>
                    <td>Apr 24, 2024</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-4 flex gap-3">
              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                Analyze Again
              </button>
              <button className="border px-4 py-2 rounded">
                Download Report
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
