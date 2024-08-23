// src/components/Dashboard.js
import { useEffect, useState } from "react";
import { getKeycloakToken } from "../services/keycloakService"; // Import the function to get Keycloak token

const Dashboard = () => {
  const [iframeSrc, setIframeSrc] = useState("");
  
  // Define your Superset dashboard URL
  const supersetDashboardUrl = "http://localhost:8088/superset/dashboard/births/"; // Replace with your actual Superset dashboard URL

  useEffect(() => {
    // Fetch the Keycloak token
    const token = getKeycloakToken();
    
    if (token) {
      // Construct the iframe URL with the token for authentication
      setIframeSrc(`${supersetDashboardUrl}?standalone=true&access_token=${token}`);
    }
  }, []);

  if (!iframeSrc) {
    return <div>Loading dashboard...</div>;
  }

  return (
    <div style={{ width: "100%", height: "100vh", border: "none" }}>
      <iframe
        title="Superset Dashboard"
        src={iframeSrc}
        style={{ width: "100%", height: "100%", border: "none" }}
      />
    </div>
  );
};

export default Dashboard;
