import React from "react";
import { Link } from "react-router-dom";
import { Building2, Briefcase, Globe, Info, LayoutDashboard } from "lucide-react";
import Navbar from "../components_lite/Navbar";

export default function EmployerDashboard() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-green-50 p-8">
        <div className="max-w-6xl mx-auto">

          {/* Page Header */}
          <div className="bg-gradient-to-r from-green-100 to-green-200 border border-green-300 rounded-2xl p-8 mb-12 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <LayoutDashboard className="w-8 h-8 text-green-600" />
              <h1 className="text-3xl font-bold text-green-900">Manage Your Hiring</h1>
            </div>
            <p className="text-green-700 text-lg">
              Manage your company, post job opportunities, and explore insights
              about our platform.
            </p>
          </div>

          {/* Actions Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">

            {/* Create Company */}
            <div className="bg-white border border-green-200 rounded-2xl shadow-sm hover:shadow-md transition p-6">
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="w-7 h-7 text-green-600" />
                <h2 className="text-xl font-semibold text-green-900">Create Company</h2>
              </div>
              <p className="text-green-700 mb-6">
                Register your company to start posting jobs and build your brand.
              </p>
              <Link
                to="/admin/companies/create"
                className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2.5 rounded-lg shadow-sm"
              >
                + Create Company
              </Link>
            </div>

            {/* Post Job */}
            <div className="bg-white border border-green-200 rounded-2xl shadow-sm hover:shadow-md transition p-6">
              <div className="flex items-center gap-3 mb-4">
                <Briefcase className="w-7 h-7 text-green-600" />
                <h2 className="text-xl font-semibold text-green-900">Post Jobs</h2>
              </div>
              <p className="text-green-700 mb-6">
                Share your job openings and connect with the right candidates quickly.
              </p>
              <Link
                to="/admin/jobs/create"
                className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2.5 rounded-lg shadow-sm"
              >
                + Post Job
              </Link>
            </div>

          </div>

          {/* Website Information */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-green-900 mb-6">Website Information</h2>

            <div className="grid md:grid-cols-3 gap-8">

              {/* Mission */}
              <div className="bg-white border border-green-200 rounded-2xl shadow-sm hover:shadow-md transition p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Globe className="w-6 h-6 text-green-600" />
                  <h3 className="text-lg font-semibold text-green-900">Mission</h3>
                </div>
                <p className="text-green-700">
                  Empower careers by connecting employers with the right talent
                  through innovative solutions.
                </p>
              </div>

              {/* Vision */}
              <div className="bg-white border border-green-200 rounded-2xl shadow-sm hover:shadow-md transition p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Globe className="w-6 h-6 text-green-600" />
                  <h3 className="text-lg font-semibold text-green-900">Vision</h3>
                </div>
                <p className="text-green-700">
                  A future where every professional has access to opportunities
                  and every company finds its ideal workforce.
                </p>
              </div>

              {/* About Us */}
              <div className="bg-white border border-green-200 rounded-2xl shadow-sm hover:shadow-md transition p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Info className="w-6 h-6 text-green-600" />
                  <h3 className="text-lg font-semibold text-green-900">About Us</h3>
                </div>
                <p className="text-green-700">
                  A leading career platform bridging the gap between skilled
                  professionals and forward-thinking organizations.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </>
  );
}
