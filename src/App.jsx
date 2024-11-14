import React, { useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import "./App.css"
import jwt_decode from "jwt-decode";
const App = () => {
  // Google Login Handler
  // const handleGoogleLogin = (response) => {
  //   console.log("Google response:", response);
  // };

  const handleGoogleLogin = (response) => {
    console.log("response befor decode",response);
    
    if (response.credential) {
      const decodedToken = jwt_decode(response.credential);
      console.log("response after Decoded Token:", decodedToken);
    } else {
      console.error("No credentials found in the response.");
    }
  };


  const handleGoogleFailure = (error) => {
    console.error("Google login failed:", error);
  };

  // Facebook SDK Initialization
  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "430328513204112",
        cookie: true,
        xfbml: true,
        version: "v12.0",
      });
    };
  }, []);

  // Facebook Login Handler
  const handleFacebookLogin = () => {
    window.FB.login((response) => {
      if (response.authResponse) {
        console.log("Facebook response:", response);
        window.FB.api("/me", { fields: "name,email" }, (userInfo) => {
          console.log("Facebook user info:", userInfo);
        });
      } else {
        console.log("User cancelled login or did not fully authorize.");
      }
    }, { scope: "email" });
  };

  // LinkedIn Login Handler
  const handleLinkedInLogin = () => {
    window.IN.User.authorize(() => {
      window.IN.API.Profile("me").fields("id", "firstName", "lastName", "emailAddress").result((data) => {
        console.log("LinkedIn user data:", data);
      });
    });
  };

  return (
    <GoogleOAuthProvider clientId="896073157246-fn2uaapplbtor03ih369lbr89ne7vod4.apps.googleusercontent.com">
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
        <h1>Social Login</h1>

        {/* Google Login Button */}
        <GoogleLogin onSuccess={handleGoogleLogin} onFailure={handleGoogleFailure} />

        {/* Facebook Login Button */}
        <button onClick={handleFacebookLogin} style={{ padding: "10px 20px", fontSize: "16px" }}>
          Login with Facebook
        </button>

        {/* LinkedIn Login Button */}
        <button onClick={handleLinkedInLogin} style={{ padding: "10px 20px", fontSize: "16px" }}>
          Login with LinkedIn
        </button>
      </div>
    </GoogleOAuthProvider>
  );
};

export default App;