import React, { useState } from "react";
import Navbar from "./Navbar";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "../ui/badge";
import AppliedJob from "./AppliedJob";
import EditProfileModal from "./EditProfileModal";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAllAppliedJobs";

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const [showResume, setShowResume] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const handleDownload = async () => {
    if (!user?.profile?.resume) return;
    try {
      const response = await fetch(user.profile.resume);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = user.profile.resumeOriginalName || "resume";
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <div className="bg-green-50 min-h-screen">
      <Navbar />

      {/* Profile Card */}
      <div className="max-w-4xl mx-auto bg-white border border-green-200 rounded-2xl my-8 p-8 shadow-lg hover:shadow-xl transition-all duration-300">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-5">
            <Avatar className="h-24 w-24 ring-4 ring-green-200 shadow-md">
              <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold text-green-900">{user?.fullname}</h1>
              <p className="text-green-700 text-sm">{user?.profile?.bio || "No bio available"}</p>
            </div>
          </div>

          <Button
            onClick={() => setOpen(true)}
            variant="outline"
            className="flex items-center gap-2 rounded-lg border-green-300 text-green-700 hover:border-green-500 hover:bg-green-50"
          >
            <Pen size={16} />
            Edit
          </Button>
        </div>

        {/* Contact Info */}
        <div className="my-6 flex flex-col md:flex-row md:gap-6 gap-3 text-green-800">
          <div className="flex items-center gap-3">
            <Mail className="text-green-600" />
            <a href={`mailto:${user?.email}`} className="hover:text-green-700 transition-colors">
              {user?.email}
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Contact className="text-green-600" />
            <a href={`tel:${user?.phoneNumber}`} className="hover:text-green-700 transition-colors">
              {user?.phoneNumber}
            </a>
          </div>
        </div>

        {/* Skills */}
        <div className="my-6">
          <h1 className="font-semibold text-green-900 mb-2">Skills</h1>
          <div className="flex flex-wrap gap-2">
            {user?.profile?.skills?.length ? (
              user.profile.skills.map((item, index) => (
                <Badge
                  key={index}
                  className="px-3 py-1 rounded-full bg-green-200 text-green-900 font-medium"
                >
                  {item}
                </Badge>
              ))
            ) : (
              <span className="text-green-700">No skills added</span>
            )}
          </div>
        </div>

        {/* Resume */}
        <div className="my-6">
          <h1 className="font-semibold text-green-900 mb-2">Resume</h1>

          {user?.profile?.resume ? (
            <>
              <div className="flex gap-3 flex-wrap">
                <Button
                  onClick={() => setShowResume(prev => !prev)}
                  className="bg-green-600 text-white hover:bg-green-700"
                >
                  {showResume ? "Hide Resume" : "View Resume"}
                </Button>

                <Button
                  onClick={handleDownload}
                  className="bg-green-100 text-green-900 border border-green-300 hover:bg-green-200"
                >
                  Download
                </Button>
              </div>

              {showResume && (
                <div className="mt-4 border border-green-200 rounded-lg shadow-sm overflow-hidden h-[600px]">
                  {user.profile.resume.endsWith(".pdf") ? (
                    <iframe src={user.profile.resume} title="Resume Preview" className="w-full h-full" />
                  ) : (
                    <img
                      src={user.profile.resume}
                      alt="Resume"
                      className="w-full max-w-2xl mx-auto rounded-lg shadow-md"
                    />
                  )}
                </div>
              )}
            </>
          ) : (
            <span className="text-green-700">No Resume Uploaded</span>
          )}
        </div>
      </div>

      {/* Applied Jobs Section */}
      <div className="max-w-4xl mx-auto bg-white border border-green-200 rounded-2xl p-6 shadow-md my-8">
        <h1 className="text-xl font-bold text-green-900 border-b pb-3 mb-4">
          Applied Jobs
        </h1>
        <AppliedJob />
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
