// src/App.js
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {
  initKeycloak,
  isLoggedIn,
  doLogin,
  doLogout,
  getUserInfo,
} from "./services/keycloakService";
import Dashboard from "./components/Dashboard";

function App() {
  const [keycloakInitialized, setKeycloakInitialized] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [, setUserInfo] = useState<any>(null);

  useEffect(() => {
    console.log("Initializing Keycloak...");
    initKeycloak(() => {
      setKeycloakInitialized(true);
      getUserInfo().then((info) => {
        console.log("User info:", info);
        setUserInfo(info)
      });
    });

    return () => {
      console.log("Cleaning up Keycloak...");
      setKeycloakInitialized(false);
    }
  }, []);

  if (!keycloakInitialized) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn() ? (
                <Navigate to="/dashboard" />
              ) : (
                <button onClick={() => doLogin()}>Login with Keycloak</button>
              )
            }
          />
          <Route
            path="/dashboard"
            element={isLoggedIn() ? <Dashboard /> : <Navigate to="/" />}
          />
        </Routes>
        <button onClick={() => doLogout()}>Logout</button>
      </div>
    </Router>
  );
}

export default App;
