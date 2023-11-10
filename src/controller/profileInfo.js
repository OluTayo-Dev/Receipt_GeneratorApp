import express from "express";
import {User, Profile} from "../model/User.js";



const createProfile = async (req, res) => {
    const { companyName, address, phoneNumber, logo, plan} = req.body;
    try{
        await  Profile.create({ companyName, address, phoneNumber, logo, plan}).then(
            (profile) => {
                res.status(201).json({ message: "Profile created successfully", profile})
            }
            
        )
        
    } catch (err) {
        res.status(400).json({ message: "Failed to create Profile", error:err.message})
    }
}
const updateProfile = async (req, res) => {
    const { companyName, address, phoneNumber, logo, plan} = req.body;

    const profile = await Profile.findById(req.params.id)
    if(profile) {
        profile.companyName = companyName
        profile.address = address
        profile.phoneNumber = phoneNumber
        profile.logo = logo
        profile.plan = plan
      


        const updateProfile = await profile.save();
        console.log(updateProfile)
        res.status(200).json({ message: "Profile updated successfully", profile})

    }else{
        res.status(404).json({ message: "Profile not found", error:err.message})
    }
}

const getProfileById = async (req, res) => {
    const profile = await Profile.findById(req.params.id)
    if(profile){
        res.json(profile)
    } else{
        res.status(400).json({ message: "Profile not found"})
    } 
}

const getAllProfile = async (req, res) => {

    const profile = await Profile.find({})  
    res.json(profile)
};

const deleteProfile = async (req, res) => {
    try{
        const id = req.params.id;
        const data = await Profile.findByIdAndDelete(id)
        res.status(201).json({ message: "Profile Removed", data}) 
    } catch (err) {
        res.status(400).json
        ({ message: "Profile not found", error:err.message})
    }
}

export {createProfile, updateProfile, getProfileById, getAllProfile, deleteProfile}



