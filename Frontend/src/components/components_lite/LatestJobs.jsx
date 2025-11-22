import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LatestJobs = () => {
  const allJobs = useSelector((state) => state.jobs?.allJobs || []);
  const navigate = useNavigate();

  return (
    <div className="py-16 bg-gradient-to-r from-green-50 via-green-100 to-green-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-green-900">
            <span className="text-green-600">Latest & Top </span>Job Openings
          </h2>
          <p className="text-green-700 mt-2">
            Find the most recent opportunities and take the next step in your career.
          </p>
        </div>

        {/* Jobs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allJobs.length === 0 ? (
            <div className="col-span-full text-center py-10 text-green-600">
              🚀 No Jobs Available Right Now
            </div>
          ) : (
            allJobs.slice(0, 6).map((job) => (
              <div
                key={job._id}
                onClick={() => navigate(`/description/${job._id}`)}
                className="bg-white/80 hover:bg-green-50 rounded-lg shadow-md p-6 cursor-pointer transition hover:shadow-lg border border-green-200 hover:border-green-400"
              >
                <div className="mb-2">
                  <h3 className="text-lg font-semibold text-green-800">
                    {job.company.name}
                  </h3>
                </div>

                <div className="mb-3">
                  <h2 className="text-green-600 font-bold text-xl">{job.title}</h2>
                  <p className="text-green-800 text-sm line-clamp-3">
                    {job.description ? job.description.slice(0, 100) + "..." : ""}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="bg-green-200 text-green-900 px-2 py-1 rounded-md text-xs font-medium">
                    {job.position} Open Position{job.position > 1 ? "s" : ""}
                  </span>
                  <span className="bg-green-200 text-green-900 px-2 py-1 rounded-md text-xs font-medium">
                    {job.salary} LPA
                  </span>
                  <span className="bg-green-200 text-green-900 px-2 py-1 rounded-md text-xs font-medium">
                    {job.jobType}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Browse More Button */}
        {allJobs.length > 6 && (
          <div className="text-center mt-10">
            <button
              onClick={() => navigate("/browse")}
              className="px-6 py-3 rounded-full bg-green-600 text-white font-semibold hover:bg-green-700 transition shadow"
            >
              Browse More Jobs
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
