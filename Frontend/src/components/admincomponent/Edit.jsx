import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar.jsx";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { updateJob } from "@/redux/jobSlice";

const EditJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allAdminJobs = [] } = useSelector((store) => store.job);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    skills: "",
  });

  // Load job details into form
  useEffect(() => {
    const job = allAdminJobs.find((j) => j._id === jobId);
    if (job) {
      setFormData({
        title: job.title || "",
        description: job.description || "",
        location: job.location || "",
        salary: job.salary || "",
        skills: job.skills?.join(", ") || "",
      });
    }
  }, [allAdminJobs, jobId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedJob = {
      ...formData,
      skills: formData.skills.split(",").map((s) => s.trim()),
    };

    await dispatch(updateJob({ jobId, updatedJob }));
    navigate("/admin/jobs"); // back to jobs list
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-2xl p-8 mt-10">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">✏️ Edit Job</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label className="text-gray-700">Job Title</Label>
            <Input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter job title"
              required
              className="mt-1 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <Label className="text-gray-700">Description</Label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter job description"
              rows={4}
              required
              className="mt-1 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <Label className="text-gray-700">Location</Label>
            <Input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter location"
              required
              className="mt-1 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <Label className="text-gray-700">Salary</Label>
            <Input
              type="text"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              placeholder="Enter salary (e.g. ₹50,000 / month)"
              className="mt-1 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <Label className="text-gray-700">Skills</Label>
            <Input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="Enter required skills (comma separated)"
              className="mt-1 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/admin/jobs")}
              className="text-gray-600 hover:text-blue-600 hover:border-blue-600 transition-colors"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white transition-colors"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditJob;
