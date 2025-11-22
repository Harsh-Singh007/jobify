import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Job1 from "./Job1";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { APPLICATION_API_ENDPOINT, JOB_API_ENDPOINT } from "@/utils/data";
import { setSingleJob } from "@/redux/jobSlice";
import { toast } from "sonner";
import {
  MapPin,
  Users,
  Calendar,
  Briefcase,
  Layers,
  IndianRupee,
} from "lucide-react";
import { motion } from "framer-motion";

const Description = () => {
  const { id: jobId } = useParams();
  const dispatch = useDispatch();

  const { singleJob, allJobs } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  const [loading, setLoading] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  // Fetch Job
  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, {
          withCredentials: true,
        });

        if (res.data?.status) {
          const job = res.data.job;
          dispatch(setSingleJob(job));

          const applied = job.applications?.some(
            (app) => app.applicant === user?._id
          );
          setIsApplied(applied);
        }
      } catch (err) {
        toast.error("Failed to load job details.");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId, user?._id]);

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_ENDPOINT}/apply/${jobId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsApplied(true);
        toast.success("Applied successfully!");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error applying.");
    }
  };

  // Similar jobs based on job title
  const similarJobs = allJobs
    ?.filter((job) => job._id !== singleJob?._id)
    ?.filter((job) =>
      job.title?.toLowerCase().includes(
        singleJob?.title?.split(" ")[0]?.toLowerCase() || ""
      )
    )
    .slice(0, 4);

  if (loading)
    return (
      <div className="h-screen flex justify-center items-center text-green-700">
        Loading job...
      </div>
    );

  if (!singleJob)
    return (
      <div className="h-screen flex justify-center items-center text-red-500">
        Job not found
      </div>
    );

  return (
    <div className="bg-green-50 min-h-screen">
      <Navbar />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto px-6 py-10"
      >
        <div className="bg-white shadow-lg rounded-xl border border-green-200">

          {/* Header */}
          <div className="p-8 border-b">
            
            <h1 className="text-3xl font-bold text-green-900">
              {singleJob.title}
            </h1>

            <p className="text-green-700 flex items-center gap-2 mt-2">
              <MapPin className="w-4 h-4" /> {singleJob.location}
            </p>
          </div>

          {/* Job Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-8 bg-green-50 border-b">
            <div className="flex gap-3 items-center">
              <IndianRupee className="w-5 h-5 text-green-700" />
              <span>{singleJob.salary} LPA</span>
            </div>

            <div className="flex gap-3 items-center">
              <Briefcase className="w-5 h-5 text-green-700" />
              <span>{singleJob.jobType}</span>
            </div>

            <div className="flex gap-3 items-center">
              <Layers className="w-5 h-5 text-green-700" />
              <span>{singleJob.experienceLevel} Years Experience</span>
            </div>

            <div className="flex gap-3 items-center">
              <Users className="w-5 h-5 text-green-700" />
              <span>{singleJob.applications?.length} Applicants</span>
            </div>

            <div className="flex gap-3 items-center">
              <Calendar className="w-5 h-5 text-green-700" />
              <span>Posted on {singleJob.createdAt.split("T")[0]}</span>
            </div>
          </div>

          {/* Description */}
          <div className="p-8">
            <h2 className="text-xl font-semibold text-green-900 mb-3">
              Job Description
            </h2>

            <p className="text-green-800 whitespace-pre-line leading-relaxed">
              {singleJob.description}
            </p>
          </div>

          {/* Skills */}
          {singleJob.skills?.length > 0 && (
            <div className="p-8 border-t">
              <h2 className="text-xl font-semibold text-green-900 mb-3">
                Skills Required
              </h2>

              <div className="flex flex-wrap gap-2">
                {singleJob.skills.map((skill, idx) => (
                  <Badge
                    key={idx}
                    className="bg-green-200 text-green-800 px-3 py-1"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Apply Button */}
          <div className="p-8 border-t flex justify-end">
            <Button
              onClick={isApplied ? null : applyJobHandler}
              disabled={isApplied}
              className={`px-8 py-3 rounded-lg text-white font-semibold ${
                isApplied
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {isApplied ? "Already Applied ✔" : "Apply Now"}
            </Button>
          </div>
        </div>

        {/* Similar Jobs */}
        {similarJobs.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-green-900 mb-4">
              Similar Jobs
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarJobs.map((job) => (
                <Job1 key={job._id} job={job} />
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Description;
