import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAllJAdminobs"; 
import { setSearchJobByText } from "@/redux/jobSlice";
import { Briefcase, Search } from "lucide-react";

const AdminJobs = () => {
  useGetAllAdminJobs();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input, dispatch]);

  return (
    <div className="bg-green-50 min-h-screen">
      <Navbar />

      <div className="max-w-6xl mx-auto my-10 px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-green-900">Jobs</h1>
            <p className="text-sm text-green-700">
              Manage and track all your job postings
            </p>
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            
            {/* Search Box */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-green-500" />
              <Input
                className="pl-10 rounded-lg border-green-300 shadow-sm
                           focus:ring-2 focus:ring-green-500 bg-white"
                placeholder="Search by job title or company"
                onChange={(e) => setInput(e.target.value)}
                value={input}
              />
            </div>

            {/* Post Job Button */}
            <Button
              onClick={() => navigate("/admin/jobs/create")}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 
                         text-white rounded-lg px-4 shadow"
            >
              <Briefcase size={16} />
              Post Job
            </Button>
          </div>
        </div>

        {/* Jobs Table */}
        <div className="bg-white rounded-xl border border-green-200 shadow-md p-6">
          <h2 className="text-lg font-semibold text-green-900 mb-4">
            All Job Listings
          </h2>
          <AdminJobsTable />
        </div>
      </div>
    </div>
  );
};

export default AdminJobs;
