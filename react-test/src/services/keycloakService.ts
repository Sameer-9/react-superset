// src/services/keycloakService.js
import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://localhost:8080", // Replace with your Keycloak server URL
  realm: "test", // Replace with your Keycloak realm
  clientId: "react-test", // Replace with your Keycloak client ID
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const initKeycloak = (onAuthenticatedCallback: any) => {
  keycloak
    .init({
      onLoad: "login-required",
      checkLoginIframe: false, // Add this line
      pkceMethod: "S256", // Optional: Add this for PKCE support
    })
    .then((authenticated) => {
      if (authenticated) {
        onAuthenticatedCallback();
      } else {
        console.warn("Not authenticated!");
        keycloak.login();
      }
    })
    .catch((error) => {
      console.error("Failed to initialize Keycloak:", error);
    });
};

export const doLogin = keycloak.login;

export const doLogout = keycloak.logout;

export const getToken = () => keycloak.token;

export const isLoggedIn = () => !!keycloak.token;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateToken = (successCallback: any) =>
  keycloak.updateToken(5).then(successCallback).catch(doLogin);

export const getUserInfo = () => keycloak.loadUserInfo();

// Function to get the Keycloak token
export const getKeycloakToken = () => keycloak.token;

export default keycloak;