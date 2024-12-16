import React from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const ViewApplications = () => {
  const handleStatusUpdate = (e, id) => {
    console.log(e.target.value, id);
    const data = {
      status: e.target.value,
    };
    fetch(`https://job-portal-ebon-zeta.vercel.app/job-applications/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          Swal.fire({
            // position: "top-end",
            icon: "success",
            title: "status has been updated",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };
  const applications = useLoaderData();
  return (
    <div>
      <h2 className="text-2xl">
        Applications for this job: {applications.length}
      </h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Email</th>
              <th>Job</th>
              <th>Update status</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app, idx) => (
              <tr key={idx} className="hover">
                <th>{idx + 1}</th>
                <td>{app.applicant_email}</td>
                <td>Quality Control Specialist</td>
                <td>
                  <select
                    onChange={(e) => handleStatusUpdate(e, app._id)}
                    defaultValue={app.status || "Change Status"}
                    className="select select-bordered select-xs w-full max-w-xs"
                  >
                    <option disabled>Change Status</option>
                    <option>Under Review</option>
                    <option>Set Interview</option>
                    <option>Hired</option>
                    <option>Rejected</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewApplications;
