const applyJobHandler = async () => {
    if (loading || isApplied) return;
    if (!jobId) {
        toast.error("Job ID is missing. Please refresh the page.");
        return;
    }
    try {
        setLoading(true);
        // ✅ This is the correct call — POST to application endpoint
        const res = await axios.post(
            `${Application_API_END_POINT}/apply/${jobId}`,
            {},
            { withCredentials: true }
        );
        if (res.data.success) {
            setIsApplied(true);
            const updatedSingleJob = {
                ...singleJob,
                applications: [...singleJob.applications, { applicant: user?._id }]
            };
            dispatch(setSingleJob(updatedSingleJob));
            toast.success(res.data.message);
        }
    } catch (error) {
        console.log("apply error", error?.response?.data || error);
        toast.error(error.response?.data?.message || "Failed to apply for job");
    } finally {
        setLoading(false);
    }
};