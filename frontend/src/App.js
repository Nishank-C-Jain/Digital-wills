import React, { useState } from "react";
import AuthPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import CreateWill from "./pages/CreateWill";
import AnalyzeWill from "./pages/AnalyzeWill";
import AdminDashboard from "./pages/AdminDashboard";
import DeathVerification from "./pages/DeathVerification";
import Beneficiary from "./pages/Beneficiary";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [page, setPage] = useState("dashboard");
  // pages:
  // "dashboard" | "create" | "analyze" | "admin" | "verify"

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setPage("dashboard");
  };

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
        onLogout={handleLogout}
        goToBeneficiary={() => setPage("beneficiary")}
      />
    );
  }

  // 🟢 ANALYZE
  if (page === "analyze") {
    return (
      <AnalyzeWill
        onBack={() => setPage("dashboard")}
        onLogout={handleLogout}
        goToBeneficiary={() => setPage("beneficiary")}
      />
    );
  }

  // 🟠 ADMIN DASHBOARD
  if (page === "admin") {
    return (
      <AdminDashboard 
        onBack={() => setPage("dashboard")}
        onLogout={handleLogout}
      />
    );
  }

  // 🔵 DEATH VERIFICATION
  if (page === "verify") {
    return (
      <DeathVerification 
        onBack={() => setPage("dashboard")} 
        onLogout={handleLogout} 
        goToCreateWill={() => setPage("create")}
        goToBeneficiary={() => setPage("beneficiary")}
      />
    );
  }

  // 🟡 BENEFICIARY
  if (page === "beneficiary") {
    return (
      <Beneficiary 
        onBack={() => setPage("dashboard")} 
        onLogout={handleLogout}
      />
    );
  }

  // 🔵 DEFAULT DASHBOARD
  return (
    <Dashboard
      goToCreateWill={() => setPage("create")}
      goToAnalyze={() => setPage("analyze")}
      goToAdmin={() => setPage("admin")}
      goToVerify={() => setPage("verify")}
      goToBeneficiary={() => setPage("beneficiary")}
      onLogout={handleLogout}
    />
  );
}

export default App;
