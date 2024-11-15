import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import "./App.css";

// Helper function to decode a JWT
const decodeJwt = (token) => {
  try {
    const base64Url = token.split(".")[1]; // Get the payload part of the token
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload); // Parse the JSON payload
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

const App = () => {
  const handleGoogleLogin = (response) => {
    console.log("Google response before decode:", response);

    if (response.credential) {
      const decodedToken = decodeJwt(response.credential); // Use manual decoding
      if (decodedToken) {
        console.log("Decoded Google Token:", decodedToken);
      }
    } else {
      console.error("Google response does not contain a credential.");
    }
  };

  const handleGoogleFailure = (error) => {
    console.error("Google login failed:", error);
  };

  return (
    <GoogleOAuthProvider clientId="896073157246-fn2uaapplbtor03ih369lbr89ne7vod4.apps.googleusercontent.com">
      <div className="container">
        <h1>Social Login</h1>

        {/* Google Login Button */}
        <GoogleLogin onSuccess={handleGoogleLogin} onError={handleGoogleFailure} />
      </div>
    </GoogleOAuthProvider>
  );
};

export default App;
