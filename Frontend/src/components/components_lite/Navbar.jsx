import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import { USER_API_ENDPOINT } from "@/utils/data";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.post(
        `${USER_API_ENDPOINT}/logout`,
        {},
        { withCredentials: true }
      );
      if (res?.data?.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      } else {
        console.error("Error logging out:", res.data);
      }
    } catch (error) {
      console.error("Axios error:", error);
      toast.error("Error logging out. Please try again.");
    }
  };

  return (
    <div className="bg-gradient-to-r from-green-600 via-green-700 to-green-600 shadow-md sticky top-0 z-50">
      <div className="flex items-center justify-between mx-auto max-w-7xl px-6 h-16">

        {/* Logo */}
        <div>
          <Link to={"/"}>
            <h1 className="text-2xl font-bold tracking-wide text-white">
              Job<span className="text-green-200">ify</span>
            </h1>
          </Link>
        </div>

        {/* Nav Links */}
        <div className="flex items-center gap-8">
          <ul className="flex font-medium items-center gap-6 text-green-100">
            {user && user.role === "Recruiter" ? (
              <>
                <li>
                  <Link
                    to={"/admin/dashboard"}
                    className="hover:text-white transition"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/admin/companies"}
                    className="hover:text-white transition"
                  >
                    Companies
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/admin/jobs"}
                    className="hover:text-white transition"
                  >
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to={"/Home"}
                    className="hover:text-white transition"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/Browse"}
                    className="hover:text-white transition"
                  >
                    Browse
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/Jobs"}
                    className="hover:text-white transition"
                  >
                    Jobs
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Auth Section */}
          {!user ? (
            <div className="flex items-center gap-3">
              <Link to={"/login"}>
                <Button
                  className="rounded-md px-5 py-2 bg-green-800 text-green-100 border border-green-700 
                            hover:bg-green-900 transition"
                >
                  Login
                </Button>
              </Link>

              <Link to={"/register"}>
                <Button className="rounded-md px-5 py-2 bg-white text-green-700 hover:bg-green-100 transition">
                  Register
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer border-2 border-white hover:ring-2 hover:ring-green-300 transition">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="profile"
                  />
                </Avatar>
              </PopoverTrigger>

              <PopoverContent className="w-72 shadow-lg rounded-md p-4 bg-green-700 text-white border border-green-800">

                {/* Profile Info */}
                <div className="flex items-center gap-4 border-b border-green-600 pb-3 mb-3">
                  <Avatar className="border border-green-200">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="profile"
                    />
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-white">
                      {user?.fullname}
                    </h3>
                    <p className="text-sm text-green-200">
                      {user?.profile?.bio || "Welcome to Jobify"}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3">
                  {user?.role === "Student" && (
                    <Link
                      to={"/Profile"}
                      className="flex items-center gap-2 hover:text-green-300 transition"
                    >
                      <User2 className="w-4 h-4" />
                      Profile
                    </Link>
                  )}
                  <div
                    className="flex items-center gap-2 cursor-pointer hover:text-red-400 transition"
                    onClick={logoutHandler}
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </div>
                </div>

              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
