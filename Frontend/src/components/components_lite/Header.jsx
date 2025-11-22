import React, { useState } from "react";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchjobHandler = () => {
    if (!query.trim()) return;
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="bg-gradient-to-br from-green-50 via-green-100 to-green-50 py-20 px-6">
      <div className="text-center max-w-3xl mx-auto">

        {/* Badge */}
        <span className="inline-block px-6 py-2 rounded-md bg-green-200 text-green-700 font-medium text-sm shadow-sm">
          Trusted by 1000+ Companies
        </span>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-green-900 mt-6 leading-tight">
          Find Your Next <br />
          <span className="text-green-600">Career Opportunity</span>
        </h2>

        {/* Sub Text */}
        <p className="mt-4 text-green-800 text-base md:text-lg">
          Explore thousands of jobs, connect with top recruiters, <br className="hidden md:block" />
          and take the next step toward your professional future.
        </p>

        {/* Search Bar */}
         {/* <div className="flex w-full md:w-3/5 lg:w-2/5 mt-8 shadow-md rounded-md overflow-hidden mx-auto focus-within:ring-2 focus-within:ring-blue-400 transition">
          <input
            type="text"
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && searchjobHandler()}
            placeholder="Search jobs by title, skills, or company..."
            className="flex-1 px-4 py-3 text-slate-800 placeholder-slate-500 outline-none bg-white"
          />
          <button
            onClick={searchjobHandler}
            className="bg-blue-500 hover:bg-blue-600 px-5 flex items-center justify-center transition"
          >
            <Search className="h-5 w-5 text-white" />
          </button>
        </div> */}

      </div>
    </div>
  );
};

export default Header;
