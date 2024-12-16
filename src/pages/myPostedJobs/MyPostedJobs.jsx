import React, { useEffect, useState } from "react";
import useAuth from "../../customHooks/UseAuth";
import { Link } from "react-router-dom";

const MyPostedJobs = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch(`https://job-portal-ebon-zeta.vercel.app/jobs?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
      });
  }, [user?.email]);
  return (
    <div>
      <h2 className="text-3xl">My Posted Jobs: {jobs.length}</h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Deadline</th>
              <th>Application Count</th>
              <th>View Application</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, idx) => (
              <tr className="hover">
                <th>{idx + 1}</th>
                <td>{job.title}</td>
                <td>{job.applicationDeadline}</td>
                <td>{job.applicationCount}</td>
                <td>
                  <Link to={`/view_applications/${job._id}`}>
                    <button className="btn btn-link">View Application</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyPostedJobs;
