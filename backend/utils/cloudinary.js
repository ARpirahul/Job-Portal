// import {v2 as cloudinary} from "cloudinary";

// cloudinary.config({
//     cloud_name: "dd4c83gko",
//     api_key: "946385332191173",
//     api_secret: "0-XmeTX7Kn3DMDSLktlIBdD9sSo"
// });

// export default cloudinary;



import {v2 as cloudinary} from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,  // ✅ moved to env vars
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export default cloudinary;