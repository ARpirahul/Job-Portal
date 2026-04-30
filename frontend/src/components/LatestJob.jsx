import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';

const LatestJob = () => {
  const { allJobs } = useSelector((store) => store.job);
  return (
    <div className="max-w-6xl mx-auto my-16 px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">
          <span className="text-blue-600">Latest & Top</span> Job Openings
        </h1>
        <p className="text-gray-500 mt-2">Handpicked opportunities from leading companies</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {allJobs.length <= 0
          ? <span className="text-gray-400 col-span-3 text-center py-10">No jobs available right now. Check back soon!</span>
          : allJobs?.slice(0, 6).map((job) => <LatestJobCards key={job._id} job={job} />)
        }
      </div>
    </div>
  );
};

export default LatestJob;
