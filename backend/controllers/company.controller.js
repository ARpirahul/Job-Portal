import {Company} from "../models/company.model.js";
import { User } from "../models/user.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const registerCompany = async(req,res)=>{
    try{
       const {name} = req.body;
       if(!name){
        return res.status(400).json({
            message:"Company name is required",
            success:false
        });
       }
       let company = await Company.findOne({name});
       if(company){
        return res.status(400).json({
            message:"You can't register same company",
            success:false
        })
       };
     company = await Company.create({
        name,
        userId:req.id
     })
     await User.findByIdAndUpdate(req.id, { "profile.company": company._id });
     const user = await User.findById(req.id).populate("profile.company");
     return res.status(201).json({
        message:"Company registered successfully",
        company,
        user,
        success:true
     })
    }catch(error){
        console.log(error);
        return res.status(500).json({ message:"Internal server error", success:false });
    }
}

export const getCompany = async(req,res)=>{
    try{
         const userId = req.id;
         const companies = await Company.find({userId});
         if(!companies){
            return res.status(404).json({
                message:"Companies not found",
                success:false
            })
         }
         return res.status(200).json({
            companies,
            success:true
         })
    }catch(error){
        console.log(error);
        return res.status(500).json({ message:"Internal server error", success:false });
    };
}

export const getCompanyById = async(req,res)=>{
    try{
      const companyId = req.params.id;
      const company = await Company.findById(companyId);
      if(!company){
        return res.status(404).json({
            message:"Company not found",
            success:false
        })
      }
      return res.status(200).json({
        company,
        success:true
      })
    }catch(error){
        console.log(error);
        return res.status(500).json({ message:"Internal server error", success:false });
    }
}

export const updateCompany = async(req,res)=>{
    try{
        const {name,description,website,location} = req.body;
        let logo = "";

        // Logo is OPTIONAL - only upload if file is provided
        if(req.file){
            try{
                const fileUri = getDataUri(req.file);
                const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
                logo = cloudResponse.secure_url;
            }catch(err){
                console.log("Cloudinary upload failed:", err.message);
            }
        }

        const updateData = {name, description, website, location};
        if(logo) updateData.logo = logo; // only update logo if uploaded

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, {new:true});

        if(!company){
            return res.status(404).json({
                message:"Company not found",
                success:false
            })
        }
        return res.status(200).json({
            message:"Company information updated",
            success:true
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({ message:"Internal server error", success:false });
    }
}