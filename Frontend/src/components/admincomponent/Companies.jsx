import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/usegetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companyslice";

const Companies = () => {
  const navigate = useNavigate();
  useGetAllCompanies();

  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input, dispatch]);

  return (
    <div className="bg-green-50 min-h-screen">
      <Navbar />

      {/* Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <h1 className="text-2xl font-bold text-green-900">Companies</h1>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Input
              className="flex-1 sm:w-64 rounded-lg border-green-300 shadow-sm 
                         focus:ring-2 focus:ring-green-500"
              placeholder="🔍 Filter by Name"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <Button
              onClick={() => navigate("/admin/companies/create")}
              className="rounded-lg bg-green-600 hover:bg-green-700 text-white shadow"
            >
              + Add Company
            </Button>
          </div>
        </div>

        {/* Companies Table */}
        <div className="bg-white rounded-xl shadow-md border border-green-200 p-6">
          <CompaniesTable />
        </div>

      </div>
    </div>
  );
};

export default Companies;
