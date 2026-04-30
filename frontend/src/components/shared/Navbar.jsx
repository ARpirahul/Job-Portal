import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2, Briefcase } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "../../../utils/constant.js";
import { setUser } from "../../../redux/authSlice.js";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="flex items-center justify-between mx-auto max-w-6xl h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <Briefcase className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            Job<span className="text-blue-600">Portal</span>
          </h1>
        </Link>

        <div className="flex items-center gap-10">
          <ul className="flex font-medium items-center gap-6 text-gray-700">
            {user && user.role === "recruiter" ? (
              <>
                <li><Link to="/admin/companies" className="hover:text-blue-600 transition-colors">Companies</Link></li>
                <li><Link to="/admin/jobs" className="hover:text-blue-600 transition-colors">Jobs</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/" className="hover:text-blue-600 transition-colors">Home</Link></li>
                <li><Link to="/jobs" className="hover:text-blue-600 transition-colors">Jobs</Link></li>
                <li><Link to="/Browse" className="hover:text-blue-600 transition-colors">Browse</Link></li>
              </>
            )}
          </ul>

          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">Sign Up</Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer ring-2 ring-blue-200 hover:ring-blue-400 transition-all">
                  <AvatarImage src={user?.profile?.profilePhoto} />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-72">
                <div className="flex gap-3 pb-3 border-b border-gray-100">
                  <Avatar><AvatarImage src={user?.profile?.profilePhoto} /></Avatar>
                  <div>
                    <h4 className="font-semibold text-gray-900">{user?.fullName}</h4>
                    <p className="text-sm text-gray-500">{user?.profile?.bio}</p>
                  </div>
                </div>
                <div className="flex flex-col pt-2 text-gray-600">
                  {user && user.role === "student" && (
                    <div className="flex items-center gap-2 cursor-pointer">
                      <User2 className="h-4 w-4" />
                      <Button variant="link" className="p-0 text-gray-600 hover:text-blue-600">
                        <Link to="/profile">View Profile</Link>
                      </Button>
                    </div>
                  )}
                  <div className="flex items-center gap-2 cursor-pointer mt-1">
                    <LogOut className="h-4 w-4" />
                    <Button onClick={logoutHandler} variant="link" className="p-0 text-gray-600 hover:text-red-500">Logout</Button>
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
