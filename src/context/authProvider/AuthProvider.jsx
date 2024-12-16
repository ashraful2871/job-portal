import React, { useEffect, useState } from "react";
import AuthContext from "../AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/firebase.init";
import axios from "axios";

const AuthProvider = ({ children }) => {
  const provider = new GoogleAuthProvider();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //sign IN
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //google login
  const googleLogin = () => {
    return signInWithPopup(auth, provider);
  };

  //sign out

  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log(currentUser?.email);
      if (currentUser?.email) {
        const user = { email: currentUser?.email };

        axios
          .post("https://job-portal-ebon-zeta.vercel.app/jwt", user, {
            withCredentials: true,
          })
          .then((res) => {
            console.log("login", res.data);
            setLoading(false);
          });
      } else {
        axios
          .post(
            "https://job-portal-ebon-zeta.vercel.app/logout",
            {},
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            console.log("logout", res.data);
            setLoading(false);
          });
      }
    });

    () => {
      return unSub;
    };
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    signInUser,
    signOutUser,
    googleLogin,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
