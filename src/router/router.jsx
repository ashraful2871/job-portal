import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Register from "../pages/Register";
import SignIn from "../pages/SignIn";
import HotJobsDetails from "../pages/shared/HotJobsDetails";
import PrivetRoute from "./PrivetRoute";
import JobApply from "../pages/jobApply/JobApply";
import MyApplications from "../pages/myApplications/MyApplications";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "/login",
        element: <SignIn></SignIn>,
      },
      {
        path: "/jobs/:id",
        element: (
          <PrivetRoute>
            <HotJobsDetails></HotJobsDetails>
          </PrivetRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/jobs/${params.id}`),
      },
      {
        path: "/jobApply/:id",
        element: (
          <PrivetRoute>
            <JobApply></JobApply>
          </PrivetRoute>
        ),
      },
      {
        path: "/myApplications",
        element: (
          <PrivetRoute>
            <MyApplications></MyApplications>
          </PrivetRoute>
        ),
      },
    ],
  },
]);

export default router;
