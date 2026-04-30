// import dotenv from "dotenv";
// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// dotenv.config({ path: path.join(__dirname, '.env') }); // ✅ Exact path


// import express from "express";
// import cookieParser from "cookie-parser"; 
// import cors from "cors";
// import connectDB from "./utils/db.js";
// import userRoute from "./routes/user.route.js";
// import companyRoute from "./routes/company.route.js";
// import jobRoute from "./routes/job.route.js";
// import applicationRoute from "./routes/application.route.js";

// // dotenv.config({});
// const app = express();

// // middleware
// app.use(express.json());
// app.use(express.urlencoded({extended:true}));
// app.use(cookieParser());

// const corsOptions = {
//     origin: process.env.FRONTEND_URL || 'https://job-portal-k1vc.onrender.com',
//     credentials: true
// }
// app.use(cors(corsOptions));

// app.use("/api/v1/user", userRoute);
// app.use("/api/v1/company", companyRoute);
// app.use("/api/v1/job", jobRoute);
// app.use("/api/v1/application", applicationRoute);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     connectDB();
//     console.log(`server running on port ${PORT}`);
// })








import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Sabse pehle dotenv load karo
dotenv.config({ path: path.join(__dirname, '.env') });

// Ab dynamic import se baaki sab load karo
const { default: express } = await import("express");
const { default: cookieParser } = await import("cookie-parser");
const { default: cors } = await import("cors");
const { default: connectDB } = await import("./utils/db.js");
const { default: userRoute } = await import("./routes/user.route.js");
const { default: companyRoute } = await import("./routes/company.route.js");
const { default: jobRoute } = await import("./routes/job.route.js");
const { default: applicationRoute } = await import("./routes/application.route.js");

const app = express();
const _dirname = path.resolve();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
    origin: process.env.FRONTEND_URL || 'https://job-portal-k1vc.onrender.com',
    credentials: true
};
app.use(cors(corsOptions));

app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get("*", (_, res) => {
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    connectDB();
    console.log(`server running on port ${PORT}`);
});