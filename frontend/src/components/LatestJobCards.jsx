import React from 'react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { MapPin, DollarSign, Users } from 'lucide-react';

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="p-5 rounded-xl shadow-md bg-white border border-gray-100 cursor-pointer hover:shadow-xl hover:border-blue-200 hover:-translate-y-1 transition-all duration-200"
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h1 className="font-semibold text-gray-900 text-base">{job?.company?.name}</h1>
          <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
            <MapPin className="h-3 w-3" /> India
          </p>
        </div>
        <div className="bg-blue-50 p-2 rounded-lg">
          <Users className="h-4 w-4 text-blue-600" />
        </div>
      </div>

      <h2 className="font-bold text-gray-900 text-lg mb-1">{job?.title}</h2>
      <p className="text-sm text-gray-500 line-clamp-2 mb-4">{job?.description}</p>

      <div className="flex items-center gap-2 flex-wrap">
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
    </div>
  );
};

export default LatestJobCards;
