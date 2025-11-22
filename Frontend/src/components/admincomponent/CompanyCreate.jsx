import React, { useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { COMPANY_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companyslice";
import axios from "axios";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const dispatch = useDispatch();

  const registerNewCompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_ENDPOINT}/register`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to create company");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto px-4">
        <div className="w-full sm:w-2/3 md:w-1/2 lg:w-2/5 bg-white border border-gray-200 rounded-xl shadow-md p-8 my-10">
          {/* Header */}
          <div className="mb-6 text-center">
            <h1 className="font-bold text-2xl text-blue-600">Create Company</h1>
            <p className="text-gray-500 mt-2 text-sm">
              Add details to register a new company profile
            </p>
          </div>

          {/* Company Name Input */}
          <div className="mb-6">
            <Label className="font-medium">Company Name</Label>
            <Input
              type="text"
              placeholder="Enter company name"
              className="mt-2 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => navigate("/admin/companies")}
              className="w-1/2"
            >
              Cancel
            </Button>
            <Button
              onClick={registerNewCompany}
              className="w-1/2 bg-blue-600 hover:bg-blue-700"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
