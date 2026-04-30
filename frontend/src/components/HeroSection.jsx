import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search, MapPin, TrendingUp } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../../redux/jobSlice.js";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") searchJobHandler();
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 font-semibold px-5 py-2 rounded-full text-sm mb-6">
          <TrendingUp className="h-4 w-4" />
          India's Fastest Growing Job Portal
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-5">
          Find Your Perfect <br />
          <span className="text-blue-600">Career Opportunity</span>
        </h1>

        {/* Subtext */}
        <p className="text-gray-500 text-lg max-w-xl mx-auto mb-10">
          Connect with top companies across India. Thousands of jobs updated daily — your dream job is just one search away.
        </p>

        {/* Search Bar */}
        <div className="flex items-center bg-white shadow-xl border border-gray-200 rounded-full px-5 py-3 max-w-2xl mx-auto gap-3">
          <Search className="h-5 w-5 text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="Search jobs, skills, or companies..."
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="outline-none border-none w-full text-gray-700 bg-transparent text-base"
          />
          <Button
            onClick={searchJobHandler}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 shrink-0"
          >
            Search
          </Button>
        </div>

        {/* Stats Row */}
        <div className="flex items-center justify-center gap-10 mt-12 text-gray-500 text-sm">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-gray-900">10,000+</span>
            <span>Active Jobs</span>
          </div>
          <div className="h-8 w-px bg-gray-300" />
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-gray-900">5,000+</span>
            <span>Companies</span>
          </div>
          <div className="h-8 w-px bg-gray-300" />
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-gray-900">50,000+</span>
            <span>Job Seekers</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
