// Ye URL tab update karna jab backend Render pe deploy ho jaye
export const USER_API_END_POINT = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/api/v1/user`
  : "https://jobwebsite-youtube-1.onrender.com/api/v1/user";

export const JOB_API_END_POINT = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api/v1/job`
  : "https://jobwebsite-youtube-1.onrender.com/api/v1/job";

export const Application_API_END_POINT = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api/v1/application`
  : "https://jobwebsite-youtube-1.onrender.com/api/v1/application";

export const Company_API_END_POINT = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api/v1/company`
  : "https://jobwebsite-youtube-1.onrender.com/api/v1/company";
