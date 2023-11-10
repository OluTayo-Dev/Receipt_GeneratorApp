import express from "express";
import { signup, signIn, getUsers, getUserById, forgotPassword, resetPassword} from "../controller/authInfo.js";

const router = express.Router();
router.route("/signup").post(signup);
router.route("/signIn").post(signIn);
router.route("/getUsers").get(getUsers);
router.route("/getUserById/:id").get(getUserById);
 router.route("/forgotPassword").post(forgotPassword);
 router.route("/resetPassword/:id/:token").post(resetPassword);

export default router;