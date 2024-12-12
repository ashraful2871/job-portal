import React from "react";
import { Link, useLoaderData } from "react-router-dom";

const HotJobsDetails = () => {
  const jobsData = useLoaderData();
  const {
    _id,
    company,
    salaryRange,
    jobType,
    applicationDeadline,
    location,
    category,
    status,
  } = jobsData;
  console.log(jobsData);
  return (
    <div className="border p-5 mt-12 rounded-lg">
      <h2 className="text-3xl font-bold text-center">Employment Information</h2>
      <hr className="my-8" />
      <div className="flex justify-evenly">
        <div>
          <div>Industry: {company}</div>
          <div>
            Salary: ${salaryRange.min} - {salaryRange.max}
          </div>
          <div>Job Type: {jobType}</div>
          <div>Update: N/A</div>
        </div>
        <div>
          <div>Deadline:{applicationDeadline}</div>
          <div>Location: {location}</div>
          <div>Category:{category}</div>
          <div>Status: {status}</div>
        </div>
      </div>
      <Link to={`/jobApply/${_id}`}>
        <div className="text-end mt-10">
          <button className="btn btn-primary ">Apply Now</button>
        </div>
      </Link>
    </div>
  );
};

export default HotJobsDetails;
