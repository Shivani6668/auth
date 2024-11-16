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















import React, { useEffect } from 'react';
import { LoginSocialFacebook } from 'reactjs-social-login';
import { FacebookLoginButton } from 'react-social-login-buttons';

function App() {
  useEffect(() => {
    // Ensure the Facebook SDK is loaded and initialized
    window.fbAsyncInit = function() {
      window.FB.init({
        appId: '1082757606891954',
        cookie: true,
        xfbml: true,
        version: 'v15.0'
      });
    };

    // Load the Facebook SDK asynchronously
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }, []);

  return (
    <>
      <LoginSocialFacebook
        appId="1082757606891954"
        onResolve={(response) => {
          console.log(response);
        }}
        onReject={(error) => {
          console.log(error);
        }}
      >
        <FacebookLoginButton />
      </LoginSocialFacebook>
    </>
  );
}

export default App;
