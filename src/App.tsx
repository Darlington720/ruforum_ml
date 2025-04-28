import { useState } from "react";
import { LoginPage } from "@/pages/login-page";
import { DashboardPage } from "@/pages/dashboard-page";
import { ProjectList } from "@/components/project/project-list";
import { PartnerList } from "@/components/partners/partner-list";
import { ScorecardContent } from "@/components/scorecard/scorecard-content";
import { ReportsContent } from "@/components/reports/reports-content";

import { Toaster } from "@/components/ui/sonner";
import { ROUTES } from "@/lib/constants";
import { Sidebar } from "@/components/dashboard/sidebar";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState(ROUTES.DASHBOARD.slice(1));

  const handleLogin = (email: string, password: string) => {
    // In a real app, this would validate credentials with an API
    if (email && password) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage(ROUTES.DASHBOARD.slice(1));
  };

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "projects":
        return <ProjectList />;
      case "partners":
        return <PartnerList />;
      case "scorecard":
        return <ScorecardContent />;
      case "reports":
        return <ReportsContent />;
      default:
        return (
          <div className="main-content">
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
              <p className="text-muted-foreground">
                RUFORUM Monitoring, Evaluation, and Learning Database
              </p>
            </div>
            <DashboardPage />
          </div>
        );
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <div className="dashboard-container">
          <Sidebar
            onLogout={handleLogout}
            onPageChange={handlePageChange}
            activePage={currentPage}
          />
          <div className="main-content">{renderPage()}</div>
        </div>
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
      <Toaster />
    </>
  );
}

export default App;
