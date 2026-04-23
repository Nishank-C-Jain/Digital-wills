import React, { useState } from "react";
import { calculateRisk } from "../utils/riskScore";
import { detectFraud } from "../utils/fraudDetection";
import { analyzeSentiment } from "../utils/sentiment";

export default function AnalyzeWill({ onBack, onLogout, goToBeneficiary }) {
  const user = { name: "User" };

  const [willText] = useState(
    "I, Aarav Sharma, a resident of Mumbai, India, declare this to be my last will and testament. Recently, I have made several changes to my will. I appoint Aman Gupta as the executor of my will. I leave my house in Bandra to my wife, but disinherit my children ⚠️"
  );
  
  const sentiment = analyzeSentiment(willText);
  
  // Mock beneficiaries to run anomaly detection against
  const [beneficiaries] = useState([
    { name: "Priya Sharma", share: 85 },
    { name: "Aman Gupta", share: 10 }
  ]);

  const fraudWarnings = detectFraud(beneficiaries);

  const riskScore = calculateRisk(sentiment, fraudWarnings);

  const getRiskLabel = (score) => {
    if (score >= 70) return "High Risk Detected";
    if (score >= 40) return "Moderate Risks Detected";
    return "Low Risk Detected";
  };
  const getRiskColor = (score) => {
    if (score >= 70) return "text-red-500";
    if (score >= 40) return "text-orange-500";
    return "text-green-500";
  };

  return (
    <div className="min-h-screen bg-[#f4f7fb]">

      {/* 🔷 NAVBAR */}
      <div className="bg-white shadow-sm px-6 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-blue-500 rounded-full"></div>
          <h1 className="font-semibold text-gray-700 text-lg">
            AI Will Analysis Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-5">
          <div className="relative text-lg">
            🔔
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
              1
            </span>
          </div>

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
            <li className="flex items-center gap-2 cursor-pointer hover:text-blue-500" onClick={onBack}>🏠 Dashboard</li>
            <li className="flex items-center gap-2 text-blue-600 font-medium bg-blue-50 p-2 rounded">
              📊 Analyze Will
            </li>
            <li className="flex items-center gap-2 cursor-pointer hover:text-blue-500" onClick={goToBeneficiary}>👥 Beneficiaries</li>
            <li className="flex items-center gap-2 cursor-pointer hover:text-red-500" onClick={onLogout}>⏻ Logout</li>
          </ul>
        </div>

        {/* 🔷 MAIN */}
        <div className="flex-1 p-8">

          {/* SEARCH BAR */}
          <input
            placeholder="Search..."
            className="w-full mb-6 border rounded-lg px-4 py-2 text-sm bg-white shadow-sm"
          />

          <div className="grid grid-cols-3 gap-8">

            {/* 🔹 LEFT (WILL TEXT) */}
            <div className="col-span-2 bg-white rounded-2xl shadow p-6">

              <h2 className="text-lg font-semibold mb-4">
                Analyzing Will
              </h2>

              <p className="mb-3 text-gray-700 bg-gray-50 p-4 rounded-lg border">
                {willText}
              </p>

              <div className="bg-gray-50 border rounded-lg p-3 mt-4 text-sm text-gray-600 flex items-center gap-2">
                {sentiment === "Negative" ? "⚠️ Possible emotional distress detected." : "✅ Will language appears normal."}
              </div>

              {/* ACTION BUTTONS */}
              <div className="mt-6 flex gap-4">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg shadow">
                  Analyze Again
                </button>

                <button className="border px-5 py-2 rounded-lg hover:bg-gray-50">
                  Download Report
                </button>
              </div>
            </div>

            {/* 🔹 RIGHT PANEL */}
            <div className="space-y-6">

              {/* RISK SCORE */}
              <div className="bg-white rounded-2xl shadow p-5 text-center">
                <h3 className="text-sm font-semibold mb-3">Risk Score</h3>

                <div className={`text-3xl font-bold ${getRiskColor(riskScore)}`}>
                  {riskScore}%
                </div>

                <p className="text-sm text-gray-500">
                  {getRiskLabel(riskScore)}
                </p>
              </div>

              {/* SENTIMENT */}
              <div className="bg-white rounded-2xl shadow p-5">
                <h3 className="text-sm font-semibold mb-3">
                  Sentiment Analysis
                </h3>

                <div className="mb-2">
                  <div className="flex justify-between text-xs">
                    <span>Positive</span>
                    <span>25%</span>
                  </div>
                  <div className="bg-gray-200 h-2 rounded">
                    <div className="bg-green-500 h-2 rounded w-[25%]"></div>
                  </div>
                </div>

                <div className="mb-2">
                  <div className="flex justify-between text-xs">
                    <span>Neutral</span>
                    <span>30%</span>
                  </div>
                  <div className="bg-gray-200 h-2 rounded">
                    <div className="bg-gray-400 h-2 rounded w-[30%]"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs">
                    <span>Negative</span>
                    <span className="text-red-500">45%</span>
                  </div>
                  <div className="bg-gray-200 h-2 rounded">
                    <div className="bg-red-500 h-2 rounded w-[45%]"></div>
                  </div>
                </div>
              </div>

              {/* ALERT CARDS */}
              {fraudWarnings.map((warning, idx) => (
                <div key={idx} className="bg-orange-100 p-4 rounded-xl text-sm mb-4">
                  ⚠️ {warning}
                </div>
              ))}

            </div>

          </div>

          {/* BACK */}
          <button
            onClick={onBack}
            className="mt-6 text-blue-500 hover:underline"
          >
            ← Back to Dashboard
          </button>

        </div>
      </div>
    </div>
  );
}