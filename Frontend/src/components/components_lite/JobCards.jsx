import React from "react";
import { useNavigate } from "react-router-dom";

const JobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-lg p-6 cursor-pointer 
                 transform transition duration-300 hover:scale-105 hover:from-slate-700 hover:to-slate-800
                 shadow-2xl hover:shadow-2xl/50"
    >
      {/* Company & Location */}
      <div className="mb-3">
        <h1 className="text-lg font-semibold text-white">
          {job.company.name}
        </h1>
        <p className="text-gray-400 text-sm">
          {job.location}
        </p>
      </div>

      {/* Job Title & Description */}
      <div className="mb-4">
        <h2 className="text-blue-400 font-bold text-xl">{job.title}</h2>
        <p className="text-gray-300 text-sm line-clamp-3">{job.description}</p>
      </div>

      {/* Job Info Tags */}
      <div className="flex flex-wrap gap-2 mt-4">
        <span className="bg-slate-700/90 text-gray-200 px-2 py-1 rounded-md text-xs font-medium">
          {job.position} Open Position{job.position > 1 ? "s" : ""}
        </span>
        <span className="bg-slate-700/90 text-gray-200 px-2 py-1 rounded-md text-xs font-medium">
          {job.salary} LPA
        </span>
        <span className="bg-slate-700/90 text-gray-200 px-2 py-1 rounded-md text-xs font-medium">
          {job.jobType}
        </span>
      </div>
    </div>
  );
};

export default JobCards;
