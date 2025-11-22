import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";

const Job1 = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  return (
    <div className="p-5 rounded-md shadow-md bg-white border border-green-200 text-green-900 hover:border-green-400 hover:shadow-lg transition">
      
      {/* Time */}
      <div className="flex items-center justify-between text-green-600 text-sm">
        {daysAgoFunction(job?.createdAt) === 0
          ? "Today"
          : `${daysAgoFunction(job?.createdAt)} days ago`}
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-3 my-3">
        <Avatar className="border border-green-300">
          <AvatarImage src={job?.company?.logo} alt={job?.company?.name} />
        </Avatar>
        <div>
          <h1 className="font-medium text-lg text-green-900">{job?.company?.name}</h1>
          <p className="text-green-700 text-sm">{job.location}</p>
        </div>
      </div>

      {/* Job Title */}
      <div className="my-2">
        <h1 className="font-bold text-xl text-green-600">{job?.title}</h1>
        <p className="text-green-800 text-sm line-clamp-3">
          {job?.description}
        </p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mt-4">
        <Badge className="bg-green-200 text-green-900 px-2 py-1 rounded-md text-xs font-medium">
          {job?.position} Positions
        </Badge>
        <Badge className="bg-green-200 text-green-900 px-2 py-1 rounded-md text-xs font-medium">
          {job?.jobType}
        </Badge>
        <Badge className="bg-green-200 text-green-900 px-2 py-1 rounded-md text-xs font-medium">
          {job?.salary} LPA
        </Badge>
      </div>

      {/* Button */}
      <div className="flex items-center gap-3 mt-4">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          className="bg-green-600 text-white border border-green-700 hover:bg-green-700 hover:border-green-800"
        >
          Details
        </Button>
      </div>
    </div>
  );
};

export default Job1;
