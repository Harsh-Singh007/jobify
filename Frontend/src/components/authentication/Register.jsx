import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";

const Register = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "",
    phoneNumber: "",
    pancard: "",
    adharcard: "",
    file: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(input).forEach((key) => {
      if (input[key]) formData.append(key, input[key]);
    });

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : "An unexpected error occurred.";
      toast.error(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="flex items-center justify-center max-w-4xl mx-auto px-4">
        <form
          onSubmit={submitHandler}
          className="w-full sm:w-2/3 md:w-1/2 lg:w-5/14 bg-white border border-gray-200 rounded-xl shadow-md p-5 my-6 space-y-3"
        >
          <h1 className="font-bold text-xl text-center text-blue-600 mb-2">
            Create an Account
          </h1>

          {/* Full Name */}
          <div>
            <Label className="text-sm">Fullname</Label>
            <Input
              type="text"
              name="fullname"
              value={input.fullname}
              onChange={changeEventHandler}
              placeholder="John Doe"
              className="mt-1 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 py-1"
            />
          </div>

          {/* Email */}
          <div>
            <Label className="text-sm">Email</Label>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="johndoe@gmail.com"
              className="mt-1 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 py-1"
            />
          </div>

          {/* Password */}
          <div>
            <Label className="text-sm">Password</Label>
            <Input
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="********"
              className="mt-1 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 py-1"
            />
          </div>

          {/* Phone Number */}
          <div>
            <Label className="text-sm">Phone Number</Label>
            <Input
              type="tel"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={changeEventHandler}
              placeholder="+91 9876543210"
              className="mt-1 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 py-1"
            />
          </div>

          <div>
            <Label>PAN Card Number</Label>
            <Input
              type="text"
              value={input.pancard}
              name="pancard"
              onChange={changeEventHandler}
              placeholder="ABCDEF1234G"
            ></Input>
          </div>
          <div>
            <Label>Adhar Card Number</Label>
            <Input
              type="text"
              value={input.adharcard}
              name="adharcard"
              onChange={changeEventHandler}
              placeholder="123456789012"
            ></Input>
          </div>

          {/* Role Selection */}
          <div>
            <Label className="text-sm">Register As</Label>
            <div className="flex gap-4 mt-1 text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="Student"
                  checked={input.role === "Student"}
                  onChange={changeEventHandler}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span>Job Seeker</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="Recruiter"
                  checked={input.role === "Recruiter"}
                  onChange={changeEventHandler}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span>Employer</span>
              </label>
            </div>
          </div>

          {/* Profile Photo */}
          <div>
            <Label className="text-sm">Profile Photo</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={changeFileHandler}
              className="cursor-pointer rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 mt-1 py-1"
            />
          </div>

          {/* Submit Button */}
          <div>
            {loading ? (
              <div className="flex items-center justify-center my-2">
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <Button
                type="submit"
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow"
              >
                Register
              </Button>
            )}
          </div>

          {/* Footer */}
          <p className="text-gray-500 text-xs text-center mt-1">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-semibold">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
