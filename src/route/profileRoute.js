import express from "express";
import { createProfile, updateProfile, getProfileById, getAllProfile, deleteProfile } from "../controller/profileInfo.js";


const router = express.Router()
router.post("/createProfile", createProfile)
router.put("/updateProfile/:id", updateProfile)
router.get("/getProfileById/:id", getProfileById)
router.get("/getAllProfile", getAllProfile)
router.delete("/deleteProfile/:id", deleteProfile)

export default router;