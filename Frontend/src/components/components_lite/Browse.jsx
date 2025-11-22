import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Job1 from "./Job1";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { motion } from "framer-motion";

const Browse = () => {
  useGetAllJobs();
  const dispatch = useDispatch();

  const { allJobs, searchedQuery } = useSelector((store) => store.job);

  const [filteredJobs, setFilteredJobs] = useState([]);
  const [sortOption, setSortOption] = useState("newest");
  const [view, setView] = useState("grid"); // grid / list

  // Reset search on unmount
  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, []);

  // Filter jobs
  useEffect(() => {
    const query = searchedQuery?.trim()?.toLowerCase();

    let results = allJobs;

    if (query) {
      results = allJobs.filter((job) => {
        return (
          job.title?.toLowerCase().includes(query) ||
          job.description?.toLowerCase().includes(query) ||
          job.company?.toLowerCase().includes(query) ||
          job.location?.toLowerCase().includes(query)
        );
      });
    }

    // Sort logic
    if (sortOption === "salaryHigh") {
      results = [...results].sort((a, b) => b.salary - a.salary);
    }
    if (sortOption === "salaryLow") {
      results = [...results].sort((a, b) => a.salary - b.salary);
    }
    if (sortOption === "oldest") {
      results = [...results].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }
    if (sortOption === "newest") {
      results = [...results].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFilteredJobs(results);
  }, [searchedQuery, allJobs, sortOption]);

  return (
    <div className="bg-slate-100 min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto py-10 px-6">

        {/* SEARCH HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
          <h1 className="text-3xl font-bold text-slate-800">
            Search Results <span className="text-blue-600">({filteredJobs.length})</span>
          </h1>

          <div className="flex items-center gap-4 mt-4 lg:mt-0">
            
            {/* VIEW TOGGLE */}
            <button
              className={`px-3 py-1 rounded-md border ${
                view === "grid" ? "bg-blue-600 text-white" : "bg-white"
              }`}
              onClick={() => setView("grid")}
            >
              Grid
            </button>
            <button
              className={`px-3 py-1 rounded-md border ${
                view === "list" ? "bg-blue-600 text-white" : "bg-white"
              }`}
              onClick={() => setView("list")}
            >
              List
            </button>

            {/* SORT DROPDOWN */}
            <select
              className="bg-white border rounded-md px-3 py-2"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="salaryHigh">Salary: High to Low</option>
              <option value="salaryLow">Salary: Low to High</option>
            </select>
          </div>
        </div>

        {/* EMPTY STATE */}
        {filteredJobs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 text-gray-500 text-xl"
          >
            🚀 No Jobs Found — Try changing your filters
          </motion.div>
        ) : (

          /* GRID / LIST VIEW */
          <div
            className={`${
              view === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                : "flex flex-col gap-4"
            }`}
          >
            {filteredJobs.map((job) => (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Job1 job={job} view={view} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
