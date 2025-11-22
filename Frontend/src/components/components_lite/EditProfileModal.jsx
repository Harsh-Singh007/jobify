import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_ENDPOINT } from "@/utils/data";
import { setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const EditProfileModal = ({ open, setOpen }) => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills || [],
    file: user?.profile?.resume || null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "skills") {
      setInput({ ...input, skills: value.split(",").map((s) => s.trim()) });
    } else {
      setInput({ ...input, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("fullname", input.fullname);
      formData.append("email", input.email);
      formData.append("phoneNumber", input.phoneNumber);
      formData.append("bio", input.bio);
      formData.append("skills", input.skills);
      if (input.file) formData.append("file", input.file);

      const res = await axios.post(
        `${USER_API_ENDPOINT}/profile/update`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true }
      );

      if (res.data.success) {
        dispatch(setUser({ ...res.data.user, skills: input.skills }));
        toast.success(res.data.message);
        setOpen(false);
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent
        className="sm:max-w-[500px]"
        onInteractOutside={() => setOpen(false)}
      >
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="fullname" className="text-right">Name</Label>
            <input
              id="fullname"
              name="fullname"
              type="text"
              value={input.fullname}
              onChange={handleChange}
              className="col-span-3 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-100 focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">Email</Label>
            <input
              id="email"
              name="email"
              type="email"
              value={input.email}
              onChange={handleChange}
              className="col-span-3 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-100 focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phoneNumber" className="text-right">Phone</Label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              value={input.phoneNumber}
              onChange={handleChange}
              className="col-span-3 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-100 focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="bio" className="text-right">Bio</Label>
            <input
              id="bio"
              name="bio"
              type="text"
              value={input.bio}
              onChange={handleChange}
              className="col-span-3 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-100 focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="skills" className="text-right">Skills</Label>
            <input
              id="skills"
              name="skills"
              type="text"
              value={input.skills.join(", ")}
              onChange={handleChange}
              className="col-span-3 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-100 focus:border-blue-500"
              placeholder="e.g. React, Node, Python"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="file" className="text-right">Resume</Label>
            <input
              id="file"
              name="file"
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="col-span-3 border border-gray-300 rounded-md p-2"
            />
          </div>

          <DialogFooter>
            <Button
              type="submit"
              className={`w-full my-4 flex justify-center items-center ${
                loading ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
              disabled={loading}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
