// import React from "react";
// import axios from "axios";
// import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
// import "./App.css";

// // Helper function to decode a JWT
// const decodeJwt = (token) => {
//   try {
//     const base64Url = token.split(".")[1]; // Get the payload part of the token
//     const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
//     const jsonPayload = decodeURIComponent(
//       atob(base64)
//         .split("")
//         .map((c) => {
//           return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
//         })
//         .join("")
//     );
//     return JSON.parse(jsonPayload); // Parse the JSON payload
//   } catch (error) {
//     console.error("Error decoding token:", error);
//     return null;
//   }
// };

// const App = () => {
//   const handleGoogleLogin = async (response) => {
//     console.log("Google response before decode:", response);

//     if (response.credential) {
//       const decodedToken = decodeJwt(response.credential); // Decode Google JWT token
//       if (decodedToken) {
//         console.log("Decoded Google Token:", decodedToken);

//         const { email, name } = decodedToken; // Extract email and name from the token
//         console.log(`Sending email: ${email}, name: ${name}`);

//         try {
//           // Make a POST request to your backend API
//           const res = await axios.post(
//             "https://back-lx0b.onrender.com/api/auth/socialsignup",
//             {
//               email,
//               name,
//             }
//           );

//           console.log("API Response:", res.data);

//           // Handle successful signup/login
//           if (res.data.success) {
//             alert("Login successful!");
//             console.log("User Data:", res.data.user);
//             console.log("Token:", res.data.token);
//           } else {
//             console.error("API Error:", res.data.message);
//             alert(`Login failed: ${res.data.message}`);
//           }
//         } catch (error) {
//           console.error("Error sending data to API:", error.response?.data || error.message);
//           alert("An error occurred while communicating with the server.");
//         }
//       }
//     } else {
//       console.error("Google response does not contain a credential.");
//       alert("Google login failed. Please try again.");
//     }
//   };

//   const handleGoogleFailure = (error) => {
//     console.error("Google login failed:", error);
//     alert("Google login failed. Please try again.");
//   };

//   return (
//     <GoogleOAuthProvider clientId="896073157246-fn2uaapplbtor03ih369lbr89ne7vod4.apps.googleusercontent.com">
//       <div className="container">
//         <h1>Social Login</h1>

//         {/* Google Login Button */}
//         <GoogleLogin onSuccess={handleGoogleLogin} onError={handleGoogleFailure} />
//       </div>
//     </GoogleOAuthProvider>
//   );
// };

// export default App;




















import React, { useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import "./App.css"

const App = () => {
 

  // Facebook SDK Initialization
  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "3780272862214338",
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
    <GoogleOAuthProvider clientId="873209957443-2tsd1s9bchu0fb3dk0mlkb9jko60a08c.apps.googleusercontent.com">
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
        <h1>Social Login</h1>

     
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
