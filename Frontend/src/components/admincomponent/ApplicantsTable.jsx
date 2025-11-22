import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_ENDPOINT } from "@/utils/data";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLICATION_API_ENDPOINT}/status/${id}/update`,
        { status }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableCaption className="text-gray-500">
          📋 Applicants for this job
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-slate-100">
            <TableHead className="font-semibold text-gray-700">Full Name</TableHead>
            <TableHead className="font-semibold text-gray-700">Email</TableHead>
            <TableHead className="font-semibold text-gray-700">Contact</TableHead>
            <TableHead className="font-semibold text-gray-700">Resume</TableHead>
            <TableHead className="font-semibold text-gray-700">Applied On</TableHead>
            <TableHead className="text-right font-semibold text-gray-700">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {applicants?.applications?.length > 0 ? (
            applicants.applications.map((item) => (
              <TableRow
                key={item._id}
                className="hover:bg-slate-50 transition-colors"
              >
                <TableCell>{item?.applicant?.fullname || "N/A"}</TableCell>
                <TableCell>{item?.applicant?.email || "N/A"}</TableCell>
                <TableCell>{item?.applicant?.phoneNumber || "N/A"}</TableCell>
                <TableCell>
                  {item?.applicant?.profile?.resume ? (
                    <a
                      className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition"
                      href={item.applicant.profile.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download
                    </a>
                  ) : (
                    <span className="text-gray-400">NA</span>
                  )}
                </TableCell>
                <TableCell>
                  {item?.applicant?.createdAt
                    ? new Date(item.applicant.createdAt).toLocaleDateString(
                        "en-GB",
                        { day: "2-digit", month: "short", year: "numeric" }
                      )
                    : "N/A"}
                </TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="cursor-pointer text-gray-600 hover:text-gray-800" />
                    </PopoverTrigger>
                    <PopoverContent className="w-40 bg-white shadow-md rounded-md p-2">
                      {shortlistingStatus.map((status, index) => (
                        <div
                          key={index}
                          onClick={() => statusHandler(status, item?._id)}
                          className={`flex items-center gap-2 px-2 py-1 rounded-md cursor-pointer hover:bg-slate-100 transition ${
                            status === "Accepted"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          <input
                            type="radio"
                            name={`status-${item._id}`}
                            value={status}
                            className="cursor-pointer"
                          />
                          <span>{status}</span>
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center text-gray-500 py-6"
              >
                🚫 No applicants found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
