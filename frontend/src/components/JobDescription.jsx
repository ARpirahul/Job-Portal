import axios from "axios";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "../../redux/jobSlice";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Application_API_END_POINT, JOB_API_END_POINT } from "../../utils/constant.js";

const JobDescription = () => {
    const {singleJob}= useSelector(store=>store.job);
    const {user} = useSelector(store=>store.auth)
    const [isApplied,setIsApplied] = useState(false)
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const jobId = params.id;
    const dispatch= useDispatch();

    const applyJobHandler = async()=>{
        console.log("applyJobHandler", { jobId, loading, isApplied });
        if (loading || isApplied) return;
        if(!jobId){
            toast.error("Job ID is missing. Please refresh the page.");
            return;
        }
        try{
            setLoading(true);
            const res = await axios.post(`${Application_API_END_POINT}/apply/${jobId}`,{}, { withCredentials:true })
            console.log("apply response", res.data)
            if(res.data.success){
                setIsApplied(true)
                const updateSinglejob = {...singleJob,applications:[...singleJob.applications,{applicant:user?._id}]};
                dispatch(setSingleJob(updateSinglejob))
                toast.success(res.data.message)
            }
        }catch(error){
            console.log("apply error", error?.response?.data || error);
            const message = error.response?.data?.message || "Failed to apply for job";
            toast.error(message);
        }finally{
            setLoading(false);
        }
    }
    useEffect(()=>{
        const fetchSingleJob = async () =>{
            try{
 const res = await axios(`${JOB_API_END_POINT}/get/${jobId}`,{withCredentials:true});
 if(res.data.success){  

    dispatch(setSingleJob(res.data.job))
    const hasApplied = res.data.job.applications.some(application => 
        String(application.applicant?._id || application.applicant) === String(user?._id)
    );
    setIsApplied(hasApplied);
 }
            }catch(error){
                console.log(error);
                
            }
        }
        if(user?._id){
            fetchSingleJob();
        }
    },[jobId,dispatch,user?._id])
    return (
        <div className="max-w-5xl mx-auto my-10">
            <div className="flex itmes-center justify-between">
                <div>
                    <h1 className="font-bold text-xl">{singleJob?.title}</h1>
                    <div>
                        <Badge className={'text-blue-700 font-bold'} variant="ghost">{singleJob?.position}Positions</Badge>
                        <Badge className={'text-red-600 font-bold'} variant="ghost">{singleJob?.jobType}</Badge>
                        <Badge className={'text-indigo-600 font-bold'} variant="ghost">{singleJob?.salary}LPA</Badge>
                    </div>
                </div>
                <Button 
             onClick={isApplied ? null : applyJobHandler}
                disabled={isApplied || loading} className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}>{loading ? "Applying..." : isApplied ? "Already Applied" : "Apply Now"}</Button>
            </div>
            <h1 className="border-b-2 border-b-gray-300 font-medium py-4">Job Description</h1>
            <div>
                <h1 className="font-bold my-1">Role:<span className="pl-4 font-normal text-gray-800">{singleJob?.title}</span></h1>
                <h1 className="font-bold my-1">Location:<span className="pl-4 font-normal text-gray-800">{singleJob?.location}</span></h1>
                <h1 className="font-bold my-1">Description:<span className="pl-4 font-normal text-gray-800">{singleJob?.description}</span></h1>
                <h1 className="font-bold my-1">Experience:<span className="pl-4 font-normal text-gray-800">2{singleJob?.experience}yrs</span></h1>
                <h1 className="font-bold my-1">Salary:<span className="pl-4 font-normal text-gray-800">{singleJob?.salary}LPA</span></h1>
                <h1 className="font-bold my-1">Total Applicants:<span className="pl-4 font-normal text-gray-800">{singleJob?.applications?.length}</span></h1>
                <h1 className="font-bold my-1">Posted Date:<span className="pl-4 font-normal text-gray-800">{singleJob?.createdAt.split("T")[0]}</span></h1>
            </div>
        </div>
    )
}
export default JobDescription;