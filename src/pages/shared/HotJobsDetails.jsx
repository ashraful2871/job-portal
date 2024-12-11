import React from "react";
import { Link, useLoaderData } from "react-router-dom";

const HotJobsDetails = () => {
  const jobsData = useLoaderData();
  const { _id } = jobsData;
  console.log(jobsData);
  //home work
  return (
    <div>
      <Link to={`/jobApply/${_id}`}>
        <button className="btn btn-primary">Apply Now</button>
      </Link>
    </div>
  );
};

export default HotJobsDetails;
