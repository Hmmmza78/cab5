import express from "express";

const router = express.Router();
import { validateInputs } from "../../../middlewares/validate"
import { login, create, documents } from "../controllers/auth"
import { upload } from '../../../util/upload';

router.post("/login", validateInputs(["phone","fcmToken", "currLat", "currLon"]), login);

router.post("/register", validateInputs(["firstName", "lastName", "phone", "email", "fcmToken", "currLat", "currLon", "image", "dob", "city"]), upload.single("image"), create);

router.post("/documents", validateInputs(["rider", "cnicFront", "cnicBack", "licenseImage", "licenseNumber", "status"]), documents);


export default router;
