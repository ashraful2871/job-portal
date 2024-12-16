import axios from "axios";
import { useContext, useEffect } from "react";
import useAuth from "./UseAuth";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const axiosInstance = axios.create({
  baseURL: "https://job-portal-ebon-zeta.vercel.app",
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { signOutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        console.log("error cought in interceptor", err);
        if (err.status === 401 || err.status === 403) {
          console.log("need to logout the user");
          signOutUser()
            .then(() => {
              console.log("logged out user");
              navigate("/login");
            })
            .catch((error) => {
              console.log(error);
            });
        }
        return Promise.reject(err);
      }
    );
  }, []);

  return axiosInstance;
};

export default useAxiosSecure;
