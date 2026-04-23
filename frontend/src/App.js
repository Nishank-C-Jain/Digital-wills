import React, { useState } from "react";
import AuthPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import CreateWill from "./pages/CreateWill";
import AnalyzeWill from "./pages/AnalyzeWill";
import AdminDashboard from "./pages/AdminDashboard";
import DeathVerification from "./pages/DeathVerification";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [page, setPage] = useState("dashboard");
  // pages:
  // "dashboard" | "create" | "analyze" | "admin" | "verify"

  // 🔴 LOGIN
  if (!isLoggedIn) {
    return <AuthPage onLogin={() => setIsLoggedIn(true)} />;
  }

  // 🟣 CREATE WILL
  if (page === "create") {
    return (
      <CreateWill
        onSubmit={() => setPage("analyze")}
        onBack={() => setPage("dashboard")}
      />
    );
  }

  // 🟢 ANALYZE
  if (page === "analyze") {
    return (
      <AnalyzeWill
        onBack={() => setPage("dashboard")}
      />
    );
  }

  // 🟠 ADMIN DASHBOARD
  if (page === "admin") {
    return <AdminDashboard />;
  }

  // 🔵 DEATH VERIFICATION
  if (page === "verify") {
    return <DeathVerification />;
  }

  // 🔵 DEFAULT DASHBOARD
  return (
    <Dashboard
      goToCreateWill={() => setPage("create")}
      goToAdmin={() => setPage("admin")}
      goToVerify={() => setPage("verify")}
    />
  );
}

export default App;
