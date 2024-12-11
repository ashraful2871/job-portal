import React from "react";
import useAuth from "../../customHooks/UseAuth";

const GoogleLogin = () => {
  const { googleLogin } = useAuth();
  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div>
      <div className="divider">or</div>
      <button onClick={handleGoogleLogin} className="text-center p-3">
        google
      </button>
    </div>
  );
};

export default GoogleLogin;
