import express from "express";

const router = express.Router();
import { validateInputs } from "../../../middlewares/validate"
import { login, create, documents, vehicleInfo } from "../controllers/auth"
import { upload } from '../../../util/upload';

router.post("/login", validateInputs(["phone", "fcmToken", "currLat", "currLon"]), login);

router.post("/register", validateInputs(["firstName", "lastName", "phone", "email", "fcmToken", "currLat", "currLon", "image", "dob", "city"]), upload.single("image"), create);

router.post("/documents", validateInputs(["rider", "cnicFront", "cnicBack", "licenseImage", "licenseNumber", "plateNumber", "plateImage", "status"]), documents);

router.post("/license", validateInputs(["rider", "licenseImage", "licenseNumber",]), documents);

router.post("/cnic", validateInputs(["rider", "cnicFront", "cnicBack"]), documents);

router.post("/vehicleInfo", validateInputs(["model", "plateNumber", "plateImage", "vehicleImage", "cardFront", "cardBack"]), vehicleInfo);

export default router;
