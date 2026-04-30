import { Bookmark } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  return (
    <div className="p-5 rounded-xl shadow-md bg-white border border-gray-100 hover:shadow-xl hover:border-blue-200 hover:-translate-y-1 transition-all duration-200">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-400">
          {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button variant="outline" className="rounded-full border-gray-200 hover:border-blue-400 hover:text-blue-600" size="icon">
          <Bookmark className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center gap-3 my-3">
        <Button className="p-2 h-12 w-12" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-semibold text-gray-900">{job?.company?.name}</h1>
          <p className="text-xs text-gray-400">India</p>
        </div>
      </div>

      <div>
        <h1 className="font-bold text-lg my-2 text-gray-900">{job?.title}</h1>
        <p className="text-sm text-gray-500 line-clamp-2">{job?.description}</p>
      </div>

      <div className="flex items-center gap-2 mt-4 flex-wrap">
        <Badge className="bg-blue-50 text-blue-700 border-blue-200 font-semibold" variant="outline">
          {job?.position} Positions
        </Badge>
        <Badge className="bg-green-50 text-green-700 border-green-200 font-semibold" variant="outline">
          {job?.jobType}
        </Badge>
        <Badge className="bg-orange-50 text-orange-700 border-orange-200 font-semibold" variant="outline">
          {job?.salary} LPA
        </Badge>
      </div>

      <div className="flex items-center gap-3 mt-4">
        <Button variant="outline" onClick={() => navigate(`/description/${job?._id}`)} className="border-blue-300 text-blue-600 hover:bg-blue-50">
          Details
        </Button>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          Save For Later
        </Button>
      </div>
    </div>
  );
};

export default Job;
